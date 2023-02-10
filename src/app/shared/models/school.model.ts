import {PaginationModel} from "./pagination.model";

export type SchoolInfo = {
  id: number,
  name: string,
  country: string,
  city: string
}

export type SchoolBasicInfo = {
  id: number,
  name: string
}

export type SchoolInfoPaged = {
  items: SchoolInfo[]
} & PaginationModel;

export type StudyGroupUpsertModel = {
  id?: number,
  name: string,
  subjectIds: number[]
}

export type SchoolProfile = {
  id: number,
  name: string,
  country: string,
  city: string,
  teachersCount: number,
  studentsCount: number
}
