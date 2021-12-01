/**
* @description 基础柱状图
* @author: hhq
* @date: 2021/06/17
*/
<template>
  <div class="chart-container" :id="chartId" :style="{width:width,height:height}"></div>
</template>

<script lang="ts">

import {defineComponent, ref, reactive, computed, nextTick, onMounted} from 'vue'
import * as echarts from "echarts"
import {ChartOption} from '../../../interface'
import {resize} from '../_utils/resize'
import {uuid} from '../_utils/uuid'

export default defineComponent({
  name: "BaseBar",
  components: {},
  props: {
    /**
     * @description 图表宽度
     * @type String
     * @default width = '100%'
     * @example width = '50%' | 400px
     */
    width: {
      type: String,
      default: "100%"
    },
    /**
     * @description 图表高度
     * @type String
     * @default height = '100%'
     * @example height = '50%' | 400px
     */
    height: {
      type: String,
      default: "100%"
    },
    /**
     * @description 图表数据源
     * @type Object
     * @example :dataSource = "data"
     */
    dataSource: {
      type: Object,
      default: () => {
        return {
          names: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [120, 200, 150, 80, 70, 110, 130]
        }
      }
    },
    /**
     * @description 图表颜色
     * @type Array
     * @example :colors = "['#00CE7D', '#F5A623']"
     */
    colors: {
      type: Array,
      default: () => {
        return ['rgba(24,144,255,.85)'] //'#00CE7D', '#F5A623',
      }
    },
    /**
     * @description 柱子最大宽度
     * @type Number
     * @default barMaxWidth = 40
     * @example :barMaxWidth = 32
     */
    barMaxWidth: {
      type: Number,
      default: 40
    },
    dataZoom: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * @description x轴文字换行字数
     * @type Number
     * @default breakLength = 4
     * @example :breakLength = "20"
     */
    breakLength: {
      type: Number,
      default: 40
    },
    /**
     * @description 是否显示label
     * @type Boolean
     * @default showLabel = false
     * @example :showLabel = "true"
     */
    showLabel: {
      type: Boolean,
      default: false
    },
    /**
     * @description label位置 'top' | 'inside'
     * @type Boolean
     * @default labelPosition = 'top'
     * @example labelPosition = "inside"
     */
    labelPosition: {
      type: String,
      default: 'inside'
    }
  },
  emits: ['click'],
  setup(props, ctx) {
    const chartId = uuid('chart-')
    const option = reactive<ChartOption>({
      color: props.colors,
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        textStyle: {
          fontSize: 12
        }
      },
      xAxis: {
        type: 'category',
        data: props.dataSource.names
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: props.dataSource.data,
          barMaxWidth: props.barMaxWidth,
          type: 'bar'
        }
      ]
    })

    const chartInit = () => {
      const ele = document.getElementById(chartId)
      const resizeDiv = document.getElementById(chartId)
      const chart = echarts.init(ele)
      chart.off('click')
      chart.setOption(option, true)
      chart.on('click', (data) => {
        ctx.emit("click", data)
      })
      const listener = () => {
        chart.resize()
      }
      resize.on(resizeDiv, listener)
    }

    onMounted(() => {
      chartInit()
    })

    return {
      chartId
    }
  }
})
</script>
