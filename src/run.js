const fs = require('fs');
const axios = require('axios').default;
const build = require('build-url');
const spinner = require('ora')();
const { Input } = require('enquirer');

const readline = require('./readline');

export default async () => {
  spinner.start(`Initializing REST Client...`);
  const start = new Date();

  const configPath = `${process.cwd()}/dokuin.config.json`;
  const endpointsPath = `${process.cwd()}/dokuin.endpoints.json`;

  const { baseURL } = JSON.parse(
    fs.readFileSync(configPath, { encoding: 'utf8' })
  );

  const endpoints = JSON.parse(
    fs.readFileSync(endpointsPath, {
      encoding: 'utf8'
    })
  );

  if (!Array.isArray(endpoints)) {
    spinner.warn(
      `Cannot find the endpoints array. There's no endpoints. Run 'dokuin create' to generate endpoints!`
    );
    readline.close();
  } else if (endpoints.length <= 0) {
    spinner.warn(
      `There's no endpoints. Run 'dokuin create' to generate endpoints!`
    );
    readline.close();
  } else {
    spinner.succeed(`Successfully initialized REST Client.`);

    endpoints.forEach(endpoint => {
      endpoint.errorResponse = [];
    });

    for (const endpoint of endpoints) {
      const builtURL = build(baseURL, {
        path: typeof endpoint.path !== 'undefined' ? endpoint.path : baseURL,
        queryParams: typeof endpoint.query !== 'undefined' ? endpoint.query : {}
      });

      try {
        spinner.start(
          `Processing ${endpoint.method.toUpperCase()} from ${builtURL}...`
        );

        const response = await shootApi(builtURL, endpoint);

        const { status, statusText, headers, data } = response;
          const finalResponse = {
            status,
            statusText,
            headers,
            body: data
          };

          endpoint.response = finalResponse;

          spinner.succeed(
            `Got response with code ${status}: ${statusText} from ${builtURL}`
          );

          const prompt = new Input({
            name: 'description',
            message: `Response description for status code ${status} ${statusText}: `
          });

          const description = await prompt.run();

          endpoint.response.description = description;
          fs.writeFileSync(
            endpointsPath,
            JSON.stringify(endpoints, null, 2),
            {
              encoding: 'utf8'
            }
          );

      } catch (err) {
        const { status, statusText, headers, data } = err.response;
          const finalErrResponse = {
            status,
            statusText,
            headers,
            body: data
          };
          endpoint.errorResponse.push(finalErrResponse);
          fs.writeFileSync(endpointsPath, JSON.stringify(endpoints, null, 2), {
            encoding: 'utf8'
          });

          spinner.fail(
            `Got error with code ${status}: ${statusText} from ${builtURL}`
          );

          const prompt = new Input({
            name: 'description',
            message: `Response description for status code ${status} ${statusText}: `
          });

          const response = await prompt.run();

          finalErrResponse.description = response;
          endpoint.errorResponse.push(finalErrResponse);
          fs.writeFileSync(
            endpointsPath,
            JSON.stringify(endpoints, null, 2),
            {
              encoding: 'utf8'
            }
          );
      }
    }

    fs.writeFileSync(endpointsPath, JSON.stringify(endpoints, null, 2), {
      encoding: 'utf8'
    });
    console.log(`Finished executing in ${parseFloat((new Date() - start) / 1000).toFixed(2)} seconds.`);
    readline.close();
  }
};

async function shootApi(url, config) {
  const { method = 'GET', headers = {}, body = {} } = config;
  return await axios({
    url,
    method,
    headers,
    data: body
  });
}
