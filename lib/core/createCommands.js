const program = require('commander')
const {
  createProjectAction,
  addCpnAction,
  addPagesAction,
  addStoreAction
} = require('./action')

const createCommands = () => {
  program
    .command('create <project> [other...]')  //[other...]接收其他可选参数
    .description('克隆仓库到本地')
    .action(createProjectAction)
  
  program
    .command('addcpn <name>')
    .description('创建vue模块文件')
    .action((name) => {
      addCpnAction(name,program._optionValues.dest || 'src/components')
    })

  program
    .command('addpag <name>')
    .description('创建vue的pages文件夹')
    .action((name) => {
      addPagesAction(name,program._optionValues.dest || 'src/pages')
    })
  program
    .command('addstore <name>')
    .description('创建vue的store文件夹')
    .action((name) => {
      addStoreAction(name,program._optionValues.dest || 'src/store/modules')
    })
}

module.exports = createCommands