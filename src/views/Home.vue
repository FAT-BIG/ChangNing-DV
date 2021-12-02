<template>
  <div class="home">
    <GlobalHeader/>
    <div style="width: 25%;height: 240px;">
      <card></card>
    </div>

  </div>
</template>

<script>
import {ref, defineComponent} from 'vue'
import GlobalHeader from '../components/header/Index.vue'

export default defineComponent({
  name: "Home",
  components: {GlobalHeader},
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
  overflow: hidden;

  &::before,
  &::after {
    position: absolute;
    top: 2.4vw;
    content: '';
    width: unit(152);
    height: unit(1280);
    background: url("../assets/img/main-boder.svg") no-repeat;
    background-size: cover;
  }

  &::before {
    left: unit(16);
  }

  &::after {
    right: unit(16);
    transform: scale(-1);
  }
}
</style>
