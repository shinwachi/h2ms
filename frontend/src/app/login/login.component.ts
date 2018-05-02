import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {ConfigService} from '../config/config.service';
import {Config} from '../config/config';
import {UserEmailService} from '../user/service/user-email.service';
import {
    REQUIRED_EMAIL,
    REQUIRED_EMAIL_ERROR_MESSAGE,
    REQUIRED_PASSWORD,
    REQUIRED_PASSWORD_ERROR_MESSAGE
} from '../forms-common/form-controls';
import {FormControl} from '@angular/forms';
import {UserRoleCheckService} from '../user/service/user-role-check.service';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../card.css']
})
export class LoginComponent implements OnInit {

    emailFormControl: FormControl = REQUIRED_EMAIL;
    emailErrorMessage = REQUIRED_EMAIL_ERROR_MESSAGE;
    passwordFormControl: FormControl = REQUIRED_PASSWORD;
    passwordErrorMessage = REQUIRED_PASSWORD_ERROR_MESSAGE;
    hide = true;
    loginAttempts = 3;
    config: Config;

    constructor(private auth: AuthService,
                private router: Router,
                private configService: ConfigService,
                private userEmailService: UserEmailService,
                private userRoleCheckService: UserRoleCheckService,
                public dialog: MatDialog) {
        this.config = configService.getConfig();
    }

    ngOnInit() {
        this.auth.logout();
    }

    submit(email: string, password: string): void {
        if (this.emailFormControl.invalid) {
            console.log('Submit sent when email was invalid.');
            return;
        } else if (this.passwordFormControl.invalid) {
            console.log('Submit sent when password was invalid.');
            return;
        }

        this.auth.login(email, password)
            .subscribe(
                response => {
                    this.userEmailService.setEmail(email);
                    this.userRoleCheckService.getRoles().subscribe((roles) => {
                        if (roles.includes('ROLE_ADMIN')) {
                            this.router.navigate(['dashboard']);
                        } else if (roles.includes('ROLE_OBSERVER')) {
                            this.router.navigate(['event']);
                        } else if (roles.includes('ROLE_USER')) {
                            this.router.navigate(['help']);
                        } else {
                            this.router.navigate(['help']);
                        }
                    });
                },
                error => {
                    if (error.status === 400) {
                        this.loginAttempts--;
                        if (this.loginAttempts === 0) {
                            this.router.navigate(['forgot-password']);
                        } else {
                            this.openDialog();
                        }
                    }
                });
    }

    openDialog(): void {
        this.dialog.open(LoginFailureDialogComponent);
    }
}

@Component({
    selector: 'app-login-failure-dialog',
    templateUrl: 'login-failure-dialog.html',
})
export class LoginFailureDialogComponent {

    constructor(public dialogRef: MatDialogRef<LoginFailureDialogComponent>) {
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}

