import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Pagination, PetModel } from 'src/app/models';
import { StorageService } from 'src/app/services';
import { StorageEnum } from 'src/app/enums';

@Component({
  selector: 'app-scroll-pets',
  templateUrl: './scroll-pets.component.html',
  styleUrls: ['./scroll-pets.component.scss'],
})
export class ScrollPetsComponent implements OnChanges {

  @Input() public pets: Pagination<PetModel>;
  @Output() public handleFavoriteEvent = new EventEmitter<PetModel>();
  @Output() public loadMoreDataEvent = new EventEmitter();
  public isLogged: boolean = false;

  constructor(private storageServie: StorageService) { }

  async ngOnChanges() {
    const token = await this.storageServie.getItem<string>(StorageEnum.TOKEN);
    this.isLogged = token !== null;
  }

  public handleFavorite(pet: PetModel) {
    this.handleFavoriteEvent.emit(pet);
  }

  public loadMoreData(event: any) {
    this.loadMoreDataEvent.emit(event);
  }

}
