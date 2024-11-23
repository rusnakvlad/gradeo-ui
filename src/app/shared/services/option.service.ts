import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonApiService } from "./common-api.service";
import { Observable } from "rxjs";
import { DictionaryOptionModel } from '../models/option.model';

@Injectable({
    providedIn: 'root'
})
export class OptionService {
    constructor(private httpClient: HttpClient, private commonApi: CommonApiService) {
    }

    getAll(): Observable<DictionaryOptionModel[]> {
        return this.httpClient.get<DictionaryOptionModel[]>(this.commonApi.options);
    }
}
