export const onKeyDown = function(e){
	if(e.keyCode === 32){
		e.preventDefault();
		e.cancelBubble = true;
		this.toggle.call(this);
	}
}

export const toggle = function(){
	const {checked} = this.get();
	if (!checked){
		this.set({checked:true});
	}else{
		this.set({checked:false});
	}
}

