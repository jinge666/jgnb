const {promisify} = require('util')

const download = promisify(require('download-git-repo'))
const open = require('open')
const path = require('path')

const {vueRepo} = require('../config/repo-config')
const {commandSpawn} = require('../utils/terminal')
const {compile,writeToFile,createDir} = require('../utils/utils')

const createProjectAction = async (project) => {
  console.log('欢迎使用文定的脚手架');
  // 1.clone项目
  await download(vueRepo,project,{clone:true})
  // 2.执行npm install  window系统npm.cmd
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command,['install'],{cwd:`./${project}`})
  // 3.执行npm install
  commandSpawn(command,['run','serve'],{cwd:`./${project}`})
  // 打开浏览器
  open('http://localhost:8080')
}

const addCpnAction = async (name,dest) => {
  // 1.创建ejs模板
  // 2.编译ejs模板result
  const result = await compile('vue-components.ejs',{name,lowerName:name.toLowerCase()})
  // 3.将result写入到vue文件夹
  const filepath = path.resolve(dest,`${name}.vue`)
  // 4.放到对应的文件夹中
  await writeToFile(filepath,result)
}

const addPagesAction = async (name,dest) => {
  const data = {name,lowerName:name.toLowerCase()}
  const resuleComponents = await compile('vue-components.ejs',data)
  const resultRouter = await compile('vue-router.ejs',data)
  const fileName = path.resolve(dest,name)
  createDir(fileName)
  await writeToFile(path.resolve(fileName,`${name}.vue`),resuleComponents)
  await writeToFile(path.resolve(fileName,'router.js'),resultRouter)
}

const addStoreAction = async (name,dest) => {
  const data = {name,lowerName:name.toLowerCase()}
  const resuleComponents = await compile('vue-store.ejs',data)
  const resultRouter = await compile('vue-type.ejs',data)
  const fileName = path.resolve(dest,name)
  createDir(fileName)
  await writeToFile(path.resolve(fileName,'store.js'),resuleComponents)
  await writeToFile(path.resolve(fileName,'type.js'),resultRouter)
}

module.exports = {
  createProjectAction,
  addCpnAction,
  addPagesAction,
  addStoreAction
}