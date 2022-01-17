const path = require('path')
const fs = require('fs')

const ejs = require('ejs')

// 编译ejs模板result
const compile = (name,data) => {
  const filePath = path.resolve(__dirname,`../template/${name}`)
  return new Promise((resolve,reject) => {
    ejs.renderFile(filePath,{data},{},(err,result) => {
      if(err) {
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}
// 创建编译后文件
const writeToFile = (filePath,content) => {
  return fs.promises.writeFile(filePath,content)
}
// 创建文件夹
const createDir = (fileName) => {
  if(fs.existsSync(fileName)) {
    return
  }else{
    fs.mkdirSync(fileName)
  }
}

module.exports = {
  compile,
  writeToFile,
  createDir
}