
//发布订阅模式
function PubSub() {
    this.hanlders = {};
}

PubSub.prototype = {
    //订阅事件
    on: function(eventType,hanlder) {
        var _self = this;
        //为深层次的属性，订阅事件
        var keys = eventType.split('.');
        eventType = keys[keys.length-1];

        if (!(eventType in _self.hanlders)) {
            _self.hanlders[eventType] = [];
        }
        _self.hanlders[eventType].push(hanlder);
        return this;
    },

    //发布事件
    emit: function(eventType) {
        var _self = this;
        if (_self.hanlders[eventType] === undefined) {
            return;
        }
        var hanlderArgs = Array.prototype.slice.call(arguments,1);
        for (let i = 0; i < _self.hanlders[eventType].length; i++) {
            _self.hanlders[eventType][i].apply(_self,hanlderArgs);
        }
        return _self;
    }
};

//观察者构造函数
function Observer(data) {
	this.data = data;
    this.pubsub = new PubSub();
    this.init();
}


Observer.prototype = {
	init : function() {
		for (let key in this.data) {
            var val = this.data[key];

            if (typeof val === 'object') {
                //当对象的属性仍为对象时，利用深度遍历
                new Observer(val);
            }
            this.convert(val,key);
        }
    },
    convert: function(val,key){
            var _self = this;
				
			Object.defineProperty(this.data, key, {
			configurable: true,
			enumerable: true,

			set: function(newVal) {
                //当现有属性的值为对象时，为这个对象的属性也加上getter与setter
                if (typeof val === 'object') {

                    new Observer(val);
                }
				console.log('您设置了' + key + ',新的值为' + JSON.stringify(newVal));
                //输出时，利用JSON将newVal转为字符创，使当newVal为对象时能够在控制台显示
                
                val = newVal;

                //当将原有属性改为对象时，将新增对象的属性也加上getter与setter
                if (typeof val === 'object') {
                    new Observer(val);
                }
                //发布类型为key的事件
                _self.pubsub.emit(key,val);
                
			},
            
			get: function() {
				console.log('您访问了' + key);
                return val;

			}
		});
	},

    $watch: function(key,callback) {
        this.pubsub.on(key,callback);
    }

};




let app1 = new Observer({
	name: 'youngwind',
	age: 25
});

//为age注册两个回调函数
app1.$watch('age', function(age) {
         console.log('我的年纪变了，现在已经是：'+ age +'岁了');
 });
app1.$watch('age', function(age) {
         console.log('岁月催人老哇！');
 });


app1.data.name = {
    lastName: 'liang',
    firstName: 'ai'
}; //控制台输出：您设置了name，新的值为[object Object]，待解决


app1.data.name.firstName = 'lalala';
//控制台输出：您设置了firstName，新的值为lalala


app1.data.age = 45;
//输出：我的年纪变了，现在已经是45岁了


let app3 = new Observer({
    user: {
        name: "liangshaofeng",
        age: "24"
    },
    address: {
        city: "beijing"
    }
});



app3.$watch('user.name', function(name) {
    console.log('我的姓名变了，我现在的名字是' + name);
});


app3.data.user.name = 'li';
//输出：我的姓名变了，我现在的名字是li



