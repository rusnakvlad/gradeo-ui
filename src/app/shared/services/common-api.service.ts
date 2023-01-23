import { Injectable } from '@angular/core';

import { protectedResources } from '../../auth-config';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  url = protectedResources.GradeoCoreApi.endpoint;
  schools: string = this.url + '/api/schools'
  constructor() { }
}
