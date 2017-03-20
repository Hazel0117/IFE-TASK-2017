

//观察者构造函数
function Observer(data) {
    this.data = data;
    this.path = Array.prototype.slice.call(arguments,1)[0] || 'data';
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
        console.log(this);
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
	      	for (var i = 0; i < this.handlers[eventType].length; i++) {
	        	this.handlers[eventType][i].apply(this, handlerArgs);
	      	}
    	}


	}
};




let app1 = new Observer({
    name: {
    lastName: 'liang',
    firstName: 'ai'
},
    age: 25
});


app1.$watch('name',function(name) {
    console.log('我的名字变了，可能是firstname，也可能是lastname');
});
app1.data.name.firstName = 'lalala';
//控制台输出：您设置了firstName，新的值为lalala;
//我的名字变了，可能是firstname，也可能是lastname；










