import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ErrorHandlerService } from "../../../shared/services/util/error-handler.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
  loading: boolean;
  loadingText: string;
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.loadingText = 'Carregando menu principal...';

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });

    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  signin() {
    this.loading = true;
    this.loadingText = 'Validando usuário e senha...';
    this.auth.login(this.signinForm.value)
      .then(res => {
        this.router.navigateByUrl('/painel');
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        this.errorHandler.show(err);
      });
  }

}
