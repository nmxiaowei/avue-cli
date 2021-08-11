<template>
  <basic-container>
    <h4>项目介绍</h4>
    <p style="line-height:30px">
      avue-cli是一款基于avue和element-ui完全开源、
      免费的企业后端产品前端集成解决方案，采用最新的前端技术栈，已经准备好了大部分的项目准备工作，
      你可以快速进行二次开发。
    </p>
  </basic-container>
  <basic-container>
    <el-descriptions title="项目信息"
                     :column="2"
                     border>
      <el-descriptions-item>
        <template #label>
          项目名称
        </template>
        avue-cli
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          版本
        </template>
        3.x
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          代码地址
        </template>
        <a href="https://gitee.com/smallweigit/avue-cli"
           target="_blank">
          <el-tag>https://gitee.com/smallweigit/avue-cli</el-tag>
        </a>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          预览地址
        </template>
        <a href="https://cli.avuejs.com"
           target="_blank">
          <el-tag>https://cli.avuejs.com</el-tag>
        </a>
      </el-descriptions-item>
    </el-descriptions>
  </basic-container>
  <basic-container>
    <el-descriptions title="项目依赖"
                     :column="2"
                     border>
      <el-descriptions-item v-for="(item,index) in list"
                            :key="index">
        <template #label>
          {{item}}
        </template>
        {{dependencies[item]}}
      </el-descriptions-item>
    </el-descriptions>
  </basic-container>
</template>

<script>
let dependencies = {
  "animate.css": "^4.1.1",
  "axios": "^0.21.1",
  "crypto-js": "^4.1.1",
  "dayjs": "^1.10.6",
  "element-plus": "^1.0.2-beta.70",
  "js-cookie": "^3.0.0",
  "mockjs": "^1.1.0",
  "nprogress": "^0.2.0",
  "vite-plugin-mock": "^2.9.4",
  "vue": "^3.0.5",
  "vue-i18n": "^9.1.2",
  "vue-router": "4",
  "vuex": "^4.0.2"
}
export default {
  data () {
    return {
      dependencies: dependencies,
      list: Object.keys(dependencies)
    }
  }
};
</script>

<style lang="scss">
</style>
