import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiHttpService } from './api-http.service';
import { HttpClient } from '@angular/common/http';

describe('ApiHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpClient
      ]
    });
  });

  it('should be created', () => {
    const service: ApiHttpService = TestBed.get(ApiHttpService);
    expect(service).toBeTruthy();
  });
});
