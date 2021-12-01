<template>
  <test />
  <div style="height: 40vh">
    <base-bar/>
  </div>
<!--  <scroll-list :list="listData" class="ranking-list">-->
<!--    <div>-->
<!--      <template v-for="(item,index) in listData">-->
<!--        <div class="ranking-list-item" v-if="index < 10">-->
<!--          <div class="item-left">-->
<!--            <div class="sn" :class="{'first-class':index < 3}">{{ index + 1 }}</div>-->
<!--            <div class="title">{{ item.name }}</div>-->
<!--          </div>-->
<!--          <div class="value">{{ item.total }}</div>-->
<!--        </div>-->
<!--      </template>-->
<!--    </div>-->
<!--  </scroll-list>-->

</template>

<script>
import {ref, defineComponent} from 'vue'
// import BaseBar from '../components/kits/charts/BaseBar.vue'
// import ScrollList from '../components/kits/ScrollList.vue'

export default defineComponent({
  name: "Home",
  components: {
    // BaseBar,
    // ScrollList
  },
  setup() {
    const listData = ref([
      {
        name: '工专路一号店',
        total: 323234
      },
      {
        name: '工专路二号店',
        total: 320300
      },
      {
        name: '工专路一号店',
        total: 323234
      },
      {
        name: '工专路二号店',
        total: 320300
      },
      {
        name: '工专路一号店',
        total: 323234
      },
      {
        name: '工专路二号店',
        total: 320300
      },
      {
        name: '工专路一号店',
        total: 323234
      },
      {
        name: '工专路二号店',
        total: 320300
      },
      {
        name: '工专路二号店',
        total: 320300
      },
      {
        name: '工专路一号店',
        total: 323234
      },
      {
        name: '工专路二号店',
        total: 320300
      }
    ])
    return {
      listData
    }
  }
})
</script>

<style scoped>

</style>
