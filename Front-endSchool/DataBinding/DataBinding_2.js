function Observer(data) {
	this.data = data;
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
				
			Object.defineProperty(this.data, key, {
			configurable: true,
			enumerable: true,

			set: function(newVal) {
                //当现有属性的值为对象时，为这个对象的属性也加上getter与setter
                if (typeof val === 'object') {

                    new Observer(val);
                }
				console.log('您设置了' + key + ',新的值为' + newVal);
                val = newVal;

                //当将原有属性改为对象时，将新增对象的属性也加上getter与setter
                if (typeof val === 'object') {
                    new Observer(val);
                }
                
			},
            
			get: function() {
				console.log('您访问了' + key);
                return val;

			}
		});
	},

    $watch: function(key,callback) {

        var data = this.data;
        //使得深层次的对象属性也能够被$watch监听
        //将传入的key字符串，变为数组
        //如user.name变为['user','name'];
        var keys = key.split('.');

        //通过遍历此数组，将defintProperty中的object参数，
        //变为需要watch属性的上一级
        //如将data = app3.user
        for (let i = 0; i < keys.length - 1; i++) {
            data = data[keys[i]];
        }
        //获取真正需要遍历的属性值
        //如name属性的值
        var val = data[keys[keys.length-1]];
       
        Object.defineProperty(data, keys[keys.length-1], {
            configurable: true,
            enumerable: true,

            set: function(newVal) {
                //回调函数
                callback(newVal);
                val = newVal;
                if (typeof val === 'object') {
                    new Observer(val);
                }
            },
            get: function() {
                console.log('您访问了' + key);
                return val;
            }

        });
    }
};




let app1 = new Observer({
	name: 'youngwind',
	age: 25
});

app1.$watch('age', function(age) {
         console.log('我的年纪变了，现在已经是：'+ age +'岁了');
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


