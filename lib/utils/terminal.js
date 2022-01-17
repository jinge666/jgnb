// 执行终端命令代码

const {spawn} = require('child_process')  //创建另外一个进程

const commandSpawn = (...args) => {
  return new Promise((resolve,reject) => {
    // spawn接收三个参数：
  // 第一个：执行的命令
  // 第二个：string[] 执行的参数
  // 第三个：可选的配置项
  const childProcess = spawn(...args)
  // 将执行的命令打印信息放进当前进程管道打印出来
  childProcess.stdout.pipe(process.stdout)
  // 将执行的命令错误信息放进当前进程管道打印出来
  childProcess.stderr.pipe(process.stderr)
  // 进程执行完毕
  childProcess.on('close',() => {
    resolve()
  })
  })
}

module.exports = {
  commandSpawn
}