import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { UserModel } from '@models/user.model';
import { StorageEnum } from 'src/app/enums/storage.enum';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss'],
})
export class SectionsPage implements OnInit {

  public user: UserModel = null;

  constructor(private storage: StorageService) { }

  async ngOnInit() {
    this.user = await this.storage.getItem<UserModel>(StorageEnum.USER);
  }

}
