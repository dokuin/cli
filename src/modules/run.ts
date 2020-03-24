import axios from 'axios';
import build from 'build-url';
import { RunInputs, ShootInputs } from '..';

/// <reference path="../index.d.ts" />

export default async function Run(inputConfig: RunInputs) {
  const { name, description, baseURL, author, endpoints } = inputConfig;

  for (const endpoint of endpoints) {
    const builtURL = build(baseURL, {
      path: typeof endpoint.path !== 'undefined' ? endpoint.path : baseURL,
      queryParams: typeof endpoint.query !== 'undefined' ? endpoint.query : {}
    });
    try {
      const response = await shootAPI({ url: builtURL, ...endpoint });
      const { status, statusText, headers, data } = response;
      const finalResponse = {
        status,
        statusText,
        headers,
        body: data
      };
      endpoint.response = finalResponse;
    } catch (err) {
      const { status, statusText, headers, data } = err.response;
      const finalErrResponse = {
        status,
        statusText,
        headers,
        body: data
      };
      endpoint.errorResponse?.push(finalErrResponse);
    }
  }

  return { name, description, baseURL, author, endpoints };
}

export async function shootAPI(shootData: ShootInputs) {
  const { url, method = 'GET', headers, body } = shootData;
  return await axios({
    url,
    method,
    headers,
    data: body
  });
}
