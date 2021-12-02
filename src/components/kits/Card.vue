<template>
  <div class="card">
    <div class="card-title" v-if="title">
      {{ title }}
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Card",
  props: {
    title: {
      type: String,
      default: '体系建设'
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  padding: 16px;
  background-color: rgba(13, 25, 57, 0);
  box-shadow: inset 0px 0px 88.35px 6.65px rgba(16, 108, 222, 0.22), inset 0px 0px 11.2px 2.8px rgba(0, 114, 255, 0.8);
  .card-title {
    display: flex;
    align-items: center;
    color: $text-color;
    font-size: 16px;
  }
}

</style>
