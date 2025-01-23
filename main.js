const { reportError } = require('./error');

const rules = {
  '콘솔': 'console',
  '로그': 'log',
};

function translateCode(koreanCode, filePath) {
  const lines = koreanCode.split('\n');
  let translatedCode = '';

  lines.forEach((line, index) => {
    let translatedLine = line;
    const words = line.split(/\s+/);

    words.forEach(word => {
      if (word && !rules[word] && !/^[\.\(\);]+$/.test(word)) {
        reportError(filePath, index + 1, word);
      } else {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        translatedLine = translatedLine.replace(regex, rules[word] || word);
      }
    });

    translatedCode += translatedLine + '\n';
  });

  return translatedCode.trim();
}

module.exports = { rules, translateCode };