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
        return this.userRoleCheckService.hasRoles(['ROLE_ADMIN']).flatMap((hasAdminRole) => {
            // the default route '/' is reserved for admin, so we need to redirect them to events page
            if (!hasAdminRole) {
                const path = this.router.url;
                if (path.match('/')) {
                    this.router.navigate(['event']);
                }
                this.errorService.setError403(this.config.getFrontendUrl() + path);
                this.router.navigate(['error']);
            }
            return Observable.of(hasAdminRole);
        });
    }
}
