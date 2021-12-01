<template>
  <div class="home">
    <div style="width: 25%;height: 240px;">
      <card></card>
    </div>

  </div>
</template>

<script>
import {ref, defineComponent} from 'vue'

export default defineComponent({
  name: "Home",

  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("../assets/img/main-bg.jpg") no-repeat center;
  background-size: cover;

  &::before,
  &::after {
    position: absolute;
    top: 64px;
    content: '';
    width: 72px;
    height: calc(100% - 88px);
    background: url("../assets/img/main-boder.svg") no-repeat;
    background-size: cover;
  }

  &::before {
    left: 16px;
  }

  &::after {
    right: 16px;
    transform: scale(-1);
  }
}
</style>
