<template>
  <div class="report-index">
      <div class="top">
        <div class="left">
          <el-button type="primary" icon="el-icon-plus" style="padding: 10px 20px;" @click="go2CreateReport">创建报表</el-button>
        </div>
        <div class="right">
            <el-input maxlength="100" placeholder="请输入IP地址或设备名称" v-model="key" size="medium">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
      </div>
      <div class="content" >
          <el-table
              :data="tableData"
              style="width: 100%;padding-top:10px;">
              <el-table-column
                prop="date"
                label="报表名称">
              </el-table-column>
              <el-table-column
                prop="name"
                label="功能说明">
              </el-table-column>
              <el-table-column
                prop="address"
                label="图表布局">
              </el-table-column>
              <el-table-column
                prop="address"
                label="图表类型">
              </el-table-column>
              <el-table-column
                label="操作">
                <template  scope="scope">
                  <el-button style="padding: 0px;" type="text" @click="go2Update(scope.row)">修改</el-button>
                  <el-button style="padding: 0px;" type="text" @click="go2Del(scope.row)">删除</el-button>
                  <el-button style="padding: 0px;" type="text" @click="go2Generate(scope.row)">生成代码</el-button>
                  <el-button style="padding: 0px;" type="text" @click="go2Preview(scope.row)">预览</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page">
              <rjPage :pageInit="1" :pageSizeInit="10"></rjPage>
            </div>
            
      </div>
      <rjDialog></rjDialog>
  </div>
</template>

<script type="text/javascript">
import rjPage from '@/components/common/page.vue'
import rjDialog from '@/components/common/dialog.vue'
import reportCreate from '@/components/report/reportCreate.vue'


export default {
  components:{
      rjDialog,
      rjPage,
      reportCreate
  },
  data () {
    return {
      key:"",
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      let self = this;
      self.rjPage.
          handleSizeChange(function(val){
              self.findReports();
          }).
          handleCurrentChange(function(val){
              self.findReports();
          });
    },
    findReports(){

    },
    go2CreateReport(){
      let self = this;
      self.rjDialog.
          title("新增报表").
          width("1000px").
          top().
          currentView(reportCreate, {deviceNum:5}).
          closeOnClickModal(false).
          showClose(true).
          sizeSelf('report-create').
          then(function(opt){
            
          }).
          show();
    },
    go2Update(row){

    },
    go2Del(row){

    },
    go2Generate(row){

    },
    go2Preview(row){

    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  
  .top {
    clear: both;
  }
  .page {
    float: right;
    margin-top: 5px;
  }
</style>
<style>
  .el-table th, .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div {
      background: rgba(241, 241, 241, 1) !important;
  }

 .el-table th, .el-table__footer-wrapper thead, .el-table__header-wrapper thead {
      border-bottom: solid 1px rgb(215, 215, 215) !important;
      border-right: solid 1px rgb(215, 215, 215) !important;
  }
  .el-dialog__header {
  padding: 10px 10px 10px!important;
}

.el-dialog__headerbtn {
  top: 5px!important;
    right: 10px!important;
    font-size: 21px!important;
}
</style>
