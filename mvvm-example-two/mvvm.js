// 发布-订阅

class Dep {
  constructor() {
    this.subs = []
  }

  // 发布
  addSub(watcher) {
    this.subs.push(watcher)
  }

  // 订阅
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}

class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb

    this.oldVal = this.getVal()
  }

  getVal() {
    Dep.target = this
    const value = CompilerUtil.getValue(this.vm, this.expr)
    Dep.target = null
    return value
  }

  update() {
    const newVal = CompilerUtil.getValue(this.vm, this.expr)

    if (newVal !== this.oldVal) {
      this.cb(newVal)
    }
  }
}

// 数据劫持
class Observer {
  constructor(data) {
    this.observer(data)
    console.info(data)
  }

  observer(obj) {
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        this.defineReactive(obj, key, obj[key])
      }
    }
  }

  defineReactive(obj, key, value) {
    this.observer(value)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: (newValue) => {
        if (newValue !== value) {
          this.observer(newValue)
          value = newValue
          dep.notify()
        }
      },
    })
  }
}

// 核心编译模块
class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm

    // 将数据放入内存
    const fragment = this.node2fragment(this.el)

    // 用数据编译模板
    this.compiler(fragment)

    this.el.appendChild(fragment)
  }

  // 将数据放入内存
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(node.firstChild)
    }
    return fragment
  }

  // 判断是否为node节点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 判断是否为指令
  isDirective(name) {
    return name.startsWith('v-')
  }

  // 编译元素
  compilerElement(node) {
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
    const content = node.textContent
    if (/\{\{(.+?)\}\}/.test(content)) {
      CompilerUtil['text'](node, content, this.vm)
    }
  }

  // 用数据编译模板
  compiler(node) {
    const childNodes = node.childNodes
    ;[...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        this.compilerElement(child)
        this.compiler(child)
      } else {
        this.compilerText(child)
      }
    })
  }
}

// 工具类
CompilerUtil = {
  getValue(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },
  getContent(vm, expr) {
    return expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      return this.getValue(vm, args[1])
    })
  },
  setValue(vm, expr, value) {
    return expr.split('.').reduce((data, current, index, arr) => {
      if (index === arr.length - 1) {
        return (data[current] = value)
      }
      return data[current]
    }, vm.$data)
  },
  model(node, expr, vm) {
    const fn = this.updater['modelUpdater']

    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal)
    })

    node.addEventListener('input', (e) => {
      this.setValue(vm, expr, e.target.value)
    })

    const value = this.getValue(vm, expr)

    fn(node, value)
  },
  text(node, expr, vm) {
    const fn = this.updater['textUpdater']

    const value = expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      new Watcher(vm, args[1], () => {
        fn(node, this.getContent(vm, expr))
      })
      return this.getValue(vm, args[1])
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

// 手写一个mvvm
class Vue {
  constructor(options) {
    this.$el = options.el

    this.$data = options.data

    // 判断当前节点是否存在
    if (this.$el) {
      // 将所有数据转化为Object.defineProperty
      new Observer(this.$data)

      // 编译数据
      new Compiler(this.$el, this)
    }
  }
}
