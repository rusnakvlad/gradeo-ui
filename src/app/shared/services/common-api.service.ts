import { Injectable } from '@angular/core';

import { protectedResources } from '../../auth-config';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  url = protectedResources.GradeoCoreApi.endpoint;
  schools: string = this.url + '/api/schools'
  users: string = this.url + '/api/users'
  masterSubjects: string = this.url + '/api/masterSubjects'
  constructor() { }
}
