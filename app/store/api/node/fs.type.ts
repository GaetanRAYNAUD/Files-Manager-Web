import type { UserDto } from '~/store/api/user/user.type';

export interface BreadcrumbItemDto {
  id: string;
  name: string;
  owner: boolean;
}

export interface FsNodeDto {
  id: string;
  name: string;
  contentType: string;
  size?: number;
  owner: UserDto;
  creationDate: Date;
  createdBy: UserDto;
  modificationDate: Date;
  modifiedBy: UserDto;
  breadcrumbs?: BreadcrumbItemDto[];
}

export enum SearchNodesSort {
  CREATION_DATE_ASC = 'CREATION_DATE_ASC',
  CREATION_DATE_DESC = 'CREATION_DATE_DESC',
  MODIFICATION_DATE_ASC = 'MODIFICATION_DATE_ASC',
  MODIFICATION_DATE_DESC = 'MODIFICATION_DATE_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC'
}

export interface FsNodeSearch {
  id?: string;
  q?: string;
  page?: number;
  sort?: SearchNodesSort;
}

export interface FsNodeRename {
  id: string;
  name: string;
}

export interface FsNodeDownload {
  id: string;
  inline?: boolean;
}