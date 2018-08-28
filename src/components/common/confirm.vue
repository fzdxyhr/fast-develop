<template>
	<div>
		<el-dialog
			append-to-body
			:title="title"
            :visible.sync="isShow"
			:show-close="showClose"
            :modal="modal"
            :close-on-click-modal="closeOnClickModal"
            :custom-class="theme"
			:before-close="handleClose"
			size="alert">
	        <div class="el-dialog__content alert">
                <img :src="icon"/>
                <div v-html="content" id="dialog__content_alert" class=" content mainContent"></div>
            </div>
	        <div class="el-dialog__footer">
	        	<div class="dialog-footer">
                    <el-button v-if="defaultAction" @click="doCancelDel">{{cancelButtonText}}</el-button>
                    <el-button v-if="!defaultAction" type="primary" @click="doCancelDel">{{cancelButtonText}}</el-button>
                    <el-button v-if="defaultAction" type="primary" @click="doSure">{{confirmButtonText}}</el-button>
                    <el-button v-if="!defaultAction" @click="doSure">{{confirmButtonText}}</el-button>
                </div>
	        </div>
	    </el-dialog>
    </div>
</template>

<script type="text/javascript">
	export default{
		props:["id"],
		data() {
			return {
				title:"提示信息!",
                content:"文本信息!",
                icon:"/static/img/confirm.png",
				isShow:false,
				modal: true,
				showClose:true,
				closeOnClickModal:true,
                defaultAction:true,
                confirmButtonText:"确 定",
                cancelButtonText:"取 消"
			}
		},
		created(){
			let self = this;
			let rjConfirm = function(){
				let subSelf = this;

                subSelf.icon = function(icon){
                	self.icon = icon ? icon : "succ.png";
                    self.icon = "/static/img/" + self.icon;
                	return subSelf;
                };

                subSelf.title = function(title){
                	self.title = title ? title : "提示信息!";
                	return subSelf;
                };

                subSelf.modal = function(modal) {
                	self.modal = modal;
                	return subSelf;
                }

                subSelf.content = function(content){
                	self.content = content ? content : "文本信息!";
                	return subSelf;
                };

                subSelf.confirmButtonText = function (confirmButtonText) {
                    self.confirmButtonText = confirmButtonText ? confirmButtonText : "确 定";
                    return subSelf;
                };

                subSelf.cancelButtonText = function (cancelButtonText) {
                    self.cancelButtonText = cancelButtonText ? cancelButtonText : "取 消";
                    return subSelf;
                }

                subSelf.show = function(){
                	self.isShow = true;
                	return subSelf;
                };

                subSelf.showClose = function(flag){
                    self.showClose = flag;
                    return subSelf;
                };

                subSelf.closeOnClickModal = function(flag){
                    self.closeOnClickModal = flag;
                    return subSelf;
                };

                subSelf.close = function(){
                	self.isShow = false;
                	return subSelf;
                };

                subSelf.then = function(callFun){
	            	this.rjConfirmCallFun = callFun;
	            	return subSelf;
	            };

                subSelf.defaultAction = function(flag) {
                    self.defaultAction = flag;
                    return subSelf;
                }

                return this;
            };

            self.$parent.rjConfirm = new rjConfirm();
		},
		updated: function(){
			this.checkIsMgTop();
		},
		methods:{
			checkIsMgTop: function() {
				let alertObj = document.getElementById("dialog__content_alert");
				let offsetHeight = alertObj.offsetHeight;
				if(offsetHeight > 30) {
					alertObj.style.marginTop = 0 + "px";
				}
			},
			doCancelDel(){
				let self = this;
				self.$parent.rjConfirm.close();
				if(self.$parent.rjConfirm.rjConfirmCallFun){
					self.$parent.rjConfirm.rjConfirmCallFun(false);
				}
			},
			doSure(){
				let self = this;
				self.$parent.rjConfirm.close();
				if(self.$parent.rjConfirm.rjConfirmCallFun){
					self.$parent.rjConfirm.rjConfirmCallFun(true);
				}
			},
			handleClose(done) {
				let self = this;
				self.$parent.rjConfirm.close();
				if(self.$parent.rjConfirm.rjConfirmCallFun){
					self.$parent.rjConfirm.rjConfirmCallFun(false);
				}
			}
		},
		computed: {
            theme() {
              return "customer-" + this.$store.state.theme;
            }
        }
	}
</script>
