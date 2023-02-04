import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {Permission} from "../models/permission.model";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
  }

  get(): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(this.commonApi.permissions);
  }
}
