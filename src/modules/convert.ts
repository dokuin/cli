import json2md from 'json2md';

// Definition Types
import { DocumentationData } from '.';

export function ConvertMd(documentationData: DocumentationData) {
  const { name, description, baseURL, author, endpoints } = documentationData;
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
    { h1: name },
    { p: description },
    { blockquote: `by ${author}` },
    { h4: `Base URL` },
    { p: baseURL },
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

  return convertedData;
}
