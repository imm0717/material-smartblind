import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Optional } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { IConfiguration, IEndPointConfig, IHttpConfig } from "./../configuration/config/";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, ErrorApiResponse } from './api-reponse.model';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class HttpService {
  private endpoint: IEndPointConfig;

  protected assetsHost = "";

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    @Optional() private configService: ConfigurationService,
  ) {

    console.log('HttpService created')

    if (this.configService) {
      this.configService.settings$.subscribe((settings) =>
        this.handleSettings(settings)
      );
    } else {
      this.handleSettings()
    }


  }

  handleSettings(appSettings?: IConfiguration) {
    let settings = appSettings.httpConfig as IHttpConfig;
    this.endpoint = settings.endpoint || {
      host: "localhost",
      schema: "http",
      port: 3000,
      apiVersion: "",
    };
  }

  getHost() {
    let url = this.endpoint.schema ? this.endpoint.schema + "://" : "";
    url += this.endpoint.host;
    url += this.endpoint.port ? ":" + this.endpoint.port : "";
    return url;
  }

  getUrl() {
    let url = this.endpoint.apiVersion ? this.getHost() + "/" + this.endpoint.apiVersion : this.getHost();
    return url;
  }

  path(path) {
    const joiner = path && path[0] === "/" ? "" : "/";
    return this.getUrl() + joiner + path;
  }

  resource(path) {
    const regex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    const joiner = (path && path[0] === "/") || regex.test(path) ? "" : "/";
    return regex.test(path) ? path : this.getUrl() + joiner + path;
  }

  assets(path) {
    const regex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    const joiner = (path && path[0] === "/") || regex.test(path) ? "" : "/";
    return regex.test(path) ? path : this.assetsHost + joiner + path;
  }

  safeStyle(path): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      "url(" + this.assets(path) + ")"
    );
  }

  get<T>(uri: string, params?: any | null, header?: object): Observable<ApiResponse<T>> {
    const options = {};
    if (params) {
      options["params"] = params;
    }
    if (header) {
      options["headers"] = header;
    }
    return this.httpClient.get<ApiResponse<T>>(this.path(uri), options).pipe(
      catchError((error: any) => {
        return this.handleError(error)
      })
    );
  }

  post<T>(uri: string, body?: any | null, header?: object): Observable<ApiResponse<T>> {
    const options = {};
    if (header) {
      options["headers"] = header;
    }
    return this.httpClient.post<ApiResponse<T>>(this.path(uri), body, options).pipe(
      catchError((error: any) => {
        return this.handleError(error)
      })
    );
  }

  put<T>(uri: string, body?: any | null, header?: object): Observable<ApiResponse<T>> {
    const options = {};
    if (header) {
      options["headers"] = header;
    }
    return this.httpClient.put<ApiResponse<T>>(this.path(uri), body, options).pipe(
      catchError((error: any) => {
        return this.handleError(error)
      })
    );
  }

  delete<T>(uri: string, params?: any | null, header?: object): Observable<ApiResponse<T>> {
    const options = {};
    if (params) {
      options["params"] = params;
    }
    if (header) {
      options["headers"] = header;
    }
    return this.httpClient.delete<ApiResponse<T>>(this.path(uri), options).pipe(
      catchError((error: any) => {
        return this.handleError(error)
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorApiResponse: ErrorApiResponse<any> = new ErrorApiResponse();

    errorApiResponse.statusCode = error.status
    errorApiResponse.isSuccess = false;
    errorApiResponse.message = error.message;
    errorApiResponse.data = error.error;
    errorApiResponse.timestamp = new Date(Date.now())

    if (error.error instanceof ErrorEvent) {
      errorApiResponse.message = error.error.message
    } else {
      let { message, timestamp, isSuccess } = error.error;

      if (message && timestamp && isSuccess == false) {
        let formattederror = '';

        switch (error.status) {
          case 404:
            formattederror = `Resource not found | ${message}`;
            break;
          case 500:
            formattederror = `Internal serve error | ${message}`;
            break;
          case 501:
            formattederror = `Functionality not implemented | ${message}`;
            break;
          case 502:
            formattederror = `Bad Gateway | ${message}`;
            break;
          case 503:
            formattederror = `Service unavailable | ${message}`;
            break;
          default:
            formattederror = `${message}`;
            break;
        }
        errorApiResponse.message = formattederror
        errorApiResponse.timestamp = timestamp
      } else {
        errorApiResponse.message = `The API returned a unsuccesfull response | ${error.statusText}. ${error.message}`;
      }
    }

    return throwError(errorApiResponse);
  }
}
