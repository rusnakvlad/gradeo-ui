import {PaginationModel} from "./pagination.model";
import {UserType} from "../enums/user-type";

export type User = {
  id: string,
  firstName: string
  lastName: string,
  email: string,
  userType?: string
}

export type UsersPaged = {
  items: User[]
} & PaginationModel;
