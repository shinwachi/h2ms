import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth.service';
import {UserRoleCheckService} from '../../user/service/user-role-check.service';
import {ErrorService} from '../../error/error.service';
import {ConfigService} from '../../config/config.service';
import {Config} from '../../config/config';

@Injectable()
export class AdminGuardService implements CanActivate {

    config: Config;

    constructor(private router: Router,
                private authService: AuthService,
                private userRoleCheckService: UserRoleCheckService,
                private errorService: ErrorService,
                private configService: ConfigService) {
        this.config = configService.getConfig();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const isLoggedIn = this.authService.isLoggedIn();
        if (!isLoggedIn) {
            this.router.navigate(['login']);
            return isLoggedIn;
        }
        return this.userRoleCheckService.getRoles().flatMap((roles) => {
            const hasAdminRole = roles.includes('ROLE_ADMIN')
            if (!hasAdminRole) {
                this.router.navigate(['about']);
            }
            return Observable.of(hasAdminRole);
        });
    }
}
