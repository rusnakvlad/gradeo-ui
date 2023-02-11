import {MasterSubject} from "./subject.model";
import {PaginationModel} from "./pagination.model";

export type StudyGroup = {
  id: number,
  name: string,
  isActive: boolean,
  subjects: MasterSubject[]
}

export type StudyGroupPaged = {
  items: StudyGroup[]
} & PaginationModel

export type StudyGroupBasicInfo = {
  id: number,
  name: string
}
