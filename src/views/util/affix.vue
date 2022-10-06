<template>
  <basic-container>
    <div id="affix"
         style="height:500px;overflow:scroll">
      <div>
        <avue-affix :offset-top="100"
                    target="#affix">
          <el-button type="primary">固定在最顶部</el-button>
        </avue-affix>
      </div>
      <br />
      <div>
        <avue-affix :offset-top="150"
                    target="#affix">
          <el-button type="primary">固定在距离顶部 50px 的位置</el-button>
        </avue-affix>
      </div>
      <br />
      <div>
        <avue-affix :offset-top="200"
                    target="#affix">
          <el-button type="primary">固定在距离顶部 100px 的位置</el-button>
        </avue-affix>
      </div>
      <br />
      <div>
        <avue-affix :offset-top="250"
                    target="#affix">
          <el-button type="primary">固定在距离顶部 150px 的位置</el-button>
        </avue-affix>
      </div>
      <div style="height:1000px"></div>
    </div>
  </basic-container>
</template>

<script>
export default {};
</script>

<style lang="scss">
.affix {
  position: relative;
  &-line {
    height: 100px;
  }
}
</style>
