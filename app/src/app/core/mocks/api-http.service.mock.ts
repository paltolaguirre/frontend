import { Observable, of } from 'rxjs';
export class ApiHttpServiceMock {
  public get(endpoint: string): Observable<any> {
    return new Observable((observer) => {
      observer.complete();
    });
  }

  public post(endpoint: string, body?: any) {
    return new Observable((observer) => {
      observer.complete();
    });
  }

  public put(endpoint: string, body?: any) {
    return new Observable((observer) => {
      observer.complete();
    });
  }
  public patch(endpoint: string, body?: any) {
    return new Observable((observer) => {
      observer.complete();
    });
  }
  public delete(endpoint: string, body?: any) {
    return new Observable((observer) => {
      observer.complete();
    });
  }
}
