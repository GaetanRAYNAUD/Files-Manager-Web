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
  id: number;
  name: string;
  image?: string;
  ssoConnections: SsoConnectionDto[];
  role: UserRole;
}