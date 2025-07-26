import React, { type FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { ModificationDate } from '~/components/dates/ModificationDate';
import type { FsNodeDto } from '~/store/api/node/fs.type';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

interface Props {
  node: FsNodeDto;
  long?: boolean;
}

export const ModificationBy: FC<Props> = ({ node, long = true }) => {
  const profile = useAppSelector(selectProfile);
  const modificationDate = new Date(node.modificationDate);
  const today = new Date();

  const modifiedToday = modificationDate.getDate() === today.getDate() &&
    modificationDate.getMonth() === today.getMonth() &&
    modificationDate.getFullYear() === today.getFullYear();
  const modifiedByMe = node.modifiedBy.id === profile?.id;

  return long ? (
    <FormattedMessage
      id={ modifiedToday ? 'fs.modifiedToday' : 'fs.modified' }
      values={ {
        user: modifiedByMe ? <FormattedMessage id='user.me' /> : node.modifiedBy.name,
        date: <ModificationDate node={ node }/>
      } }
    />
  ) : (
    <FormattedMessage
      id={ modifiedToday ? 'fs.modifiedByToday' : 'fs.modifiedBy' }
      values={ {
        user: modifiedByMe ? <FormattedMessage id='user.me' /> : node.modifiedBy.name,
        date: <ModificationDate node={ node }/>
      } }
    />
  );
};