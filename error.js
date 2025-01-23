const path = require('path');

function reportError(filePath, lineNumber, invalidWord) {
  const fileName = path.basename(filePath);
  const errorMessage = `
오류: 맞지 않는 문법입니다.
파일: ${fileName}
라인: ${lineNumber}
문제된 단어: ${invalidWord}
  `;
  console.error(errorMessage);
}

module.exports = { reportError };
