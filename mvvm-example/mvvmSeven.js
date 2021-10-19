// 观察者模式  （发布-订阅）

class Dep {
  constructor() {
    this.subs = []
  }

  // 发布
  addSubs(watcher) {
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

    // 获取老值
    this.oldVal = this.get()
  }

  get() {
    Dep.target = this
    const value = CompilerUtil.getVal(this.vm, this.expr)
    Dep.target = null
    return value
  }

  update() {
    const newVal = CompilerUtil.getVal(this.vm, this.expr)
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
        Dep.target && dep.addSubs(Dep.target)
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

// 编译
class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 将模板放入内存
    const fragment = this.node2fragment(this.el)
    // 用数据编译模板
    this.comiler(fragment)
    this.el.appendChild(fragment)
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

  // 核心编译模块
  comiler(node) {
    const childNodes = node.childNodes
    ;[...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        this.compilerElement(child)
        this.comiler(child)
      } else {
        this.compilerText(child)
      }
    })
  }

  // 判断是否是node节点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 将模板放入内存
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}

// 工具类
CompilerUtil = {
  getVal(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },

  setVal(vm, expr, value) {
    return expr.split('.').reduce((data, current, index, arr) => {
      if (arr.length - 1 == index) {
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
      this.setVal(vm, expr, e.target.value)
    })
    const value = this.getVal(vm, expr)
    fn(node, value)
  },

  getContent(vm, expr) {
    return expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1])
    })
  },

  text(node, expr, vm) {
    const fn = this.updater['textUpdater']
    const value = expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      new Watcher(vm, args[1], () => {
        fn(node, this.getContent(vm, expr))
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

// 手写一个MVVM.js
class Vue {
  constructor(options) {
    this.$el = options.el

    this.$data = options.data

    if (this.$el) {
      // 将所有数据都变为Object.defineProperty
      new Observer(this.$data)
      // 编译数据模块
      new Compiler(this.$el, this)
    }
  }
}
