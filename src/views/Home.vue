<template>
<div style="height: 40vh">
  <BaseBar />
</div>
</template>

<script>
import {ref,defineComponent} from 'vue'
import BaseBar from '../components/charts/BaseBar.vue'
export default defineComponent({
  name: "Home",
  components:{BaseBar}
})
</script>

<style scoped>

</style>
