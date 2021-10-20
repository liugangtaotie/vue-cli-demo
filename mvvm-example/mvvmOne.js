class Dep {
  constructor() {
    this.subs = []
  }

  addSub(watcher) {
    this.subs.push(watcher)
  }

  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}

class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb

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

    const fragment = this.node2fragment(this.el)

    this.compiler(fragment)

    this.el.appendChild(fragment)
  }

  isDirective(name) {
    return name.startsWith('v-')
  }

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

  compilerText(node) {
    const content = node.textContent

    if (/\{\{(.+?)\}\}/.test(content)) {
      CompilerUtil['text'](node, content, this.vm)
    }
  }

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

  node2fragment(node) {
    let fragment = document.createDocumentFragment()

    let firstChild
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(firstChild)
    }

    return fragment
  }

  isElementNode(node) {
    return node.nodeType === 1
  }
}

CompilerUtil = {
  getVal(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },

  setVal(vm, expr, value) {
    return expr.split('.').reduce((data, current, index, arr) => {
      if (index == arr.length - 1) {
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
      this.setVal(vm, expr, e.target.value)
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

// 手写一个mvvm.js
class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    let computed = options.computed

    if (this.$el) {
      // 将所有data转化为Object.defineProperty
      new Observer(this.$data)

      for (let key in computed) {
        Object.defineProperty(this.$data, key, {
          get: () => {
            console.info(this)
            console.info(computed[key].call(this))
            return computed[key].call(this)
          },
        })
      }

      // 把数据获取操作，vm上取值操作 都代理到 vm.$data
      this.proxyVm(this.$data)

      // 编译
      new Compiler(this.$el, this)
    }
  }

  proxyVm(data) {
    for (let key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set() {},
      })
    }
  }
}
