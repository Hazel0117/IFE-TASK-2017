

function Vue(obj) {
	this.el = obj.el;
	this.data = obj.data;
	this.dataBinding();
}

Vue.prototype = {
	dataBinding: function() {
		var controlArea = document.querySelector(this.el);
		//利用正则表达式，匹配{{}}
		var pattern = new RegExp(/\{\{[^\}]+\}\}/);

		//获取vue控制的node下所有的子节点
		var nodes = controlArea.childNodes;
		for (let i = 0; i < nodes.length; i++) {

			//若节点为元素节点，且其中有匹配pattern的文本
			if(nodes[i].nodeType === 1) {
				if (pattern.test(nodes[i].innerText)) {
					var content = nodes[i].innerText.match(pattern);
					//去除花括号，获取括号中内容
					var name = content[0].replace('{{','');
					name = name.replace('}}','');
					name = name.trim();

					var data = this.data;
					var value;
					//获取vue的data中，键值对的值
					if (name.indexOf('.')!=-1) {
						var arr = name.split('.');
						value = data[arr[0]];
						for (let i = 1; i < arr.length; i++) {
							value = value[arr[i]];
						}
					} else {
						value = data[name];
					}
					nodes[i].innerText = nodes[i].innerText.replace(pattern,value);
				}
			}
		}
	}
};

let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25
    }
  }
});