import { Component, OnInit } from '@angular/core';
import {TeacherProfile} from "../shared/models/teacher-profile.model";
import {TeacherProfileService} from "../shared/services/teacher-profile.service";
import {ChipModule} from "primeng/chip";

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  teacher?: TeacherProfile;

  constructor(private teacherService: TeacherProfileService) { }

  ngOnInit(): void {
    this.teacherService.getProfile().subscribe(response => {
      this.teacher = response;
    })
  }

}
