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
