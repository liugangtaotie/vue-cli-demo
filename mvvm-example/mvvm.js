// 手写一个mvvm.js
class Vue {
  constructor(options) {
    this.$data = options.data
    this.observe(this.$data)
    // 执行编译
    new Compile(options.el, this)
  }

  observe(value) {
    if (!value || typeof value !== 'object') {
      return
    }
    Object.keys(value).forEach((key) => {
      this.defineReactive(value, key, value[key])
      // 为vue的data做属性代理
      this.proxyData(key)
    })
  }

  defineReactive(obj, key, val) {
    // 递归查找嵌套属性
    this.observe(val)

    // 创建Dep
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addDep(Dep.target)
        // console.log(dep.deps);
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        dep.notify()
      },
    })
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      },
    })
  }
}

// 依赖管理器：负责将视图中所有依赖收集管理，包括依赖添加和通知
class Dep {
  constructor() {
    // deps里面存放的是Watcher的实例
    this.deps = []
  }
  addDep(dep) {
    this.deps.push(dep)
  }
  // 通知所有watcher执行更新
  notify() {
    this.deps.forEach((dep) => {
      dep.update()
    })
  }
}

// Watcher: 具体的更新执行者
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将来 new 一个监听器时，将当前 Watcher 实例附加到 Dep.target
    // 将来通过 Dep.target 就能拿到当时创建的 Watcher 实例
    Dep.target = this
    // 读取操作，主动触发 get，当前 Watcher 实例被添加到依赖管理器中
    this.vm[this.key]
    // 清空操作，避免不必要的重复添加（再次触发 get 就不需要再添加 watcher 了）
    Dep.target = null
  }
  update() {
    // console.log('from Watcher update: 视图更新啦！！！');
    // 通知页面做更新
    this.cb.call(this.vm, this.vm[this.key])
  }
}

// 扫描模板中所有依赖（指令、插值、绑定、事件等）创建更新函数和watcher
class Compile {
  // el是宿主元素或其选择器
  // vm当前Vue实例
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm
    if (this.$el) {
      // 将dom节点转换为Fragment提高执行效率
      this.$fragment = this.node2Fragment(this.$el)
      // 执行编译，编译完成以后所有的依赖已经替换成真正的值
      this.compile(this.$fragment)
      // 将生成的结果追加至宿主元素
      this.$el.appendChild(this.$fragment)
    }
  }

  node2Fragment(el) {
    // 创建一个新的Fragment
    const fragment = document.createDocumentFragment()
    let child
    // 将原生节点移动至fragment
    while ((child = el.firstChild)) {
      // appendChild 是移动操作，移动一个节点，child 就会少一个，最终结束循环
      fragment.appendChild(child)
    }
    return fragment
  }

  // 编译指定片段
  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach((node) => {
      // 判断node类型，做相应处理
      if (this.isElementNode(node)) {
        // 元素节点要识别v-xx或@xx
        this.compileElement(node)
      } else if (
        this.isTextNode(node) &&
        /\{\{(.*)\}\}/.test(node.textContent)
      ) {
        // 文本节点，只关心{{msg}}格式
        this.compileText(node, RegExp.$1) // RegExp.$1匹配{{}}之中的内容
      }
      // 遍历可能存在的子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  compileElement(node) {
    // console.log('编译元素节点');
    // <div v-text="test" @click="onClick"></div>
    const attrs = node.attributes
    Array.from(attrs).forEach((attr) => {
      const attrName = attr.name // 获取属性名 v-text
      const exp = attr.value // 获取属性值 test
      if (this.isDirective(attrName)) {
        // 指令
        const dir = attrName.substr(2) // text
        this[dir] && this[dir](node, this.$vm, exp)
      } else if (this.isEventDirective(attrName)) {
        // 事件
        const dir = attrName.substr(1) // click
        // this.eventHandler(node, this.$vm, exp, dir)
      }
    })
  }

  compileText(node, exp) {
    // console.log('编译文本节点');
    this.text(node, this.$vm, exp)
  }

  isElementNode(node) {
    return node.nodeType == 1 //元素节点
  }

  isTextNode(node) {
    return node.nodeType == 3 //元素节点
  }

  isDirective(attr) {
    return attr.indexOf('v-') == 0
  }

  isEventDirective(dir) {
    return dir.indexOf('@') == 0
  }

  // 文本更新
  text(node, vm, exp) {
    this.update(node, vm, exp, 'text')
  }

  // 处理html
  html(node, vm, exp) {
    this.update(node, vm, exp, 'html')
  }

  // 双向绑定
  model(node, vm, exp) {
    this.update(node, vm, exp, 'model')

    let val = vm.exp
    // 双绑还要处理视图对模型的更新
    node.addEventListener('input', (e) => {
      vm[exp] = e.target.value // 这里相当于执行了 set
    })
  }

  // 更新
  // 能够触发这个 update 方法的时机有两个：1-编译器初始化视图时触发；2-Watcher更新视图时触发
  update(node, vm, exp, dir) {
    let updaterFn = this[dir + 'Updater']
    updaterFn && updaterFn(node, vm[exp]) // 立即执行更新；这里的 vm[exp] 相当于执行了 get
    new Watcher(vm, exp, function (value) {
      // 每次创建 Watcher 实例，都会传入一个回调函数，使函数和 Watcher 实例之间形成一对一的挂钩关系
      // 将来数据发生变化时， Watcher 就能知道它更新的时候要执行哪个函数
      updaterFn && updaterFn(node, value)
    })
  }

  textUpdater(node, value) {
    node.textContent = value
  }

  htmlUpdater(node, value) {
    node.innerHTML = value
  }

  modelUpdater(node, value) {
    node.value = value
  }

  eventHandler(node, vm, exp, dir) {
    let fn = vm.$options.methods && vm.$options.methods[exp]
    if (dir && fn) {
      node.addEventListener(dir, fn.bind(vm), false)
    }
  }
}
