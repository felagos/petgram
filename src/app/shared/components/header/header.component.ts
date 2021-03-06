import { Component, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { StorageEnum } from 'src/app/enums/storage.enum';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() public iconName:string = "petgram";
  public showSettings = (Capacitor.getPlatform() !== "android" && Capacitor.getPlatform() !== "ios");

  constructor(private actionSheetController: ActionSheetController,
    private storageService: StorageService) { }


  async presentActionSheet() {
    const isDarkMode: boolean = document.body.getAttribute('data-theme') === "dark";

    const actionSheet = await this.actionSheetController.create({
      header: "Opciones",
      buttons: [
        {
          text: isDarkMode ? "Desactivar modo oscuro" : "Activar modo oscuro",
          icon: isDarkMode ? "moon" : "sunny",
          handler: async () => {
            const theme = isDarkMode ? "light" : "dark";
            document.body.setAttribute("data-theme", theme);
            await this.storageService.setItem<boolean>(StorageEnum.DARK_MODE, isDarkMode);
          }
        },
        {
          text: "Cerrar",
          icon: "close",
          role: "cancel",
          handler: () => {
          }
        }
      ]
    });
    console.log("actionSheet", actionSheet)
    await actionSheet.present();
  }

}
