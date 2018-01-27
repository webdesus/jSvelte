export const addClassToElement= function(el, className) {
	el.className += ' ' + className;
};
export const removeClassToElement= function(el, className) {
	el.className = el.className.replace(className, ' ').trim();
};

export const addManyClassToElement= function(el, classNames) {
	classNames.forEach(name=>{
		el.className += ' ' + name;
	});
};
export const removeManyClassToElement= function(el, classNames) {
	classNames.forEach(name=>{
		el.className = el.className.replace(name, ' ').trim();
	});
};

export const clear_class = function(el, css){
		const selector = '.' + css.join(',.') 
		const items = el.querySelectorAll(selector)
		items.forEach(el=>{
			removeManyClassToElement(el, css);
		});
};

