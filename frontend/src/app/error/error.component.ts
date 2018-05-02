import { Component, OnInit } from '@angular/core';
import {Config} from '../config/config';
import {NavigationStart, Router} from '@angular/router';
import {ConfigService} from '../config/config.service';
import {ErrorService} from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['../card.css']
})
export class ErrorComponent implements OnInit {

    error = '404: Not found!';
    config: Config;
    routeSub;

    constructor(private configService: ConfigService,
                private router: Router,
                private errorService: ErrorService) {
        this.config = configService.getConfig();
        this.routeSub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.errorService.setError404();
            }
        });
    }

    ngOnInit() {
        this.error = this.errorService.getError();
        // this.routeSub = this.router.events.subscribe((event) => {
        //     if (event instanceof NavigationStart) {
        //         this.setError404();
        //     }
        // });
    }
}
