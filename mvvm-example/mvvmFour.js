class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    console.info(this.el)

    this.vm = vm

    // 把当前节点中的元素放到内存中
    let fragment = this.node2fragment(this.el)

    // 用数据编译模板
    this.compiler(fragment)

    this.el.appendChild(fragment)
  }

  // 判断是不是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 编译元素的
  compileElement(node) {
    let attributes = node.attributes // 类数组
    ;[...attributes].forEach((attr) => {
      let { name, value: expr } = attr
      if (this.isDirective(name)) {
        let [, directive] = name.split('-')
        console.info(this.vm)
        CompileUtil[directive](node, expr, this.vm)
      }
    })
  }

  // 编译文本
  compileText(node) {
    let content = node.textContent
    if (/\{\{(.+?)\}\}/.test(content)) {
      CompileUtil['text'](node, content, this.vm)
    }
  }

  // 核心的编译方法
  compiler(node) {
    // 用来编译内存中的dom节点
    let childNodes = node.childNodes
    ;[...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        this.compileElement(child)
        this.compiler(child)
      } else {
        // this.compileText(child)
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

  // 是不是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}

CompileUtil = {
  // 根据表达式取到对应的数据
  getVal(vm, expr) {
    console.info(vm)
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

  // 解析v-model 这个指令
  model(node, expr, vm) {
    let fn = this.updater['modelUpdater']
    // new Watcher(vm, expr, (newVal) => {
    //   // 给输入框加一个观察者，如果数据更新了会触发此方法
    //   fn(node, newVal)
    // })

    // node.addEventListener('input', (e) => {
    //   let value = e.target.value
    //   this.setValue(vm, expr, value)
    // })
    console.info(vm)
    let value = this.getVal(vm, expr)
    fn(node, value)
  },

  html() {},

  getContentValue(vm, expr) {
    // 遍历表达式，将内容重新替换成一个完整的内容 返还回去
    return expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1])
    })
  },

  text(node, expr, vm) {
    let fn = this.updater['textUpdater']
    let content = expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      // 给表达式每个变量加观察者
      // new Watcher(vm, args[1], () => {
      //   fn(node, this.getContentValue(vm, expr))
      // })
      return this.getVal(vm, args[1])
    })
    fn(node, content)
  },

  updater: {
    modelUpdater(node, value) {
      node.value = value
    },
    textUpdater(node, value) {
      node.textContent = value
    },
    htmlUpdater() {},
  },
}

class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    if (this.$el) {
      new Compiler(this.$el, this)
    }
  }
}
