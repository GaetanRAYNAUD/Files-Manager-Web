export enum UserRole {
  PENDING = 'PENDING',
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface SsoConnectionDto {
  provider: string;
  userId: string;
}

export interface ProfileDto {
  id: string;
  name: string;
  image?: string;
  ssoConnections: SsoConnectionDto[];
  role: UserRole;
}

export interface UserDto {
  id: string;
  name: string;
  image?: string;
}