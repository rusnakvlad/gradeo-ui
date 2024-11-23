import {StudyGroupBasicInfo} from "./study-group.model";
import {PaginationModel} from "./pagination.model";

export type StudentProfile = {
  id: number,
  firstName: string
  lastName: string,
  email: string,
  gender: string
  ethnicity: string
  parentalLevelOfEducation: string
  lunch: string
  testPreparationCourse: string
  studyGroups: StudyGroupBasicInfo[]
}

export type StudentProfilePaged = {
  items:StudentProfile[]
} & PaginationModel

export type StudentProfileUpsertModel = {
  id?:number,
  userEmail: string,
  studyGroupId: number
  gender: string
  ethnicity: string
  parentalLevelOfEducation: string
  lunch: string
  testPreparationCourse: string
}
