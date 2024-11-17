import {PaginationModel} from "./pagination.model";
import {UserType} from "../enums/user-type";

export type User = {
  id: string,
  firstName: string
  lastName: string,
  email: string,
  userType?: string,
  roleIds: number[]
}

export type CreateUserModel = {
  userMetadata: User,
  businessUnitId?: number,
  roleIds: number[]
}

export type UsersPaged = {
  items: User[]
} & PaginationModel;

export type UserDetails = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  userType?: UserType,
  systemType: number,
  businessUnitId?: number
  permissions: number[]
}

export type UserFilterModel = {
  searchTerm?: string,
  userType?: UserType
}

export type UpdateUserModel = {
  userId: string,
  firstName: string,
  lastName: string,
  roleIds: number[],
}
