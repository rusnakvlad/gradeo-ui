import { Component, OnInit } from '@angular/core';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SpinnerService} from "../shared/services/spinner.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  showSpinner: boolean = false;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.stateChanged.subscribe(newState => {
      this.showSpinner = newState;
    })
  }

  ngOnInit(): void {
  }

}
