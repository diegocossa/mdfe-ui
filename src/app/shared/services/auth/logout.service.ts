import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AppHttp } from './app-http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LogoutService {

  constructor(private http: AppHttp,
              private auth: AuthService) {
  }

  URL = environment.WebService.URLAuth.Logout;

  logout() {
    return this.http.delete(`${this.URL}`, {withCredentials: true}).toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}
