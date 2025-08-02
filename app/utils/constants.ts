export const EXPIRES = 'expires';
export const FOLDER_CONTENT_TYPE = 'application/vnd.files-manager.folder';

export const isPreviewable = (contentType: string): boolean => {
  return contentType.startsWith('image/') || contentType === 'application/pdf';
};