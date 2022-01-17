const program = require('commander')

const helpOptions = () => {
  // 增加选项
  program.option('-d, --dest <dest>','a destination folder,例如：-d /sre/components')
  program.option('-f, --framwork <framwork>','your framwork')

  // 监听指令
  program.on('--help',function () {
    console.log(" ");
    console.log("other");
    console.log(" other options");
  })
}


module.exports = helpOptions