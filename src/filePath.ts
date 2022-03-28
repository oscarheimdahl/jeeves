import path = require('path');

export function filePath(filePath: string) {
  return path.resolve(__dirname, filePath);
}
