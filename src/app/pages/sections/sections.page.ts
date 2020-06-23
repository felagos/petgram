import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/app/models/user.modal';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss'],
})
export class SectionsPage implements OnInit {

  public user: UserModel = null;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.user = this.storage.getItem<UserModel>("user");
  }

}
