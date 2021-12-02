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
  background: rgba(13, 25, 57, 0);
  box-shadow: inset 0px 0px 88px 8px rgba(16, 108, 222, 0.2), inset 0px 0px 12px 2px rgba(0, 114, 255, .8);
  width: 400px;
  min-height: 240px;

  .card-title {
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    color: $text-color;
    font-size: 14px;
    z-index: 2;
    background: rgb(22, 48, 128);

    &::before {
      position: absolute;
      left: 8px;
      top: 0;
      content: '';
      width: 100%;
      height: 100%;
      box-shadow: inset 0px 0px 88px 8px rgba(16, 108, 222, 0.2), inset 0px 0px 12px 2px rgba(0, 114, 255, .8);
      transform: perspective(.8em) rotateX(-5deg);

    }
  }
}

</style>
