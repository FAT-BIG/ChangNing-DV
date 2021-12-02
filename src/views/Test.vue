<template>
  <card />
  <circle-progress :percent="40.25"
                   :show-percent="true"
                   :is-gradient="true"/>
  <base-bar height="320px" :data-source="barData" @click="handleClick"/>
  <base-pie />
  <scroll-list hover :step="0.3" :list="listData" class="scroll-list">
    <div>
      <template v-for="(item,index) in listData">
        <div class="list-item" v-if="index < 10">
          <div class="item-left">
            <div class="sn" :class="{'first-class':index < 3}">{{ index + 1 }}</div>
            <div class="title">{{ item.name }}</div>
          </div>
          <div class="value">{{ item.total }}</div>
        </div>
      </template>
    </div>
  </scroll-list>
</template>

<script lang="ts">
import {ref, defineComponent, reactive} from "vue";

export default defineComponent({
  name: "Test",
  setup() {
    const handleClick = (param: object) => {
      console.log(param.name, param.seriesName, ':', param.data)
    }
    const barData = reactive({
      names: ['2012', '2013', '2014', '2015', '2016'],
      data: [
        {
          name: 'Steppe',
          value: [320, 332, 301, 334, 390]
        },
        {
          name: 'Jerry',
          value: [120, 600, 480, 97, 128]
        },
        {
          name: 'Tom',
          value: [320, 332, 301, 334, 390]
        },
        {
          name: 'Jhon',
          value: [120, 600, 480, 97, 128]
        },

      ]
    })
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
      listData,
      barData,
      handleClick
    }
  }

})
</script>

<style lang="scss" scoped>
.scroll-list {
  width: max-content;
  height: 240px;
  overflow: hidden;
  color: #fff;
  font-size: 14px;

  .list-item {
    display: flex;
    align-items: center;
    margin-top: 8px;

    .item-left {
      display: flex;
      align-items: center;
      .first-class{
        color: $color-red;
      }
    }
  }
}
</style>
