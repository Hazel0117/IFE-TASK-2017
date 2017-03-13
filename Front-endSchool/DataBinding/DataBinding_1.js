function Observer(data) {
	this.data = data;
}

Observer.prototype = {
	init : function() {
		for (var key in this.data) {
            var val = this.data[key];
            if (typeof val === 'object') {
                //当对象的属性仍为对象时，利用深度遍历
                new Observer(val).init();
            }
            this.convert(val,key);
        }
    },
    convert: function(val,key){
				
			Object.defineProperty(this.data, key, {
			configurable: true,
			enmerable: true,

			set: function(newVal) {
				val = newVal;
				console.log('您设置了' + key + ',新的值为' + val);
			},
            
			get: function() {
				console.log('您访问了' + key);
                return val;

			}
		});		
	}
};

var data = {
    user: {
        name: "liangshaofeng",
        age: "24"
    },
    address: {
        city: "beijing"
    }
};


var app1 = new Observer({
	name: 'youngwind',
	age: 25
});

var app2 = new Observer({
	university: 'bupt',
	major: 'computer'
});

app1.init();
app2.init();
app1.data.name = 'haha';
console.log(app1);

var app3 = new Observer({
    user: {
        name: "liangshaofeng",
        age: "24"
    },
    address: {
        city: "beijing"
    }
});

app3.init();
console.log(app3);


