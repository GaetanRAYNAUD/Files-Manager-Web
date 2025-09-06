export const EXPIRES = 'expires';
export const FOLDER_CONTENT_TYPE = 'application/vnd.files-manager.folder';

export const isPreviewable = (contentType: string): boolean => {
  return contentType.startsWith('image/') || isPreviewableInIFrame(contentType);
};

export const isPreviewableInIFrame = (contentType: string): boolean => {
  return contentType === 'application/pdf' ||
    contentType === 'text/plain' ||
    contentType === 'application/json' ||
    contentType === 'application/xml';
};