const json2md = require('json2md');
const fs = require('fs');
const spinner = require('ora')();

const readline = require('./readline');

export default () => {
  const configPath = `${process.cwd()}/dokuin.config.json`;
  const endpointsPath = `${process.cwd()}/dokuin.endpoints.json`;

  const config = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }));
  const endpoints = JSON.parse(
    fs.readFileSync(endpointsPath, { encoding: 'utf8' })
  );

  const dokuinData = { ...config, endpoints };

  spinner.start(`Converting project ${dokuinData.name} endpoints into MD...\n`);

  const convertedEndpoints = endpoints.map(endpoint => {
    const { method, path, headers, body, response } = endpoint;

    const result = [
      { h2: `**${method.toUpperCase()}** ${path}` },
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
    { blockquote: `by ${dokuinData.author}` },
    { h3: `Base URL ===> ${config.baseURL}` },
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

  spinner.succeed(`Successfully converted into MD!\n`);

  readline.close();
};
