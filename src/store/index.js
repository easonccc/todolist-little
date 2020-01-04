import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: 'aaa',
    // 下一个id
    nextId: 5,
    keyView: 'all'
  },
  mutations: {
    initList(state, list) {
      // 将传过来的数据存储
      state.list = list
    },
    setInputValue(state, val) {
      // 将文本框输入的值存储
      state.inputValue = val
    },
    // 添加列表项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      // 将输入框清空
      state.inputValue = ''
    },
    // 删除列表项
    deleteItem(state, id) {
      // 根据id找到删除那一项的索引
      const index = state.list.findIndex(item => item.id === id)
      console.log(index)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    // 点击复选框修改状态按钮
    changeStatus(state, id) {
      // 找到点击的那一项
      state.list.some(item => {
        if (item.id === id) {
          item.done = !item.done
          return true
        }
      })
    },
    // 点击清除按钮清除已完成事项
    clean(state) {
      //  将没有完成的事项过滤出来 形成的新数组重新赋值给list
      state.list = state.list.filter(item => item.done === false)
    },
    // 修改视图的关键字
    changeViewKey(state, key) {
      state.keyView = key
    }
  },
  actions: {
    async getList(context) {
      const { data: res } = await axios.get('/list.json')
      console.log(res)
      context.commit('initList', res)
    }
  },
  getters: {
    // 统计未完成的任务条数
    unDoneLength(state) {
      // 过滤出未完成的任务 -------> 新数组 新数组的长度就是未完成的任务数
      const newList = state.list.filter(item => item.done === false)
      console.log(newList)
      return newList.length
    },
    infolist(state) {
      if (state.keyView === 'all') {
        return state.list
      }
      if (state.keyView === 'unDone') {
        return state.list.filter(item => item.done === false)
      }
      if (state.keyView === 'done') {
        return state.list.filter(item => item.done === true)
      }
      return state.list
    }
  }
})
