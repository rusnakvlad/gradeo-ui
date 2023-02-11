import {Component, OnInit} from '@angular/core';
import {StudentProfileService} from "../shared/services/student-profile.service";
import {StudentProfile} from "../shared/models/student-profile.model";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  student?: StudentProfile;

  constructor(private studentService: StudentProfileService) {
  }

  ngOnInit(): void {
    this.studentService.getProfile().subscribe(response => {
      this.student = response;
    })
  }

}
