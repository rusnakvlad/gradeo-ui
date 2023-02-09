import {MasterSubject} from "./subject.model";
import {PaginationModel} from "./pagination.model";

export type StudyGroup = {
  id: number,
  name: string,
  subjects: MasterSubject[]
}

export type StudyGroupPaged = {
  items: StudyGroup[]
} & PaginationModel
