class Dep {
  constructor() {
    this.subs = []
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

    // 获取到老值
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

class Observer {
  constructor(data) {
    console.info(data)
    this.observer(data)
  }

  observer(obj) {
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        this.defineReactivity(obj, key, obj[key])
      }
    }
  }

  defineReactivity(obj, key, value) {
    this.observer(value)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
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

// 核心编译
class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)

    this.vm = vm
    // 将模板放入内存
    const fragment = this.node2fragment(this.el)

    console.info(fragment)

    // 用数据编译模板
    this.compiler(fragment)

    // 从内存中将模板返回
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

    if (/{\{(.+?)\}\}/.test(content)) {
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

  // 是否为node节点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 模板放入内存
  node2fragment(node) {
    let fragment = document.createDocumentFragment()

    let firstChild
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}

CompilerUtil = {
  getVal(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },

  setValue(vm, expr, value) {
    return expr.split('.').reduce((data, current, index, arr) => {
      if (index === arr.length - 1) {
        return (data[current] = value)
      }
      return data[current]
    }, vm.$data)
  },

  getContent(vm, expr) {
    return expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1])
    })
  },
  model(node, expr, vm) {
    const fn = this.updater['modelUpdater']

    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal)
    })

    node.addEventListener('input', (e) => {
      this.setValue(vm, expr, e.target.value)
    })

    const value = this.getVal(vm, expr)

    fn(node, value)
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

// 手写mvvm.js
class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    if (this.$el) {
      // 将所有data转化为Object.defineProperty
      new Observer(this.$data)
      // 编译模块
      new Compiler(this.$el, this)
    }
  }
}
