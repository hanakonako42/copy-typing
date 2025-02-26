// //*****************値のみ出力、配列も気にせず１行ずつ */
// import * as fs from 'fs';

// function readJsonFile(filePath: string) {
//   const rawData = fs.readFileSync(filePath, 'utf-8');
//   return JSON.parse(rawData);
// }

// function printValues(value: any) {
//   if (Array.isArray(value)) {
//     value.forEach(item => printValues(item)); // 配列の場合、各要素を再帰的に処理
//   } else if (typeof value === 'object' && value !== null) {
//     Object.values(value).forEach(item => printValues(item)); // オブジェクトの場合、各プロパティの値を再帰的に処理
//   } else {
//     console.log(value); 
//   }
// }

// const jsonData = readJsonFile('test.json');
// printValues(jsonData);
// //****************************** */

// // //*****************値のみ出力、配列は末尾以外カンマつける */
// import * as fs from 'fs';

// function readJsonFile(filePath: string) {
//   const rawData = fs.readFileSync(filePath, 'utf-8');
//   return JSON.parse(rawData);
// }

// function printValues(value: any) {
//   if (Array.isArray(value)) {
//     value.forEach((item, index) => {
//       // 最後の要素以外にカンマをつけて改行
//       if (index < value.length - 1) {
//         console.log(`${item},`);
//       } else {
//         console.log(item); // 最後の要素はカンマなしで表示
//       }
//     });
//   } else if (typeof value === 'object' && value !== null) {
//     Object.values(value).forEach(item => printValues(item)); // オブジェクトの場合、各プロパティの値を再帰的に処理
//   } else {
//     console.log(value); // 最後に値がプリミティブな場合、そのまま出力
//   }
// }

// // メイン処理
// const jsonData = readJsonFile('test.json');
// printValues(jsonData);
// // //*********************************************/


// // 配列は[0][1]という感じでキーバリュー===========================
// import * as fs from 'fs';

// // JSONファイルを読み込む関数
// function readJsonFile(filePath: string) {
//   const rawData = fs.readFileSync(filePath, 'utf-8');
//   return JSON.parse(rawData);
// }

// // 再帰的にキーと値をExcel形式で出力する関数
// function formatForExcel(value: any, prefix: string = ''): string {
//   let result: string[] = [];

//   if (Array.isArray(value)) {
//     value.forEach((item, index) => {
//       const arrayPrefix = `${prefix}[${index}]`;
//       result.push(formatForExcel(item, arrayPrefix));
//     });
//   } else if (typeof value === 'object' && value !== null) {
//     Object.keys(value).forEach(key => {
//       const newPrefix = prefix ? `${prefix}.${key}` : key;
//       result.push(formatForExcel(value[key], newPrefix));
//     });
//   } else {
//     // 最後にキーと値をタブ区切りで返す
//     result.push(`${prefix}\t${value}`);
//   }

//   return result.join('\n');
// }

// // メイン処理
// const jsonData = readJsonFile('test.json');
// const formattedData = formatForExcel(jsonData);
// console.log(formattedData);
// // ======================================================

// // 配列は改行出力でキーバリュー、エクセル貼ってみたい===========================
// import * as fs from 'fs';

// // JSONファイルを読み込む関数
// function readJsonFile(filePath: string) {
//   const rawData = fs.readFileSync(filePath, 'utf-8');
//   return JSON.parse(rawData);
// }

// // 再帰的にキーと値をExcel形式で出力する関数
// function formatForExcel(value: any, prefix: string = ''): string {
//   let result: string[] = [];

//   if (Array.isArray(value)) {
//     // 配列の場合、要素を改行で区切って出力
//     const arrayValue = value.join('\n'); // 各要素を改行で区切る
//     result.push(`${prefix}\t${arrayValue}`);
//   } else if (typeof value === 'object' && value !== null) {
//     Object.keys(value).forEach(key => {
//       const newPrefix = prefix ? `${prefix}.${key}` : key;
//       result.push(formatForExcel(value[key], newPrefix));
//     });
//   } else {
//     // 最後にキーと値をタブ区切りで返す
//     result.push(`${prefix}\t${value}`);
//   }

//   return result.join('\n');
// }

// // メイン処理
// const jsonData = readJsonFile('test.json');
// const formattedData = formatForExcel(jsonData);
// console.log(formattedData);
//==============================================================

// // 配列はカンマ区切りで１列キーバリュー===========================
import * as fs from 'fs';

// JSONファイルを読み込む関数
function readJsonFile(filePath: string) {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}

// 再帰的にキーと値をExcel形式で出力する関数
function formatForExcel(value: any, prefix: string = ''): string {
  let result: string[] = [];

  if (Array.isArray(value)) {
    // 配列の場合、要素をカンマで区切って出力
    const arrayValue = value.join(','); // 各要素をカンマで区切る
    result.push(`${prefix}\t${arrayValue}`);
  } else if (typeof value === 'object' && value !== null) {
    Object.keys(value).forEach(key => {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      result.push(formatForExcel(value[key], newPrefix));
    });
  } else {
    // 最後にキーと値をタブ区切りで返す
    result.push(`${prefix}\t${value}`);
  }

  return result.join('\n');
}

// メイン処理
const jsonData = readJsonFile('test.json');
const formattedData = formatForExcel(jsonData);
console.log(formattedData);
