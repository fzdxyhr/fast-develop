<template>
	<div></div>
</template>

<script type="text/javascript">
	export default{
		data() {
			return {
				target:"body",
				text:""
			}
		},
		created(){
			let self = this;

			let rjLoading = function(){
				let subSelf = this;

                subSelf.text = function(text){
                	self.text = text;
                	return subSelf;
                };

                subSelf.target = function(target){
                	self.target = target;
                	return subSelf;
                };

                subSelf.show = function(){
                	subSelf.rj_loading_obj = self.$loading({
	                    target:self.target,
	                    body:true,
	                    fullscreen:true,  
	                    lock:false, 
	                    text:self.text ? self.text : "拼命加载中...",
	                    customClass:""
	                });
	                return subSelf;
                };

                subSelf.close = function(){
                	subSelf.rj_loading_obj.close();
                	return subSelf;
                };
            };

            self.$parent.rjLoading = new rjLoading();
		}
	}
</script>