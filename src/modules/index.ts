export { RunEndpoints, ShootAPI } from './run';
export { ConvertMd } from './convert';

export interface DocumentationData {
  name: string;
  description: string;
  baseURL: string;
  author: string;
  endpoints: Endpoints;
}

export interface Endpoint {
  method: any;
  path: string;
  description: string;
  query?: any;
  headers?: object;
  body?: object;
  response: {
    description?: string;
    status?: number;
    statusText?: string;
    headers?: object;
    body?: object;
  };
  errorResponse: {
    description: string;
    status: number;
    statusText: string;
    headers?: object;
    body?: object;
  }[];
}

export interface ShootInputs {
  url?: string;
  method?: any;
  headers?: object;
  body?: object;
  status?: number;
  statusText?: string;
  data?: any;
}

export interface Endpoints extends Array<Endpoint> {}
