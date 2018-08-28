<template>
  <div class="report-create">
      <rj-dialog-contant>
      <div slot="content">
          <el-steps :active="stepActive" finish-status="success" align-center>
              <el-step title="基本信息">
                
              </el-step>
              <el-step v-for="item in echartNum">
                <span slot="title">图表{{item}}</span>
              </el-step>
          </el-steps>
          <div v-show="stepActive == 0" class="basic-info">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="报表编号">
                <el-input v-model="form.id"></el-input>
              </el-form-item>
              <el-form-item label="报表名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="报表分类">
                <el-select v-model="form.reportType" placeholder="请选择报表分类">
                  <el-option label="销售类" value="1"></el-option>
                  <el-option label="报表类" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="报表布局">
                <label>行&nbsp;&nbsp;</label><el-select v-model="form.row" placeholder="请选择行数" @change="rowChange">
                  <el-option v-for="item in 6" :label="item" :value="item"></el-option>
                </el-select>
                <label>&nbsp;&nbsp;列&nbsp;&nbsp;</label><el-select v-model="form.col" placeholder="请选择列数" @change="colChange">
                   <el-option v-for="item in 3" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="报表描述">
                <el-input type="textarea" :rows="5" v-model="form.desc"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="report" v-show="stepActive == (index + 1)"  v-for="(item,index) in echartObj">
            <el-form label-width="180px">
              <el-form-item label="图表标题">
                <el-input v-model="item.title"></el-input>
              </el-form-item>
              <el-form-item label="图表类型">
                <el-select v-model="item.echart_type" placeholder="请选择图表">
                  <el-option v-for="item in echartTypes" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="图表是否展示多个数据">
                <el-radio-group v-model="item.is_multi_data">
                  <el-radio-button label="否"></el-radio-button>
                  <el-radio-button label="是"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="X轴数据源" v-show="item.is_multi_data == '是'">
                <div>
                  <label>是否查询数据库</label>
                  <el-radio v-model="item.x_is_sql" label="0">否</el-radio>
                  <el-radio v-model="item.x_is_sql" label="1">是</el-radio>
                </div>
                <el-input type="textarea" :rows="3" v-model="item.x_data_config"></el-input>
              </el-form-item>
              <el-form-item label="Y轴数据源" v-show="item.is_multi_data == '是'">
                <div v-for="(it,inde) in item.y_data_config" :class="inde > 0 ? 'multi-data':'multi-data-first'">
                  <div>
                    <label>是否查询数据库</label>
                    <el-radio v-model="it.y_is_sql" label="0">否</el-radio>
                    <el-radio v-model="it.y_is_sql" label="1">是</el-radio>
                  </div>
                  <div class="legend">
                    <label>说明(图表中的legend)</label>
                    <el-input v-model="it.legend"></el-input>
                  </div>
                 
                  <el-input type="textarea"  v-model="it.data_config" style="margin-top:10px;"></el-input>
                </div>
                <div style="font-size:18px;">
                  <i style="cursor: pointer;" class="el-icon-minus" v-show="item.y_data_config.length > 1" @click="deleteYData(index,inde)"></i>
                  <i style="cursor: pointer;" class="el-icon-plus" @click="addYData(index)"></i>
                  
                </div>
              </el-form-item>
              <el-form-item label="图表数据源" v-show="item.is_multi_data == '否'">
                <el-input type="textarea" :rows="6" v-model="item.data_config"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="finish-info" v-show="stepActive == (echartNum+1)">
            <div>图表配置已全部结束，点击完成按钮</div>
          </div>
      </div>
        <div slot="footer-opt">
          <el-button :type="stepActive > 0?'primary':''" id="save-btn" :disabled="stepActive == 0" @click="preStep">上一步</el-button>
          <el-button type="primary" :disabled="stepActive == echartNum" id="save-btn2" @click="nextStep">下一步</el-button>
          <el-button type="primary" id="save-btn3">完成</el-button>
      </div>
    </rj-dialog-contant>
  </div>
</template>

<script type="text/javascript">
import rjDialogContant from '@/components/common/dialogContant.vue'

export default {
  components:{
      rjDialogContant
  },
  data () {
    return {
      notWarn:false,
      deviceNum:0,
      stepActive:0,
      echartNum:1,
      isMultiData:"否",
      echartObj:[
        {
          "title":"",
          "echart_type":"",
          "is_multi_data":"否",
          "x_data_config":"",
          "x_is_sql":"0",
          "y_data_config":[
            {
              "legend":"",
              "y_is_sql":"0",
              "data_config":""
            }
          ],
          "data_config":""
        }
      ],
      echartTypes:[
        {
          "label":"柱形图",
          "value":"bar"
        },
        {
          "label":"折线图",
          "value":"line"
        },
        {
          "label":"饼图",
          "value":"pie"
        }
      ],
      form:{
        id:"",
        name:"",
        reportType:"1",
        row:1,
        col:1,
        desc:""
      }
    }
  },
  mounted() {
      let self = this;
      self.deviceNum = self.rjDialogParams().deviceNum;
  },
  methods: {
      selectChange(){

      },
      colChange(val){
        let self = this;
        self.echartNum = self.form.row * self.form.col;
        for(let i = 0;i < self.echartNum;i++){
          self.echartObj.push({
            "title":"",
            "echart_type":"",
            "is_multi_data":"否",
            "x_data_config":"",
            "x_is_sql":"0",
            "y_data_config":[
              {
                "legend":"",
                "y_is_sql":"0",
                "data_config":""
              }
            ],
            "data_config":""
          });
        }
      },
      rowChange(val){
        let self = this;
        self.echartNum = self.form.row * self.form.col;
        for(let i = 0;i < self.echartNum;i++){
          self.echartObj.push({
              "title":"",
              "echart_type":"",
              "is_multi_data":"否",
              "x_data_config":"",
              "x_is_sql":"0",
              "y_data_config":[
                {
                  "legend":"",
                  "y_is_sql":"0",
                  "data_config":""
                }
              ],
              "data_config":""
          });
        }
      },
      nextStep(){
        let self = this;
        self.stepActive = self.stepActive+1;
      },
      preStep(){
        let self = this;
        if(self.stepActive >0) {
          self.stepActive = self.stepActive-1;
        }
      },
      addYData(index){
        let self = this;
        self.echartObj[index].y_data_config.push({"legend":"","y_is_sql":"0","data_config":""});
      },
      deleteYData(index,inde){
        let self = this;
        self.echartObj[index].y_data_config.splice(inde, 1);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .basic-info {
    margin-top: 20px;
  }
  .report {
    margin-top: 20px;
  }
  .finish-info {
    margin-top: 10%;
    margin-bottom: 10%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .multi-data {
    margin-top: 15px;
    border: 1px #d8d4d4 dashed;
    padding: 10px;
  }
  .multi-data-first {
    margin-top: 35px;
    border: 1px #d8d4d4 dashed;
    padding: 10px;
  }
  .el-input {
    width: 95%;
  }
  .el-textarea {
    width: 95%;
  }
  .legend .el-input {
    width: 50%;
  }
</style>
