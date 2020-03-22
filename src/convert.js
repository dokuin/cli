const json2md = require('json2md');
const fs = require('fs');
const spinner = require('ora')();

const readline = require('./readline');

export default () => {
  spinner.start(`Initializing MD Converter...`);

  const configPath = `${process.cwd()}/dokuin.config.json`;
  const endpointsPath = `${process.cwd()}/dokuin.endpoints.json`;

  const config = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }));
  const endpoints = JSON.parse(
    fs.readFileSync(endpointsPath, { encoding: 'utf8' })
  );

  const noResponseEndpoints = endpoints.filter(endpoint => {
    return !endpoint.response && endpoint.errorResponse.length <= 0;
  });

  if (noResponseEndpoints.length > 0) {
    spinner.warn(
      `No responses to convert, make sure you have run 'dokuin run' to record REST API responses.`
    );
    readline.close();
  } else if (endpoints.length <= 0) {
    spinner.warn(
      `There's no endpoints. Run 'dokuin create' to generate endpoints!`
    );
    readline.close();
  } else {
    const dokuinData = { ...config, endpoints };
    spinner.succeed(`Successfully initialized MD Converter.`);
    spinner.start(
      `Converting project ${dokuinData.name} endpoints into MD...\n`
    );

    const convertedEndpoints = endpoints.map(endpoint => {
      const { method, path, description, headers, body, response } = endpoint;

      const result = [
        { h2: `**${method.toUpperCase()}** ${path}` },
        { p: description },
        { h3: 'Request' },
        {
          code: {
            language: 'javascript',
            content: JSON.stringify(
              {
                method,
                path,
                headers,
                body
              },
              null,
              2
            )
          }
        },
        { h3: 'Response' },
        {
          code: {
            language: 'javascript',
            content: JSON.stringify(response, null, 2)
          }
        }
      ];

      return result;
    });

    const convertedData = json2md([
      { h1: dokuinData.name },
      { p: dokuinData.description },
      { blockquote: `by ${dokuinData.author}` },
      { h4: `Base URL` },
      { p: config.baseURL },
      ...convertedEndpoints,
      {
        h5: {
          link: {
            title: 'Powered by DokuIn',
            source: 'https://www.npmjs.com/package/dokuinjs'
          }
        }
      }
    ]);

    const docsPath = `${process.cwd()}/${dokuinData.name}.md`;
    fs.writeFileSync(docsPath, convertedData, { encoding: 'utf8' });

    spinner.succeed(`Successfully converted to MD!\n`);

    readline.close();
  }
};
