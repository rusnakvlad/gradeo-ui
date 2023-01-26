import {PaginationModel} from "./pagination.model";

export type User = {
  id: string,
  firstName: string
  lastName: string,
  email: string,
}

export type UsersPaged = {
  items: User[]
} & PaginationModel;
