const fs = require('fs');
const axios = require('axios').default;
const build = require('build-url');

export default () => {
  // Production
  const configPath = `${process.cwd()}/dokuin.config.json`;
  const endpointsPath = `${process.cwd()}/dokuin.endpoints.json`;

  fs.accessSync(configPath, fs.constants.R_OK);
  fs.accessSync(endpointsPath, fs.constants.R_OK);

  // Development
  // const configPath =
  //   '/home/adamrafiandri/Desktop/hacktiv8/phase-3/dokuinjs/dokuin.config.json';
  // const endpointsPath =
  //   '/home/adamrafiandri/Desktop/hacktiv8/phase-3/dokuinjs/dokuin.endpoints.json';

  const { baseURL } = JSON.parse(
    fs.readFileSync(configPath, { encoding: 'utf8' })
  );

  const endpoints = JSON.parse(
    fs.readFileSync(endpointsPath, {
      encoding: 'utf8'
    })
  );

  for (const endpoint of endpoints) {
    const builtURL = build(baseURL, {
      path: typeof endpoint.path !== 'undefined' ? endpoint.path : baseURL,
      queryParams: typeof endpoint.query !== 'undefined' ? endpoint.query : {}
    });

    console.log(builtURL);

    shootApi(builtURL, endpoint)
      .then(response => {
        const { status, statusText, headers, data } = response;
        const finalResponse = {
          status,
          statusText,
          headers,
          body: data
        };
        endpoint.response = finalResponse;
        fs.writeFileSync(endpointsPath, JSON.stringify(endpoints, null, 2), {
          encoding: 'utf8'
        });
      })
      .catch(err => {
        const { status, statusText, headers, data } = err.response;
        const finalErrResponse = {
          status,
          statusText,
          headers,
          body: data
        };
        endpoint.response = finalErrResponse;
        fs.writeFileSync(endpointsPath, JSON.stringify(endpoints, null, 2), {
          encoding: 'utf8'
        });
      });
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
