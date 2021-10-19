class Dep {
  constructor() {
    this.subs = [] // 存放所有的watcher
  }

  // 订阅
  addSub(watcher) {
    this.subs.push(watcher)
  }

  // 发布
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}

class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb

    // 默认先存放一个老值
    this.oldValue = this.get()
  }

  get() {
    // vm.$data.school
    Dep.target = this // 先把自己放在this上
    let value = CompilerUtil.getVal(this.vm, this.expr)
    Dep.target = null
    return value
  }

  update() {
    let newVal = CompilerUtil.getVal(this.vm, this.expr)
    if (newVal !== this.oldValue) {
      this.cb(newVal)
    }
  }
}

// 实现数据劫持
class Observer {
  constructor(data) {
    this.observer(data)
  }

  observer(data) {
    if (data && typeof data === 'object') {
      for (let key in data) {
        this.defineReactive(data, key, data[key])
      }
    }
  }

  defineReactive(obj, key, value) {
    this.observer(value)
    let dep = new Dep() // 给每个属性，都加上一个具有发布订阅的功能
    Object.defineProperty(obj, key, {
      get() {
        // 创建watcher时，会取到对应的内容，并且把watcher放在全局上
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: (newVal) => {
        if (newVal !== value) {
          this.observer(newVal)
          value = newVal
          dep.notify()
        }
      },
    })
  }
}

class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)

    this.vm = vm

    // 将模板放入内存
    const fragment = this.node2fragment(this.el)

    // 编译模板字符串
    this.compiler(fragment)

    // 从内存中写入
    this.el.appendChild(fragment)
  }

  isDirective(name) {
    return name.startsWith('v-')
  }

  // 编译元素
  compilerModel(node) {
    const attributes = node.attributes
    ;[...attributes].forEach((attr) => {
      const { name, value: expr } = attr
      if (this.isDirective(name)) {
        const [, directive] = name.split('-')
        CompilerUtil[directive](node, expr, this.vm)
      }
    })
  }

  // 编译文本
  compilerText(node) {
    const textContent = node.textContent
    if (/\{\{.+?\}\}/.test(textContent)) {
      CompilerUtil['text'](node, textContent, this.vm)
    }
  }

  // 核心编译模块
  compiler(node) {
    const childNodes = node.childNodes
    ;[...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        this.compilerModel(child)
        this.compiler(child)
      } else {
        this.compilerText(child)
      }
    })
  }

  // 将模板放入内存中
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }

  // 判断是否为node节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}

// 通用方法
CompilerUtil = {
  getVal(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },

  setValue(vm, expr, value) {
    expr.split('.').reduce((data, current, index, arr) => {
      if (index == arr.length - 1) {
        return (data[current] = value)
      }
      return data[current]
    }, vm.$data)
  },

  model(node, expr, vm) {
    const fn = this.updater['modelUpdater']

    new Watcher(vm, expr, (newVal) => {
      // 给输入框加一个观察者，如果数据更新了会触发此方法
      fn(node, newVal)
    })

    node.addEventListener('input', (e) => {
      let value = e.target.value
      this.setValue(vm, expr, value)
    })

    const value = this.getVal(vm, expr)

    fn(node, value)
  },

  getContentValue(vm, expr) {
    // 遍历表达式，将内容重新替换成一个完整的内容 返还回去
    return expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1])
    })
  },

  text(node, expr, vm) {
    const fn = this.updater['textUpdater']
    const value = expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      // 给表达式每个变量加观察者
      new Watcher(vm, args[1], () => {
        fn(node, this.getContentValue(vm, expr))
      })
      return this.getVal(vm, args[1])
    })
    fn(node, value)
  },

  updater: {
    modelUpdater(node, value) {
      node.value = value
    },
    textUpdater(node, value) {
      node.textContent = value
    },
  },
}

class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    if (this.$el) {
      // 将所有数据都转化成Object.defineProperty
      new Observer(this.$data)

      new Compiler(this.$el, this)
    }
  }
}
