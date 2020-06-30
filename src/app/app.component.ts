import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';
import { StorageEnum } from './enums/storage.enum';
import { SwUpdate } from '@angular/service-worker';

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
    private swUpdate: SwUpdate,
    private alertController: AlertController
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
    if(!this.swUpdate.isEnabled) {
      console.log("not enabled");
      return;
    }
    this.swUpdate.available.subscribe(async event => {
      const alert = await this.alertController.create({
        header: "Actualización",
        message: "¿ Desea recargar la app para descargar la actualización ?",
        buttons: [
          {
            text: "Aceptar",
            handler: () => {
              window.location.reload();
            }
          },
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel");
            }
          }
        ]
      });

      await alert.present();
    });
  }

}
