<template>
  <div ref="scrollRef">
    <div ref="realBoxRef" :style="realBoxStyle" @mouseenter="enter" @mouseleave="leave">
      <div ref="slotListRef" :style="floatStyle">
        <slot></slot>
      </div>
      <div v-if="slotHtml && isScroll" :style="floatStyle">
        <slot name="html"/>
      </div>
      <div v-else-if="!slotHtml && isScroll" v-html="scrollHtml" :style="floatStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeMount,
  ref,
  reactive,
  nextTick,
  computed,
  watch,
} from "vue";

globalThis.window.cancelAnimationFrame = (function () {
  return (
      globalThis.window.cancelAnimationFrame ||
      globalThis.window.webkitCancelAnimationFrame ||
      globalThis.window.mozCancelAnimationFrame ||
      globalThis.window.oCancelAnimationFrame ||
      globalThis.window.msCancelAnimationFrame ||
      function (id) {
        return globalThis.window.clearTimeout(id);
      }
  );
})();
globalThis.window.requestAnimationFrame = (function () {
  return (
      globalThis.window.requestAnimationFrame ||
      globalThis.window.webkitRequestAnimationFrame ||
      globalThis.window.mozRequestAnimationFrame ||
      globalThis.window.oRequestAnimationFrame ||
      globalThis.window.msRequestAnimationFrame ||
      function (callback) {
        return globalThis.window.setTimeout(callback, 1000 / 60);
      }
  );
})();

function dataWarm(modelValue) {
  if (typeof modelValue !== "boolean" && modelValue.length > 100) {
    console.warn(
        `数据达到了${modelValue.length}条有点多哦~,可能会造成部分老旧浏览器卡顿。`
    );
  }
}

export default defineComponent({
  name: "ScrollList",
  props: {
    // 是否开启自动滚动
    modelValue: {
      type: Boolean,
      default: true,
    },
    // 原始数据列表
    list: {
      type: Array,
      required: true,
    },
    // 步进速度，step 需是单步大小的约数
    step: {
      type: Number,
      default: 1,
    },
    // 开启滚动的数据量
    limitScrollNum: {
      type: Number,
      default: 5,
    },
    // 是否开启鼠标悬停
    hover: {
      type: Boolean,
      default: false,
    },
    // 控制滚动方向
    direction: {
      type: String,
      default: "up",
    },
    // 单步运动停止的高度
    singleHeight: {
      type: Number,
      default: 0,
    },
    // 单步运动停止的宽度
    singleWidth: {
      type: Number,
      default: 0,
    },
    // 单步停止等待时间(默认值 1000ms)
    singleWaitTime: {
      type: Number,
      default: 1000,
    },
    // 是否开启 rem 度量
    isRemUnit: {
      type: Boolean,
      default: false,
    },
    // 开启数据更新监听
    isWatch: {
      type: Boolean,
      default: true,
    },
    // 动画时间
    delay: {
      type: Number,
      default: 0,
    },
    // 动画方式
    ease: {
      type: [String, Object],
      default: "ease-in",
    },
    // 动画循环次数，-1表示一直动画
    count: {
      type: Number,
      default: -1,
    },
  },
  setup(props, {slots, emit}) {
    const scrollRef = ref(null);
    const slotListRef = ref(null);
    const realBoxRef = ref(null);
    const slotHtml = ref(slots.html != undefined);
    const scrollHtml = ref("");
    const _count = ref(0);
    const state = reactive({
      xPos: 0,
      yPos: 0,
      reqFrame: null,
      singleWaitTimeout: null,
      realBoxWidth: 0,
      realBoxHeight: 0,
      isHover: false,
    });
    const realBoxStyle = computed(() => {
      return {
        width: state.realBoxWidth ? `${state.realBoxWidth}px` : "auto",
        transform: `translate(${state.xPos}px,${state.yPos}px)`,
        transition: `all ${typeof props.ease === "string" ? props.ease : "cubic-bezier(" + props.ease.x1 + "," + props.ease.y1 + "," + props.ease.x2 + "," + props.ease.y2 + ")"} ${props.delay}ms`,
        overflow: "hidden",
      };
    });
    const isHorizontal = computed(
        () => props.direction == "left" || props.direction == "right"
    );
    const floatStyle = computed(() => {
      return isHorizontal.value
          ? {float: "left", overflow: "hidden"}
          : {overflow: "hidden"};
    });
    const isScroll = computed(() => props.list.length >= props.limitScrollNum);
    const baseFontSize = computed(() => {
      return props.isRemUnit
          ? parseInt(
              globalThis.window.getComputedStyle(globalThis.document.documentElement, null).fontSize
          )
          : 1;
    });
    const realSingleStopWidth = computed(
        () => props.singleWidth * baseFontSize.value
    );
    const realSingleStopHeight = computed(
        () => props.singleHeight * baseFontSize.value
    );
    const hoverStop = computed(
        () => props.hover && props.modelValue && isScroll.value
    );
    const step = computed(() => {
      let singleStep;
      let _step = props.step;
      if (isHorizontal.value) {
        singleStep = realSingleStopWidth.value;
      } else {
        singleStep = realSingleStopHeight.value;
      }
      if (singleStep > 0 && singleStep % _step > 0) {
        console.error(
            "如果设置了单步滚动,step需是单步大小的约数,否则无法保证单步滚动结束的位置是否准确。~~~~~"
        );
      }
      return _step;
    });

    function cancle() {
      cancelAnimationFrame(state.reqFrame || "");
      state.reqFrame = null;
    }

    function move() {
      cancle();
      if (state.isHover || !isScroll.value || _count.value === props.count) {
        emit("stop", _count.value);
        _count.value = 0;
        return;
      }
      state.reqFrame = requestAnimationFrame(function () {
        const h = state.realBoxHeight / 2;
        const w = state.realBoxWidth / 2;
        let {direction, singleWaitTime} = props;
        if (direction === "up") {
          if (Math.abs(state.yPos) >= h) {
            state.yPos = 0;
            _count.value += 1;
            emit("count", _count.value);
          }
          state.yPos -= step.value;
        } else if (direction === "down") {
          if (state.yPos >= 0) {
            state.yPos = h * -1;
            _count.value += 1;
            emit("count", _count.value);
          }
          state.yPos += step.value;
        } else if (direction === "left") {
          if (Math.abs(state.xPos) >= w) {
            state.xPos = 0;
            _count.value += 1;
            emit("count", _count.value);
          }
          state.xPos -= step.value;
        } else if (direction === "right") {
          if (state.xPos >= 0) {
            state.xPos = w * -1;
            _count.value += 1;
            emit("count", _count.value);
          }
          state.xPos += step.value;
        }
        if (state.singleWaitTimeout) {
          clearTimeout(state.singleWaitTimeout);
        }
        if (!!realSingleStopHeight.value) {
          if (Math.abs(state.yPos) % realSingleStopHeight.value < step.value) {
            state.singleWaitTimeout = setTimeout(() => {
              move();
            }, singleWaitTime);
          } else {
            move();
          }
        } else if (!!realSingleStopWidth.value) {
          if (Math.abs(state.xPos) % realSingleStopWidth.value < step.value) {
            state.singleWaitTimeout = setTimeout(() => {
              move();
            }, singleWaitTime);
          } else {
            move();
          }
        } else {
          move();
        }
      });
    }

    function initMove() {
      nextTick(() => {
        dataWarm(props.list);
        scrollHtml.value = "";
        if (isHorizontal.value) {
          let slotListWidth = slotListRef.value.offsetWidth;
          slotListWidth = slotListWidth * 2 + 1;
          state.realBoxWidth = slotListWidth;
        }
        if (isScroll.value) {
          if (!slotHtml.value) {
            scrollHtml.value = slotListRef.value.innerHTML;
            nextTick(() => {
              state.realBoxHeight = realBoxRef.value.offsetHeight;
              if (props.modelValue) {
                move();
              }
            });
          } else {
            state.realBoxHeight = realBoxRef.value.offsetHeight;
            if (props.modelValue) {
              move();
            }
          }
        } else {
          cancle();
          state.yPos = state.xPos = 0;
        }
      });
    }

    function startMove() {
      state.isHover = false;
      move();
    }

    function stopMove() {
      state.isHover = true;
      if (state.singleWaitTimeout) {
        clearTimeout(state.singleWaitTimeout);
      }
      cancle();
    }

    function enter() {
      if (hoverStop.value) {
        stopMove();
      }
    }

    function leave() {
      if (hoverStop.value) {
        startMove();
      }
    }

    function reset() {
      cancle();
      state.isHover = false;
      initMove();
    }

    watch(
        () => props.list,
        () => {
          if (props.isWatch) {
            reset();
          }
        },
        {
          deep: true,
        }
    );
    watch(
        () => props.modelValue,
        (newValue) => {
          if (newValue) {
            startMove();
          } else {
            stopMove();
          }
        }
    );
    watch(() => props.count, (newValue) => {
      if (newValue !== 0) {
        startMove();
      }
    })
    onBeforeMount(() => {
      cancle();
      clearTimeout(state.singleWaitTimeout);
    });
    onMounted(() => {
      initMove();
    });
    return {
      scrollRef,
      slotListRef,
      realBoxRef,
      realBoxStyle,
      floatStyle,
      isScroll,
      slotHtml,
      scrollHtml,
      enter,
      leave,
    };
  },
});
</script>
