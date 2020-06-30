import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval, concat } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  constructor(private swUpdate: SwUpdate,
    private appRef: ApplicationRef,
    private alertController: AlertController) {
    if (this.swUpdate.isEnabled) {

      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const interval$ = interval(3600000);
      const updater$ = concat(appIsStable$, interval$);

      updater$.subscribe(() => this.swUpdate.checkForUpdate().then(() => console.log("Buscando actualizaciones")));

    }
  }

  public checkForUpdates(): void {
    this.swUpdate.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');

    this.alertController.create({
      message: "Nueva actualización disponible",
      buttons: [
        {
          text: "Aceptar",
          handler: () => this.swUpdate.activateUpdate().then(() => window.location.reload())
        }
      ]
    }).then(alert => alert.present());

    
  }

}
