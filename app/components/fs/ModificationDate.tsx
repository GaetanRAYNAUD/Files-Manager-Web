import { type FC } from 'react';
import { FormattedDate } from 'react-intl';
import type { FsNodeDto } from '~/store/api/node/fs.type';

interface Props {
  node: FsNodeDto;
}

export const ModificationDate: FC<Props> = ({ node }) => {
  const modificationDate = new Date(node.modificationDate);
  const today = new Date();

  const modifiedToday = modificationDate.getDate() === today.getDate() &&
    modificationDate.getMonth() === today.getMonth() &&
    modificationDate.getFullYear() === today.getFullYear();

  return modifiedToday ? (
    <FormattedDate value={ modificationDate } hour='numeric' minute='numeric'/>
  ) : (
    <FormattedDate
      value={ modificationDate }
      day='numeric'
      month='short'
      year='numeric'
    />
  );
};