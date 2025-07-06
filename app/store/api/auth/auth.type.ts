import type { SupportedProvider } from '~/auth/auth.types';

export interface AuthTokensDto {
  expires_in: number;
}

export interface AuthTokenRequestDto {
  token: string;
  provider: SupportedProvider;
}