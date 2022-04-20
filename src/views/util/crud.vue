<template>
  <basic-container>
    <avue-crud v-bind="bindVal"
               v-on="onEvent"
               v-model:page="page"
               v-model="form">
    </avue-crud>
  </basic-container>
</template>

<script lang="ts">
import crudCommon from '../../mixins/crud'

export default crudCommon({}, {
  name: 'crud/index'
})
</script>

<style lang="scss" scoped>
</style>
