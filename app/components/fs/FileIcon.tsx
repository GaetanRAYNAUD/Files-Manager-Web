import {
  Article,
  AudioFile,
  BackupTable,
  Code,
  DataObject,
  Description,
  Event,
  Folder,
  FolderZip,
  GifBox,
  Image,
  InsertDriveFile,
  Movie,
  PictureAsPdf,
  Slideshow,
  type SvgIconComponent
} from '@mui/icons-material';
import React, { type FC } from 'react';
import { FOLDER_CONTENT_TYPE } from '~/utils/constants';

const getIcon = (contentType: string): SvgIconComponent => {
  if (contentType.startsWith('image/')) {
    if (contentType === 'image/gif') {
      return GifBox;
    }

    return Image;
  }

  if (contentType.startsWith('video/')) {
    return Movie;
  }

  if (contentType.startsWith('audio/')) {
    return AudioFile;
  }

  if (contentType.startsWith('text/')) {
    if (contentType === 'text/calendar') {
      return Event;
    } else if (contentType === 'text/html') {
      return Code;
    }

    return Description;
  }

  switch (contentType) {
    case FOLDER_CONTENT_TYPE:
      return Folder;
    case 'application/javascript':
    case 'application/typescript':
      return Code;
    case 'application/pdf':
      return PictureAsPdf;
    case 'application/json':
    case 'application/xml':
      return DataObject;
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/vnd.oasis.opendocument.text':
      return Article;
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'application/vnd.oasis.opendocument.presentation':
      return Slideshow;
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.oasis.opendocument.spreadsheet':
      return BackupTable;
    case 'application/zip':
    case 'application/x-rar-compressed':
    case 'application/x-tar':
    case 'application/rar':
    case 'application/x-7z-compressed':
      return FolderZip;
    default:
      return InsertDriveFile;
  }
};

interface Props {
  contentType: string;
  width?: number;
  height?: number;
}

export const FileIcon: FC<Props> = ({ contentType, width, height }) => {
  const IconComponent = getIcon(contentType);

  return <IconComponent color='primary' width={ width } height={ height }/>;
};