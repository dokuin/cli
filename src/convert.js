const json2md = require('json2md');
const fs = require('fs');

export default () => {
  // Production
  const configPath = `${process.cwd()}/dokuin.config.json`;
  const endpointsPath = `${process.cwd()}/dokuin.endpoints.json`;

  // Development
  // const configPath = `/home/adamrafiandri/Desktop/hacktiv8/phase-3/dokuinjs/dokuin.config.json`;
  // const endpointsPath = `/home/adamrafiandri/Desktop/hacktiv8/phase-3/dokuinjs/dokuin.endpoints.json`;

  const config = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }));
  const endpoints = JSON.parse(
    fs.readFileSync(endpointsPath, { encoding: 'utf8' })
  );

  const dokuinData = { ...config, endpoints };

  const convertedEndpoints = endpoints.map(endpoint => {
    const { method, path, headers, body, response } = endpoint;

    const result = [
      { h2: `**${method}** ${path}` },
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
    ...convertedEndpoints
  ]);

  // Production
  const docsPath = `${process.cwd()}/${dokuinData.name}.md`;
  fs.writeFileSync(docsPath, convertedData, { encoding: 'utf8' });

  // Development
  // fs.writeFileSync(
  //   `/home/adamrafiandri/Desktop/hacktiv8/phase-3/dokuinjs/md-example.md`,
  //   convertedData,
  //   { encoding: 'utf8' }
  // );
};
