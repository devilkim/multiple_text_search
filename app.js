require('shelljs/global');

const fileName = 'list.txt';
const path = [
  // '/home/devilkim36/data/tong_server_api/',
  // '/home/devilkim36/data/tong_sales/',
  // '/home/devilkim36/data/tong_cs/',
  // '/home/devilkim36/data/api_tong_admin/',
  '/home/devilkim36/data/codestar-tong-admin3/'
  // '/home/devilkim36/data/api_tong_app/',
  // '/home/devilkim36/data/codestar-tong-app3/'
];

searchStringInFiles(path, fileName);

// createFiles("../tong_db/procedure/", "list.txt");

function createFiles(target, fileName) {
  const fs = require('fs');
  const textList = fs.readFileSync(fileName, 'utf8').split("\n").filter(item => item !== '');

  mkdir(target);

  textList.map(textItem => {
    exec(`touch ${target}${textItem}`);
  });
}

function searchStringInFiles(pathList, fileName) {
  const fs = require('fs');
  const datetime = datetimeSerialize(new Date());
  const textList = fs.readFileSync(fileName, 'utf8').split("\n").filter(item => item !== '');

  mkdir('result');
  mkdir(`./result/${datetime}`);

  textList.map(textItem => {
    let output = '';
    let result;
    let isExists = false;
    pathList.map(pathItem => {
      console.log(`Processing '${textItem}' in '${pathItem}'.`);
      output += `########## ${pathItem} ##########\n`;
      result = exec(`grep -r "${textItem}" ${pathItem}`, {silent: true}) + '';
      output += result;
      isExists = isExists || result !== ''
      output += '\n';
    });
    if (isExists) fs.writeFileSync(`./result/${datetime}/${textItem}.txt`, output, 'utf8');
  });
}

function datetimeSerialize(date) {
  date.setHours(date.getHours() + 9);
	const year = date.getFullYear();
	const month = ("0" + (parseInt(date.getMonth()) + 1)).slice(-2);
	const day = ("0" + date.getDate()).slice(-2);
	const hours = ("0" + date.getHours()).slice(-2);
	const minutes = ("0" + date.getMinutes()).slice(-2);
	const seconds = ("0" + date.getSeconds()).slice(-2);
  return year + month + day + '_' + hours + minutes + seconds;
};
