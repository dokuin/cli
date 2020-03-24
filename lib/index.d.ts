export declare namespace dokuinjs {
  export interface RunInputs {
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

  export interface ShootInputs {
    url: string;
    method: any;
    headers?: object;
    body?: object;
  }
}
