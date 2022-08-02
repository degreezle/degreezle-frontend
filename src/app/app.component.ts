import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { WEBSITE_HOST } from 'src/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'degreezle';

  ngOnInit() {
    // Google Tag Manager events
    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url
        };
        this.gtmService.pushTag(gtmTag);
      }
    });

    if (window.location.hostname === 'degreezle-test.firebaseapp.com') {
      window.location.href = WEBSITE_HOST + window.location.pathname;
    }
  }

  constructor(public router: Router, private gtmService: GoogleTagManagerService) {

  }
}
