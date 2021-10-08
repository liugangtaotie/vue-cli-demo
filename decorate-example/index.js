// @docorate anotation 注解风格的装饰器
class Log {
  print(msg) {
    console.info(msg)
  }
}

function decorate(target, property, descriptor) {
  const oldValue = descriptor.value
  descriptor.value = (msg) => {
    return oldValue.apply(null, [`[${msg}]`])
  }
  return descriptor
}

const anotation = (target, proterty, decorate) => {
  const descriptor = decorate(
    target.prototype,
    proterty,
    Object.getOwnPropertyDescriptor(target.prototype, proterty)
  )
  Object.defineProperty(target.prototype, proterty, descriptor)
}

anotation(Log, 'print', decorate)

const log = new Log()

log.print('laoxiang')
