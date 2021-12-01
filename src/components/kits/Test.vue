<template>
  <el-button>button</el-button>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'

export default defineComponent({
  name: "Test",
  setup() {
    const value = ref(0)
    return {
      value
    }
  }
})
</script>

<style scoped>

</style>
