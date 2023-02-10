import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {StudyGroupBasicInfo, StudyGroupPaged} from "../models/study-group.model";
import {StudyGroupUpsertModel} from "../models/school.model";

@Injectable({
  providedIn: 'root'
})
export class StudyGroupService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }

  get(pageNumber: number, pageSize: number): Observable<StudyGroupPaged> {
    return this.httpClient.get<StudyGroupPaged>(this.api.studyGroups);
  }

  upsert(studyGroup: StudyGroupUpsertModel): Observable<any> {
    return this.httpClient.post(this.api.studyGroups, studyGroup);
  }

  getAll(): Observable<StudyGroupBasicInfo[]>{
    return this.httpClient.get<StudyGroupBasicInfo[]>(this.api.studyGroups + '/options')
  }
}
