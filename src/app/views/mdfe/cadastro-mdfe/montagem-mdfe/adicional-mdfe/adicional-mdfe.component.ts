import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicional-mdfe',
  templateUrl: './adicional-mdfe.component.html',
  styleUrls: ['./adicional-mdfe.component.scss']
})
export class AdicionalMdfeComponent implements OnInit {

  @Input() mdfeForm: any;

  constructor() {
  }

  ngOnInit() {
  }

}
