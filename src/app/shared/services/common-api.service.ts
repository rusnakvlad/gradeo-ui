import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  url = "https://localhost:7001";
  schools: string = this.url + '/api/schools'
  users: string = this.url + '/api/users'
  masterSubjects: string = this.url + '/api/masterSubjects'
  roles: string = this.url + '/api/roles'
  permissions: string = this.url + '/api/permissions'
  menuItems: string = this.url + '/api/menuItems'
  studyGroups: string = this.url + '/api/studyGroups'
  studentProfiles: string = this.url + '/api/studentProfiles'
  teacherProfiles: string = this.url + '/api/teacherProfiles'
  grades: string = this.url + '/api/grades'
  statistics: string = this.url + '/api/statistics'

  constructor() {
  }
}
