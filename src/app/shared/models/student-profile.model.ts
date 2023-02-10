import {StudyGroupBasicInfo} from "./study-group.model";
import {PaginationModel} from "./pagination.model";

export type StudentProfile = {
  id: string,
  firstName: string
  lastName: string,
  email: string,
  studyGroups: StudyGroupBasicInfo[]
}

export type StudentProfilePaged = {
  items:StudentProfile[]
} & PaginationModel

export type StudentProfileCreateModel = {
  userEmail: string,
  studyGroupId: number
}
