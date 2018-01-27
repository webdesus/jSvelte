export const open = function(){
	this.set({opened : true});
}

export const close = function(){
	this.set({opened : false});
}

export const closeAndFocus = function(){
	this.close();
	setTimeout(()=>{
		if(this.get('withFilter')){
			this.refs.js_select_input.focus();	
		}else{
			this.refs.js_select.focus();
		}
	},1);
}
export const toggle = function(){
	if(this.get('opened')){
		closeAndFocus.call(this);	
	}else{
		open.call(this);	
	}
}
export const onSelect = function(val){
	this.set({display: val.select})
	closeAndFocus.call(this);	
}
export const onKeyDown = function(e){
	if(e.keyCode === 27){
		closeAndFocus.call(this);
	}else if(e.keyCode === 40 || e.keyCode === 38) {
		this.open();
		const select_box = this.refs.js_select_list.querySelector('.'+this.selectors.select_box);
		jSvelte.Util.fireKeyboardEvent(select_box,'keydown',e.keyCode);
	}else if(e.keyCode === 13){
		if(this.get('opened')){
			const select_box = this.refs.js_select_list.querySelector('.'+this.selectors.select_box);
			jSvelte.Util.fireKeyboardEvent(select_box,'keydown', 13);
			this.close();
		}else{
			this.open();
		}
	}
}
export const onKeyUp = function(e){
	this.filter(this.refs.js_select_input.value);
}
export const filter = function(search){
	const {items, searchAfter, withFilter} = this.get();
	if(!withFilter){
		return;
	}
	if(search.length >= searchAfter) {
		let result = [];
		for(let i = 0, length = items.length; i < length; i++ ) {
			if(this.getText(items[i]).toLowerCase()
					.indexOf(search.toLowerCase()) > -1) {
				result.push(items[i]);
			}
		}
		this.set({filterItems: result});
	}
	if(!this.get('opened')){
		this.open();
	}
}

export const getKey = function(item) {
	const {key} = this.get();
	if(key) {
		return item[key];
	}
	return item;
};

export const getText = function(item) {
	const {text} = this.get();
	if(text) {
		return item[text];
	}
	return item;
};

export const onFocusFilter = function(){
		this.open();
		jSvelte.Elements.addClassToElement(this.refs.js_select,this.selectors.focus);
}
export const onBlurFilter = function(){
		jSvelte.Elements.removeClassToElement(this.refs.js_select,this.selectors.focus);
		this.close();
}
