import { Component, OnInit } from '@angular/core';
import { LoggedDataService } from 'src/app/services';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss'],
})
export class SectionsPage implements OnInit {

  public isLogged = false;

  constructor(private dataService: LoggedDataService) { }

  ngOnInit() {
    this.dataService.data.subscribe(response => this.isLogged = response);
  }

}
