import type { FC } from 'react';
import { AmazonLogo } from '~/assets/logo/amazon';
import { DiscordLogo } from '~/assets/logo/discord';
import { GithubLogo } from '~/assets/logo/github';
import { GoogleLogo } from '~/assets/logo/google';
import { TwitchLogo } from '~/assets/logo/twitch';

export enum SupportedProvider {
  GOOGLE = 'google',
  GITHUB = 'github',
  DISCORD = 'discord',
  TWITCH = 'twitch',
  AMAZON = 'amazon'
}

type OidcProviderProps = { icon: FC<{ width?: string, height?: string }>, label: string };

export const oidcConfigs: Record<SupportedProvider, OidcProviderProps> = {
  [SupportedProvider.GOOGLE]: {
    icon: GoogleLogo,
    label: 'Google'
  },
  [SupportedProvider.GITHUB]: {
    icon: GithubLogo,
    label: 'Github'
  },
  [SupportedProvider.DISCORD]: {
    icon: DiscordLogo,
    label: 'Discord'
  },
  [SupportedProvider.TWITCH]: {
    icon: TwitchLogo,
    label: 'Twitch'
  },
  [SupportedProvider.AMAZON]: {
    icon: AmazonLogo,
    label: 'Amazon'
  }
};