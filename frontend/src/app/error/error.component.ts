import { Component, OnInit } from '@angular/core';
import {Config} from '../config/config';
import {Router} from '@angular/router';
import {ConfigService} from '../config/config.service';
import {ErrorService} from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['../card.css']
})
export class ErrorComponent implements OnInit {

    config: Config;
    error;
    resource;

    constructor(private configService: ConfigService,
                private router: Router,
                private errorService: ErrorService) {
        this.config = configService.getConfig();
    }

    ngOnInit() {
        this.error = this.errorService.getError();
        this.resource = this.errorService.getResource();
    }
}
