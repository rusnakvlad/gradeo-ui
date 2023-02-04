import {Permission} from "./permission.model";
import {PaginationModel} from "./pagination.model";

export type Role = {
  id: number,
  roleName: string,
  businessUnitId?: number,
  permissions: Permission[]
}

export type RoleCreateModel = {
  roleName: string,
  businessUnitId: number
  permissions: number[]
}

export type RolePaged = {
  items: Role[]
} & PaginationModel
