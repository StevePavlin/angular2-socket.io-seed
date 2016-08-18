import {Response, Http, Headers} from "@angular/http";
export abstract class APIService {

  private API_BASE = 'http://127.0.0.1:4201/api/v1';

  constructor(protected http:Http) {
  }

  protected extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  /**
   * Helper to generate json headers and body to send requests
   * @param args (json object of arguments)
   * @returns {body (body of request), options (headers)}
     */
  protected prepareRequest(args) {
    let body = JSON.stringify(args);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = {
      headers: headers,
      withCredentials: true
    };

    return {
      body: body,
      options: options
    }
  }

  /**
   * Format endpoint and set in this instance to allow for debugging on response
   * @param endpoint
   * @returns {any}
     */
  protected url(endpoint: string) {
    return this.API_BASE + endpoint;
  }

}
