import {StudyGroupBasicInfo} from "./study-group.model";
import {PaginationModel} from "./pagination.model";

export type TeacherProfile = {
  id: number,
  firstName: string
  lastName: string,
  email: string,
  studyGroups: StudyGroupBasicInfo[]
}

export type TeacherProfilePaged = {
  items:TeacherProfile[]
} & PaginationModel

export type TeacherProfileUpsertModel = {
  id?:number,
  userEmail: string,
  studyGroupIds: number[]
}
