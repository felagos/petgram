import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';
import { StorageEnum } from './enums/storage.enum';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private pwaService: PwaService
  ) {
    this.initializeApp();
    this.initThemeApp();
    this.updateApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private async initThemeApp() {
    const isDarkMode = await this.storageService.getItem<boolean>(StorageEnum.DARK_MODE);
    const theme = isDarkMode ? "light" : "dark";
    document.body.setAttribute("data-theme", theme);
  }

  private updateApp() {
    this.pwaService.checkForUpdates();
  }

}
