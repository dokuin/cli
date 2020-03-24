import axios from 'axios';
import build from 'build-url';

interface RunInputs {
  name: string;
  description: string;
  baseURL: string;
  author: string;
  endpoints: {
    method: any;
    path: string;
    query: any;
    headers?: object;
    body?: object;
    response?: {
      description?: string;
      status: number;
      statusText: string;
      headers: object;
      body?: object;
    };
    errorResponse?: {
      description?: string;
      status: number;
      statusText: string;
      headers: object;
      body?: object;
    }[];
  }[];
}

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

interface ShootInputs {
  url: string;
  method: any;
  headers?: object;
  body?: object;
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
