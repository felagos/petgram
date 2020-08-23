import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-result',
  templateUrl: './empty-result.component.html',
  styleUrls: ['./empty-result.component.scss'],
})
export class EmptyResultComponent {

  @Input() text = "No se encontraron datos :(";

  constructor() { }

}
