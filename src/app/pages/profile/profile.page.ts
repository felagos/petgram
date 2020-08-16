import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models';
import { StorageService } from 'src/app/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: UserModel;

  constructor(private storage: StorageService) { }

  async ngOnInit() {
    this.user = await this.storage.getUser();
  }

}
