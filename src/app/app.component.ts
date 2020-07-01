import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { StorageEnum } from './enums/storage.enum';
import { PwaService } from './services/pwa.service';
import { Plugins, StatusBarStyle } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private storageService: StorageService,
    private pwaService: PwaService
  ) {
    this.initializeApp();
    this.initThemeApp();
    this.updateApp();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      const isDarkMode = await this.storageService.getItem<boolean>(StorageEnum.DARK_MODE);

      await SplashScreen.hide();
      await StatusBar.setStyle({ style: isDarkMode ? StatusBarStyle.Dark : StatusBarStyle.Light });

      if (this.platform.is("android")) {
        StatusBar.setBackgroundColor({ color: "#CDCDCD" });
      }

    } catch (e) {
      console.log(e);
    }
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
