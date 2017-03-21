function Vue(obj) {
	this.el = obj.el;
	this.data = obj.data;
	//存放已经在Dom中已经改变的键值对
	this.replaceText = [];
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
					var replaceData;
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
					//将已经替换的值，存入replaceText，以便更改值时，找到需要替换值得位置
					var changedData = {};
					changedData[name] = value;
					this.replaceText.push(changedData);
					nodes[i].innerText = nodes[i].innerText.replace(pattern,value);
				}
			}
		}
		return this;
	},

	changeData: function() {
		var controlArea = document.querySelector(this.el);
		var nodes = controlArea.childNodes;
		var replaceText = this.replaceText;
		if (replaceText.length > 0) {
			for (let i = 0; i < replaceText.length; i++) {

				for (let item in replaceText[i]) {

					var pattern = replaceText[i][item];

					for (let i = 0; i < nodes.length; i++) {
						if (nodes[i].innerText&&nodes[i].innerText.indexOf(pattern)!=-1) {
							var value;
							if (item.indexOf('.')!=-1) {
								var arr = item.split('.');
								value = this.data[arr[arr.length-1]];
							
							} else {
								value = this.data[item];
							}
							replaceText[item] = value;
							nodes[i].innerText = nodes[i].innerText.replace(pattern,value);
						}
					}

				}
			}
		}
	}

};


//观察者构造函数
function Observer(data) {
    this.data = data;

    this.path = Array.prototype.slice.call(arguments,1)[0] || 'data';
    //将一个vue绑定到Observr的原型链上
    if (this.path == 'data') {
    	Observer.prototype.vue = new Vue({el:'#app', data:data});
    };
    this.init();
}


Observer.prototype = {
	
	handlers:{},
    init: function() {
        for (let key in this.data) {
            var val = this.data[key];
            if (typeof val === 'object') {
                //当对象的属性仍为对象时，利用深度遍历
                 new Observer(val,this.path + '.' + key);
            }
            this.convert(val,key,this.path + '.' + key);
        }

    },
    convert: function(val,key,path){
    		 var _self = this;

                
            Object.defineProperty(_self.data, key, {
            configurable: true,
            enumerable: true,

            set: function(newVal) {
                
                console.log('您设置了' + key + ',新的值为' + JSON.stringify(newVal));
                //输出时，利用JSON将newVal转为字符串，使当newVal为对象时能够在控制台显示
                _self.emit(path, newVal);

                //当将原有属性改为对象时，将新增对象的属性也加上getter与setter
                if (typeof newVal === 'object') {
                    new Observer(val,path);
                } 
                val = newVal;
                _self.vue.data = _self.data;
                _self.vue.changeData();          
            },
            
            get: function() {
                console.log('您访问了' + key);
                return val;

            }
        });
    },

    $watch: function(key,callback) {
        this.on(key,callback);
    },

    on: function(eventType,handler) {

        if (!this.handlers[eventType]) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
    },

    emit: function(eventType) {
        var paths = eventType.split('.');
        if (paths.length > 1) {
        for (let i = 1; i < paths.length; i++) {
            this.emit(paths[i]);
        	}
    	}
       var handlerArgs = Array.prototype.slice.call(arguments, 1);
    	if (this.handlers[eventType]) {
	      	for (let i = 0; i < this.handlers[eventType].length; i++) {
	        	this.handlers[eventType][i].apply(this, handlerArgs);
	      	}
    	}


	}
};




let app1 = new Observer({
    user: {
    	name: 'youndwind',
    	age: 25
	},
	school: 'bupt',
	major: 'computer'
});


app1.$watch('name',function(name) {
    console.log('我的名字变了，可能是firstname，也可能是lastname');
});
app1.data.user.name = 'lalala';
app1.data.user.age = 30;














