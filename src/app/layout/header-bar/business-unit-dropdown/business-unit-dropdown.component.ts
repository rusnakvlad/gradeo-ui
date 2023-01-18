import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-unit-dropdown',
  templateUrl: './business-unit-dropdown.component.html',
  styleUrls: ['./business-unit-dropdown.component.scss']
})

export class BusinessUnitDropdownComponent implements OnInit {

  public selectedCountry: any;
  public countries: any[];
  constructor() {
    this.countries = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
    ];
  }

  ngOnInit(): void {

  }

}
