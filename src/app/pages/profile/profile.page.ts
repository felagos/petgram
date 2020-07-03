import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/app/models/user.model';

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
