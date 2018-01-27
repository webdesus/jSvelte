export const onSelectItem = function(e) {
	const ind = parseInt(e.target.getAttribute('ind'));
	const {multiple, items} = this.get();
	let {select} = this.get();
	let cur_item = items[ind];

	const addManyClassToElement = jSvelte.Elements.addManyClassToElement;
	const clear_class = jSvelte.Elements.clear_class;

	this.cursorPos = ind;
	
	if(multiple) {
		if(!Array.isArray(select)) {
			select = [];
		}
		let itemIndex = select.findIndex((el) => getKey.call(this, el) === getKey.call(this,cur_item));
		clear_class(this.refs.js_listbox,[this.selectors.cursor]);
		if(itemIndex > -1) {
			const addClassToElement = jSvelte.Elements.addClassToElement;
			const removeClassToElement = jSvelte.Elements.removeClassToElement;
			
			removeClassToElement(e.target, this.selectors.selected);
			select.splice(itemIndex, 1);
			this.set({select: select});
			addClassToElement(e.target, this.selectors.cursor);
			return;			
		}else{
			select.push(cur_item);
		}
	}else{
		select = cur_item;
		clear_class(this.refs.js_listbox,
			[this.selectors.cursor, this.selectors.selected]);
	}
	this.set({select: select});
	this.fire('select', {select});
	addManyClassToElement(e.target,[this.selectors.selected, this.selectors.cursor]);
};

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

export const getItems = function(){
	return this.refs.js_listbox.querySelectorAll('.'+this.selectors.list_item);
}
export const onKeyDown = function(e){
	let items = getItems.call(this);
	if(items.length < 1) {
		return;
	}
	if(e.keyCode === 40 || e.keyCode === 38) {
		e.preventDefault();
		e.cancelBubble = true;
		moveCursor.call(this, e.keyCode === 40 ? 'down': 'up', items);
	}else if(e.keyCode === 13){
		e.preventDefault();
		e.cancelBubble = true;
		if(this.cursorPos > -1 && this.cursorPos< items.length){
			this.onSelectItem({target: items[this.cursorPos]});
		}
	}
}	

export const moveCursor = function(action, items){
	const removeClassToElement = jSvelte.Elements.removeClassToElement;
	const addClassToElement = jSvelte.Elements.addClassToElement;
	
	if(!items) {
		items = getItems().call(this);
	}
	let item;
	const multiple = this.get();
	switch(action) {
		case 'up': {
			if(this.cursorPos > 0) {
				item = items[this.cursorPos];
				removeClassToElement(item, this.selectors.cursor);
				if(!multiple) {
					removeClassToElement(item, this.selectors.selected);
				}
				this.cursorPos--;
				if(this.cursorPos > -1) {
					item = items[this.cursorPos];
					addClassToElement(item, this.selectors.cursor);
				}
			}
			break;
		}
		case 'down': {
			let length = items.length;
			if(this.cursorPos < length - 1) {
				if(this.cursorPos > -1) {
					item = items[this.cursorPos];
					removeClassToElement(item, this.selectors.cursor);
					if(!multiple) {
						removeClassToElement(item, this.selectors.selected);
					}
				}
				this.cursorPos++;
				if(this.cursorPos < length) {
					item = items[this.cursorPos];
					addClassToElement(item, this.selectors.cursor);
				}
			}
			break;
		}
		default: {
			throw new Error('unknown move');
		}
	}
}
		

