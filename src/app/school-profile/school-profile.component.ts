import { Component, OnInit } from '@angular/core';
import {SchoolService} from "../shared/services/school.service";
import {SchoolProfile} from "../shared/models/school.model";

@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.scss']
})
export class SchoolProfileComponent implements OnInit {

  school: SchoolProfile;
  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.schoolService.getSchoolProfile().subscribe(response => {
      this.school = response;
    })
  }

}
