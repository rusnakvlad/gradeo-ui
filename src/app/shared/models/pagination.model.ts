export interface PaginationModel {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
}

export const DefaultPageNumber: number = 1;
export const DefaultPageSize: number = 5;

