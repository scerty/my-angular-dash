import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshingAccessToken: boolean = false;
  private accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = this.addAuthorizationHeader(request);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 4035 && !this.refreshingAccessToken) {
          this.refreshingAccessToken = true;
          this.accessTokenSubject.next(null);

          return this.authService.refresh().pipe(
            switchMap((res: any) => {
              this.authService.setAccessToken(res.token);
              this.accessTokenSubject.next(res.token);

              return next.handle(this.addAuthorizationHeader(request));
            }),
            catchError((err) => {
              //this.authService.logout();
             // this.router.navigate(['/login']);
              return throwError(err);
            }),
            finalize(() => {
              this.refreshingAccessToken = false;
            })
          ) as Observable<HttpEvent<any>>; // Specify the type of the observable explicitly
        }

        return throwError(error);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    const accessToken = this.authService.accessToken;
    if (accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return request;
  }
}
