<template>
  <div :class="className" :style="{height:height,width:width}" style="overflow:visible" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '650px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    },
    xAxis:{
      type:Array
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(data) {
      this.chart.setOption({
        xAxis: {
          data: this.xAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 35,
          bottom: 50,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [20, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        dataZoom: [ {
            start: 70,
            type: 'inside',
        },{
          top:'95%',
          start:80,
        }],
        legend: {
          data: ['num']
        },
        //  visualMap: {
        //     top: 0,
        //     right: 0,
        //     pieces: [{
        //         gt: 0,
        //         lte: 50,
        //         color: '#096'
        //     }, {
        //         gt: 50,
        //         lte: 100,
        //         color: '#ffde33'
        //     }, {
        //         gt: 100,
        //         lte: 150,
        //         color: '#ff9933'
        //     }, {
        //         gt: 150,
        //         lte: 200,
        //         color: '#cc0033'
        //     }, {
        //         gt: 200,
        //         lte: 300,
        //         color: '#660099'
        //     }, {
        //         gt: 300,
        //         color: '#7e0023'
        //     }],
        //     outOfRange: {
        //         color: '#999'
        //     }
        // },
        series: [{
          name: 'num', 
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              },
              //  areaStyle: {
              //   color: '#f3f8ff'
              // }
            }
          },
          smooth: true,
          type: 'line',
          data: data,
          animationDuration: 2800,
          animationEasing: 'linear'
        },
        // {
        //   name: 'actual',
        //   smooth: true,
        //   type: 'line',
        //   itemStyle: {
        //     normal: {
        //       color: '#3888fa',
        //       lineStyle: {
        //         color: '#3888fa',
        //         width: 2
        //       },
        //       areaStyle: {
        //         color: '#f3f8ff'
        //       }
        //     }
        //   },
        //   data: actualData,
        //   animationDuration: 2800,
        //   animationEasing: 'quadraticOut'
        // }
        ]
      })
    }
  }
}
</script>
