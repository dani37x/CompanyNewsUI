import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { NewPassword } from 'src/app/models/NewPassword';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(newPassword: NewPassword) {
    this.authService
      .NewPassword(newPassword)
      .pipe(
        tap((response) => {
          if (response === true) {
            localStorage.setItem('key', 'key');
            this.authService.startKeyGuard(
              '/new-password/confirmation',
              '/new-password'
            );
            this.router.navigate(['/new-password/confirmation']);
          } else {
            this.router.navigate(['/new-password']);
          }
          console.log(response);
        }),
        catchError((error) => {
          console.log(error);
          throw this.router.navigate(['/new-password']);
        })
      )
      .subscribe();
  }
}
