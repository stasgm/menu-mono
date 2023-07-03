/**
 * Formats Date into string representation
 */
export const formatDateTime = (date: Date) => {
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

  return day + '/' + month + ' . ' + hours + ':' + minutes;
};

/**
 * Formats int bytes into string representation
 */
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

export const delay = (time: number, value: null | unknown = null, rejectDelay = false) => {
  return new Promise(function (resolve, reject) {
    const callback = rejectDelay === true ? reject : resolve;
    setTimeout(callback.bind(null, value), time);
  });
};

export const isNonEmptyArray = <T>(arr: T[]) => {
  return Array.isArray(arr) && arr.length > 0;
};
