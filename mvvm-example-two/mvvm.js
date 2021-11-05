class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm

    console.info('1111', this.el)
  }

  // 判断是否为node节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}

// 手写一个mvvm
class Vue {
  constructor(options) {
    this.$el = options.el

    this.$data = options.data

    // 判断当前节点是否存在
    if (this.$el) {
      // 编译数据
      new Compiler(this.$el, this)
    }
  }
}
