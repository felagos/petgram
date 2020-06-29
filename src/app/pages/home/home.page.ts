import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true,
    slidesPerView: 3
  };
  public categories: Category[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllCategories().subscribe(response => this.categories = response.data);
  }

}
