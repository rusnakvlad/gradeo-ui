import {Permission} from "./permission.model";
import {PaginationModel} from "./pagination.model";

export type Role = {
  id: number,
  roleName: string,
  isDefault:boolean,
  businessUnitId?: number,
  permissions: Permission[]
}

export type RoleUpsertModel = {
  id?: number,
  roleName: string,
  businessUnitId?: number
  permissions: number[]
}

export type RoleBasicInfo = {
  id: number,
  roleName: string
}

export type RolePaged = {
  items: Role[]
} & PaginationModel
