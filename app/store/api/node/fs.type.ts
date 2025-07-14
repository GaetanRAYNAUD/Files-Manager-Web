import type { UserDto } from '~/store/api/user/user.type';

export interface FsNodeDto {
  id: string;
  name: string;
  contentType: string;
  size: number;
  owner: UserDto;
  creationDate: Date;
  createdBy: UserDto;
  modificationDate: Date;
  modifiedBy: UserDto;
}

export enum SearchNodesSort {
  CREATION_ASC = 'CREATION_ASC',
  CREATION_DESC = 'CREATION_DESC',
  MODIFICATION_ASC = 'MODIFICATION_ASC',
  MODIFICATION_DESC = 'MODIFICATION_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC'
}

export interface FsNodeSearch {
  id?: string;
  q?: string;
  page?: number;
  sort?: SearchNodesSort;
}