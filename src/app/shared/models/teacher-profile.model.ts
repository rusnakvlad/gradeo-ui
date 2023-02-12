import {StudyGroupBasicInfo} from "./study-group.model";
import {PaginationModel} from "./pagination.model";
import {MasterSubject} from "./subject.model";

export type TeacherProfile = {
  id: number,
  firstName: string
  lastName: string,
  email: string,
  studyGroups: StudyGroupBasicInfo[],
  subjects: MasterSubject[]
}

export type TeacherProfilePaged = {
  items:TeacherProfile[]
} & PaginationModel

export type TeacherProfileUpsertModel = {
  id?:number,
  userEmail: string,
  studyGroupIds: number[],
  subjectIds: number[]
}
