<template>
  <div>
    {{ displayValue }}
  </div>
</template>

<script lang="ts">
import {requestAnimationFrame, cancelAnimationFrame} from './_utils/requestAnimationFrame'
import {defineComponent, ref, computed, watch, onMounted, onUnmounted} from 'vue'

export default defineComponent({
  name: "ScrollNum",
  props: {
    startVal: {
      type: Number,
      required: false,
      default: 0
    },
    end: {
      type: Number,
      required: false,
      default: 2021
    },
    duration: {
      type: Number,
      required: false,
      default: 1000
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true
    },
    decimals: {
      type: Number,
      required: false,
      default: 0,
      validator(value) {
        return value >= 0
      }
    },
    decimal: {
      type: String,
      required: false,
      default: '.'
    },
    separator: {
      type: String,
      required: false,
      default: ''
    },
    prefix: {
      type: String,
      required: false,
      default: ''
    },
    suffix: {
      type: String,
      required: false,
      default: ''
    },
    useEasing: {
      type: Boolean,
      required: false,
      default: true
    },
    easingFn: {
      type: Function,
      default(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
      }
    }
  },
  setup(props, ctx) {
    const formatNumber = (num: number) => {
      // num = num.toFixed(props.decimals)
      num += ''
      const x = num.split('.')
      let x1 = x[0]
      const x2 = x.length > 1 ? props.decimal + x[1] : ''
      const rgx = /(\d+)(\d{3})/
      if (props.separator && !isNumber(props.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + props.separator + '$2')
        }
      }
      return props.prefix + x1 + x2 + props.suffix
    }

    const printVal = ref(0)
    const paused = ref(false)
    const startTime = ref(null)
    const timestamp = ref(null)
    const remaining = ref(null)
    const rAF = ref(null)
    const displayValue = ref(
        formatNumber(props.startVal)
    )
    const localStartVal = computed({
      get(){
        return props.startVal
      },
      set() {
        return props.startVal
      }
    })
    const localDuration = computed(() => props.duration)
    const countDown = computed(() => props.startVal > props.end)
    const start = () => {
      localStartVal.value = props.startVal
      startTime.value = null
      localDuration.value = props.duration
      paused.value = false
      rAF.value = requestAnimationFrame(count)
    }
    const pause = () => {
      cancelAnimationFrame(rAF.value)
    }
    const resume = () => {
      startTime.value = null
      localDuration.value = +remaining.value
      localStartVal.value = +printVal.value
      requestAnimationFrame(count)
    }
    const pauseResume = () => {
      if (paused.value) {
        resume()
        paused.value = false
      } else {
        pause()
        paused.value = true
      }
    }
    const reset = () => {
      startTime.value = null
      cancelAnimationFrame(rAF.value)
      displayValue.value = formatNumber(props.startVal)
    }
    const count = (ts) => {
      if (!startTime.value) startTime.value = ts
      timestamp.value = ts
      const progress = ts - startTime.value
      remaining.value = localDuration.value - progress
      if (props.useEasing) {
        if (countDown) {
          printVal.value = localStartVal - props.easingFn(progress, 0, localStartVal.value - props.end, localDuration.value)
        } else {
          printVal.value = props.easingFn(progress, localStartVal.value, props.end - localStartVal.value, localDuration.value)
        }
      } else {
        if (countDown) {
          printVal.value = localStartVal.value - ((localStartVal.value - props.end) * (progress / localDuration.value))
        } else {
          printVal.value = localStartVal.value + (props.end - localStartVal.value) * (progress / localDuration.value)
        }
      }
      if (countDown) {
        printVal.value = printVal.value < props.end ? props.end : printVal.value
      } else {
        printVal.value = printVal.value > props.end ? props.end : printVal.value
      }
      displayValue.value = formatNumber(printVal)
      if (progress < localDuration) {
        rAF.value = requestAnimationFrame(count)
      } else {
        ctx.emit('callback')
      }
    }
    const isNumber = (val: any) => {
      return !isNaN(parseFloat(val))
    }
    watch(() => props.startVal, () => {
      props.autoplay && start()
    })
    watch(() => props.end, () => {
      props.autoplay && start()
    })
    onMounted(() => {
      props.autoplay && start()
      ctx.emit('mountedCallback')
    })
    onUnmounted(() => {
      cancelAnimationFrame(rAF)
    })
    return {
      displayValue
    }
  }
})
</script>
