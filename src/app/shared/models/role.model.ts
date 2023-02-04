import {Permission} from "./permission.model";
import {PaginationModel} from "./pagination.model";

export type Role = {
  id: number,
  roleName: string,
  businessUnitId?: number,
  permissions: Permission[]
}

export type RolePaged = {
  items: Role[]
} & PaginationModel
