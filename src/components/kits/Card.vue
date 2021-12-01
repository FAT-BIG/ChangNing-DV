<template>
  <div class="card">
    <div class="card-header" v-if="title">
      <div class="card-header-title">
        {{ title }}
      </div>
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
      default: ''
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

  .card-header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    background-image: linear-gradient(90deg, rgba(0, 153, 255, 0) 0%, rgba(0, 153, 255, .2) 50%, rgba(0, 153, 255, 0) 100%);

    .card-header-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $text-color;
      font-size: 16px;
      font-weight: bold;
    }
  }
}

</style>
