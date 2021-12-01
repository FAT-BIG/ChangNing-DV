/**
* @description 图表基础容器
* @author: hhq
* @date: 2021/06/17
*/
<template>
  <div class="prana-chart" :id="chartId" :style="{width:width,height:height}"></div>
</template>

<script lang="ts">
import {defineComponent, reactive, nextTick, onMounted, watch, computed} from 'vue'
import * as echarts from 'echarts'
import {resize} from './_utils/resize'
import {uuid} from './_utils/uuid'

export default defineComponent({
  name: "ChartWrapper",
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
     * @example :dataSource = 'data'
     */
    dataSource: {
      type: Object | Array,
      default: () => {
        return {}
      }
    },
    /**
     * @description 是否显示坐标轴
     * @type Boolean
     * @default showAxis = true
     * @example :type = 'false'
     */
    showAxis: {
      type: Boolean,
      default: true
    },
    /**
     * @description 是否显示纵向分割线
     * @type Boolean
     * @default splitLineX = false
     * @example splitLineX
     */
    splitLineX: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否水平显示
     * @type Boolean
     * @default horizontal = false
     * @example horizontal
     */
    horizontal: {
      type: Boolean,
      default: false
    },
    /**
     * @description 图表配置项
     * @type Boolean
     * @default config = {}
     * @example :config = {}
     */
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * @description 是否显示坐标轴
     * @type Boolean
     * @default showAxis = true
     * @example :type = 'false'
     */
    series: {
      type: Array,
      default: () => {
        return []
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
      default: 4
    },
    /**
     * @description X坐标轴两端空隙
     * @type Boolean | Array
     * @default boundaryGap = true
     * @example :boundaryGap="false" | :boundaryGap="['0.5', '0.01']"
     */
    boundaryGap: {
      type: Boolean | Array,
      default: true
    },
    /**
     * @description X坐标轴两端空隙
     * @type Boolean | Array
     * @default boundaryGap = true
     * @example :boundaryGap="false" | :boundaryGap="['0.5', '0.01']"
     */
    substrX: {
      type: Number,
      default: null
    },
  },
  setup(props, ctx) {
    const chartId = computed(() => `chart-${uuid()}`)
    const option = reactive({
      color: props.colors,
      tooltip: props.config.tooltip,
      legend: props.config.legend,
      grid: props.config.grid,
      dataZoom: props.dataZoom,
      dataset: props.dataSource,
      xAxis: [
        {
          show: props.showAxis,
          type: props.horizontal ? 'value' : 'category',
          boundaryGap: props.boundaryGap,
          data: props.dataSource.name,
          axisTick: {
            // show: false,
            alignWithLabel: true
          },
          axisLine: {
            show: props.showAxis,
            lineStyle: {
              color: 'rgba(0,0,0,.1)'
            },
          },
          splitLine: {
            show: props.splitLineX,
            lineStyle:
                {
                  type: 'dashed',
                  // color: 'rgba(0,0,0,0)'
                }
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#333'
            },
            rotate: props.config.rotate,
            formatter: (val) => {
              let text
              props.substrX ? text = val.substring(0, props.substrX) : text = val
              return text
            }
          }
        }
      ],
      yAxis: [
        {
          show: props.showAxis,
          type: props.horizontal ? 'category' : 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.5)'
            }
          },
          splitLine: {
            show: true,
            lineStyle:
                {
                  type: 'dashed',
                  color:
                      'rgba(0,0,0,.05)'
                }
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#333'
            }
          },
          axisTick: {
            show: false,
          }
        }
      ],
      series: props.series
    })
    const chartInit = () => {
      const ele = document.getElementById(chartId.value)
      const resizeDiv = document.getElementById(chartId.value)
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
    watch('dataSource', () => {
          chartInit()
        },
        {
          immediate: true,
          deep: true
        })
    onMounted(() => {
      nextTick(() => {
        chartInit()
      })
    })
    return {
      chartId
    }
  }
})
</script>
