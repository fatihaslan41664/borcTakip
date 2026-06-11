import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const BASE_API_URL = new InjectionToken<string>('BASE_API_URL');
@Injectable({
  providedIn: 'root'
})

export class ClientService {

   constructor(private httpclient: HttpClient,@Inject(BASE_API_URL) private baseUrl: string) {}

  private getToken(): string | null {
    return localStorage.getItem("accessToken");
  }
  private getAuthorizationHeaders(requestParameters: Partial<RequestParameters>): HttpHeaders {
    let headers = requestParameters.headers || new HttpHeaders();
    if (!headers.has('Authorization')) {
      const token = this.getToken();
      if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private url(requestParameters: Partial<RequestParameters>): string {
    return `${requestParameters.baseUrl ?? this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
  }

  get<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T> {
    let mainurl = requestParameters.fullEndPoint ?? `${this.url(requestParameters)}${id ? `/${id}` : ""}`;
    if (requestParameters.queryString) mainurl += `?${requestParameters.queryString}`;
    const headers = this.getAuthorizationHeaders(requestParameters);
    return this.httpclient.get<T>(mainurl, { headers });
  }

  post<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let mainurl = requestParameters.fullEndPoint ?? this.url(requestParameters);
    if (requestParameters.queryString) mainurl += `?${requestParameters.queryString}`;
    const headers = this.getAuthorizationHeaders(requestParameters);
    return this.httpclient.post<T>(mainurl, body, { headers });
  }

  put<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let mainurl = requestParameters.fullEndPoint ?? this.url(requestParameters);
    if (requestParameters.queryString) mainurl += `?${requestParameters.queryString}`;
    const headers = this.getAuthorizationHeaders(requestParameters);
    return this.httpclient.put<T>(mainurl, body, { headers });
  }

  delete<T>(requestParameters: Partial<RequestParameters>, id: string): Observable<T> {
    let mainurl = requestParameters.fullEndPoint ?? `${this.url(requestParameters)}/${id}`;
    if (requestParameters.queryString) mainurl += `?${requestParameters.queryString}`;
    const headers = this.getAuthorizationHeaders(requestParameters);
    return this.httpclient.delete<T>(mainurl, { headers });
  }
}
export class RequestParameters {
    controller?: string;
    action?: string;
    headers?: any; // HttpHeaders import etmek istersen burada da olabilir
    baseUrl?: string;
    fullEndPoint?: string;
    queryString?: string;
}