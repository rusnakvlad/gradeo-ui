import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonApiService} from "./common-api.service";
import {Observable} from "rxjs";
import {StudyGroupPaged} from "../models/study-group.model";
import {StudyGroupUpsertModel} from "../models/school.model";

@Injectable({
  providedIn: 'root'
})
export class StudyGroupService {

  constructor(private httpClient: HttpClient, private api: CommonApiService) {
  }

  get(): Observable<StudyGroupPaged> {
    return this.httpClient.get<StudyGroupPaged>(this.api.studyGroups);
  }

  upsert(studyGroup: StudyGroupUpsertModel): Observable<any> {
    return this.httpClient.post(this.api.studyGroups, studyGroup);
  }
}
