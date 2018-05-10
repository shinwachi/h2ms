import {Injectable} from '@angular/core';
import {UserByEmailResolverService} from './user-by-email-resolver.service';
import {Observable} from 'rxjs/Observable';
import {UserEmailService} from './user-email.service';

@Injectable()
export class UserRoleService {

    constructor(private userByEmailResolverService: UserByEmailResolverService,
                private userEmailService: UserEmailService) {
    }

    /**
     * determine if the current user has any role in list
     */
    hasRoles(list: [string]): Observable<boolean> {
        const email = this.userEmailService.getEmail();
        return this.userByEmailResolverService.resolve().flatMap((user) => {
            const roles = user.authorities.map(role => role.authority);
            const hasARoleFromList = list.some(role => roles.includes(role));
            return Observable.of(hasARoleFromList);
        });
    }
}
