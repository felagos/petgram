import { Component, OnInit } from '@angular/core';
import { StorageEnum } from 'src/app/enums/storage.enum';
import { UserModel } from 'src/app/models/user.model';
import { StorageService } from 'src/app/services/storage.service';

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
