<template>
  <div class="preview">
      <el-row :gutter="20" v-for="item in row">
          <el-col :span="24 / col" v-for="it in col">
            <component v-bind:is="currentView">
            </component>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      col:1,
      row:1
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
