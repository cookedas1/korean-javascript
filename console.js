// console.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { translateCode } = require('./main');

function startConsole() {
  console.log("korean javascript v1");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  rl.prompt();

  rl.on('line', (line) => {
    const trimmed = line.trim();

    if (trimmed.endsWith('*.ks')) {
      const filePath = path.resolve(trimmed);

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const translated = translateCode(fileContent, trimmed);
        eval(translated);
      } else {
        console.error(`오류: 파일 ${trimmed}을(를) 찾을 수 없습니다. 올바른 파일인지 확인하세요.`);
      }
    } else if (trimmed === 'exit') {
      rl.close();
    } else {
      console.error('오류: 잘못된 명령어어입니다.');
    }

    rl.prompt();
  });

  rl.on('close', () => {
    process.exit(0);
  });
}

if (require.main === module) {
  startConsole();
}

module.exports = { startConsole };
