<template>
  <div class="home">
      <barChart :xData="xData" :title="title" :yData="yData"></barChart>
  </div>
</template>

<script>
import barChart from './barChart.vue';
import lineChart from './lineChart.vue';
import pieChart from './pieChart.vue';

export default {
  components: {
      barChart,
      lineChart,
      pieChart
  },
  props: {
    chartType:"",
    disable:{
      type:[Boolean],
      default () {
        return false
      }
    }
  },
  data () {
    return {
      xData:[],
      yData:[],
      
      currentView: barChart
    }
  },
  mounted() {
    
  },
  methods: {
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
