<template>
	<div class="page">
	    <el-pagination
	        @size-change="handleSizeChange"
	        @current-change="handleCurrentChange"
	        :current-page="page"
	        :page-sizes="[10, 15, 20, 50, 100, 500]"
	        :page-size="pageSize"
	        layout="total, sizes, prev, pager, next, jumper"
	        :total="total">
	    </el-pagination>
	</div>
</template>

<script type="text/javascript">
	export default {
		//hadingOnNumParent 挂在哪个父层，id唯一标识每个分页对象
		props:["id", "hadingOnNumParent", "pageInit", "pageSizeInit"],
		data() {
			return {
				page:1,
				pageSize:10,
                total:0,
                isLoading: false
			}
		},
		created(){
			let self = this;
			let rjPage = function(page, pageSize){
				self.page = page ? page : page;
				self.pageSize = pageSize ? pageSize : pageSize;

				let subSelf = this;

				subSelf.page = function(page){
					if(page) self.page = page;
					return self.page;
				};

				subSelf.pageSize = function(pageSize){
					if(pageSize) self.pageSize = pageSize;
					return self.pageSize;
				};

				subSelf.total = function(total){
					self.total = total;
					self.isLoading = false;
					return subSelf;
				};

				subSelf.handleSizeChange = function(callFun){
					subSelf.rjHandleSizeChange = callFun;
					return subSelf;
				};
				
				subSelf.handleCurrentChange = function(callFun){
					subSelf.rjHandleCurrentChange = callFun;
					return subSelf;
				}
				return subSelf;
			};
			let parent = self.$parent;
			if(self.hadingOnNumParent) {
				for(let i=0; i<self.hadingOnNumParent - 1; i++) {
					parent = parent.$parent;
				}
			}
			let rjPageObj = new rjPage(self.pageInit, self.pageSizeInit);
			if(self.id) {
				if(!parent.rjPage) parent.rjPage = {};
				parent.rjPage[self.id] = rjPageObj;
			}else{
				parent.rjPage = rjPageObj;
			}
		},
		methods:{
			handleSizeChange(val){
				let self = this;
				if(self.isLoading) return;
				self.isLoading = true;
				let parent = self.$parent;
				if(self.hadingOnNumParent) {
					for(let i=0; i<self.hadingOnNumParent - 1; i++) {
						parent = parent.$parent;
					}
				}
				let rjPage = parent.rjPage;
				if(self.id) rjPage = parent.rjPage[self.id];
				if(rjPage.rjHandleSizeChange){
					self.pageSize = val;
					self.page = 1;
					rjPage.rjHandleSizeChange(val);
				}
			},
			handleCurrentChange(val){
				let self = this;
				if(self.isLoading) return;
				self.isLoading = true;
				let parent = self.$parent;
				if(self.hadingOnNumParent) {
					for(let i=0; i<self.hadingOnNumParent - 1; i++) {
						parent = parent.$parent;
					}
				}
				let rjPage = parent.rjPage;
				if(self.id) rjPage = parent.rjPage[self.id];
				if(rjPage.rjHandleCurrentChange){
					self.page = val;
					rjPage.rjHandleCurrentChange(val);
				}
			}
		}
	}
</script>