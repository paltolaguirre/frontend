import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  constructor(private http: HttpClient) { }

  public get(endpoint: string) {
    return this.http.get(endpoint);
  }

  public post(endpoint: string, body?: any) {
    return this.http.post(endpoint, body);
  }

  public put(endpoint: string, body?: any) {
    return this.http.put(endpoint, body);

  }
  public patch(endpoint: string, body?: any) {
    return this.http.patch(endpoint, body);

  }
  public delete(endpoint: string, body?: any) {
    return this.http.delete(endpoint, body);
  }
}
