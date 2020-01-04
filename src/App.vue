<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="$store.state.inputValue"
      @change="handleInputChange"
    />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="$store.getters.infolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="changeStatus(item.id)">{{
          item.info
        }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItem(item.id)">删除</a>
      </a-list-item>
      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ $store.getters.unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="$store.state.keyView === 'all' ? 'primary' : 'default'"
            @click="tabChange('all')"
            >全部</a-button
          >
          <a-button
            :type="$store.state.keyView === 'unDone' ? 'primary' : 'default'"
            @click="tabChange('unDone')"
            >未完成</a-button
          >
          <a-button
            :type="$store.state.keyView === 'done' ? 'primary' : 'default'"
            @click="tabChange('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getList");
  },
  methods: {
    // 监听框事件变化
    handleInputChange(e) {
      // 得到文本框最新的值
      console.log(e.target.value);
      // 将文本框最新的值赋值
      this.$store.commit("setInputValue", e.target.value);
    },
    // 点击添加事项按钮将input中的值存储到列表
    addItem() {
      // 非空操作
      if (this.$store.state.inputValue.trim().length <= 0) {
        return this.$message.warning("文本框内容不能为空！");
      }
      this.$store.commit("addItem", this);
    },
    // 点击删除按钮删除事项
    deleteItem(id) {
      this.$store.commit("deleteItem", id);
    },
    // 复选框改变状态
    changeStatus(id) {
      this.$store.commit("changeStatus", id);
    },
    // 点击清除按钮清除已完成事项
    clean() {
      this.$store.commit("clean");
    },
    // 定义选中状态切换
    tabChange(v) {
      // 将获取到的状态传递给公共处理事件
      this.$store.commit("changeViewKey", v);
    }
  }
};
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
