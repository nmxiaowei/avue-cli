import Main from './index.vue';
import Vue from 'vue'
import { isVNode } from './util';
let instance;
let instances = [];
let seed = 1;
const Mode = (function () {
  let MessageConstructor = Vue.extend(Main);
  const obj = function (item = {}, opts = {}) {
    let id = 'Mode_' + seed++;
    let options = Object.assign({
      app: item
    }, opts)
    let userOnClose = options.onClose;
    options.onClose = function () {
      obj.close(id, userOnClose);
    };
    instance = new MessageConstructor({
      data: options
    });
    Object.keys(options).forEach(ele => {
      instance[ele] = options[ele]
    })
    instance.id = id;
    if (isVNode(instance.message)) {
      instance.$slots.default = [instance.message];
      instance.message = null;
    }
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.isShow = true;
    instance.dom = instance.vm.$el;
    instances.push(instance);
    return instance.vm;
  }
  obj.close = function (id, userOnClose) {
    for (let i = 0, len = instances.length; i < len; i++) {
      if (id === instances[i].id) {
        if (typeof userOnClose === 'function') {
          userOnClose(instances[i]);
        }
        instances.splice(i, 1);
        document.getElementById(id).remove()
        break;
      }
    }
  };
  return obj
})()

export default Mode;
export const $Mode = Mode