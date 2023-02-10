import {StudyGroupBasicInfo} from "./study-group.model";
import {PaginationModel} from "./pagination.model";

export type TeacherProfile = {
  id: string,
  firstName: string
  lastName: string,
  email: string,
  studyGroups: StudyGroupBasicInfo[]
}

export type TeacherProfilePaged = {
  items:TeacherProfile[]
} & PaginationModel

export type TeacherProfileCreateModel = {
  userEmail: string,
  studyGroupIds: number[]
}
