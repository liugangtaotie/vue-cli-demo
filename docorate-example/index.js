class Log {
  print(msg) {
    console.info(msg)
  }
}

const dec = (target, property) => {
  const old = target.prototype[property]
  target.prototype[property] = (msg) => {
    old(`{${msg}}`)
  }
}

dec(Log, 'print')

const log = new Log()

log.print('laoxiang')
