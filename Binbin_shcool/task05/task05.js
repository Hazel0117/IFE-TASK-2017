
//队列对象的构造函数，为队列添加属性
function Queue() {
	this.str = [];
}
//利用原型继承，为队列对象添加方法
Queue.prototype = {
	//队列左侧入
	leftIn : function(num) {
		this.str.unshift(num);
	},
	//队列右侧入
	rightIn : function(num) {
		this.str.push(num);
	},
	//判断队列是否为空
	isEmpty : function() {
		return(this.str.length==0);
	},
	//队列左侧出
	leftOut : function() {
		if (!this.isEmpty()) {
			this.str.shift();
		}
		else {
			alert(this.isEmpty);
			alert('This queue is empty!');
		}	
	},
	//队列右侧出
	rightOut : function() {
		if (!this.isEmpty()) {
			this.str.pop();
		}
		else {
			alert('This queue is empty!');
		}
	}
};


//兼容浏览器的事件绑定函数
function addEvent(ele,listener,handler) {
	//Firefox and Chrome
	if (document.addEventListener) {
		ele.addEventListener(listener,handler,false);
	}
	//IE
	else if (document.attachEvent) {
		ele.attachEvent('on'+listener,handler);
	}
	else {
		ele['on'+listener] = handler;
	}
}

//创建新的队列
var queue = new Queue();

//初始化函数，为按钮绑定事件
function init() {
	var btn = document.querySelector('.btn');
	var btns = btn.getElementsByTagName('input');
	var display = document.querySelector('.display');
	addEvent(btns[1],'click',function() {
		var num = btns[0].value;
		//检测用户输入有效性，若输入合法
		if(checkInput(num)) {
			queue.leftIn(num);
			//根据队列进行页面渲染
			renderDisplay(queue.str);
			//为所有display下的div绑定删除自己的函数
			attachDelete();
			//检查队列的str长度是否超过60
			checkStr(queue.str);
		}
		else {
			alert('请输入位于10至100的整数');
		}
	});

	addEvent(btns[2],'click',function() {
		var num = btns[0].value;
		if(checkInput(num)) {
			queue.rightIn(num);
			renderDisplay(queue.str);
			attachDelete();
			checkStr(queue.str);
		}
		else {
			alert('请输入位于10至100的整数');
		}
	});

	addEvent(btns[3],'click',function() {
			queue.leftOut();
			renderDisplay(queue.str);
			attachDelete();
			checkStr(queue.str);
	});

	addEvent(btns[4],'click',function() {
			queue.rightOut();
			renderDisplay(queue.str);
			attachDelete();
			checkStr(queue.str);
	});

	addEvent(btns[5],'click',function() {
		//绑定排序函数
		sort(queue.str);
	});
	addEvent(btns[6],'click',function() {
		//为检测排序算法，生成测试数据
		randomNum(queue.str);
		renderDisplay(queue.str);
		attachDelete();
		checkStr(queue.str);
	});
}

//限制用户输入10到100的整数
function checkInput(num) {
	var btns = document.querySelector('.btn').getElementsByTagName('input');
	if(num<10||num>100) {
		//若输入不合法，将输入框value清空
		btns[0].value = '';
		return false;
	}
	else {
		return true;
	}
}

//重新渲染页面
function renderDisplay(arr) {
	var display = document.querySelector('.display');
	//清除display中所有div
	display.innerHTML = '';
	//根据队列str的长度及元素值生成div
	for(var i = 0; i<arr.length; i++) {
		var div = document.createElement('div');
		div.style.height = arr[i]*4 + 'px';
		display.appendChild(div);
	}
}

//为每个生成的div绑定删除自身的函数
function attachDelete() {
	var divs = document.querySelector('.display').getElementsByTagName('div');
	
	for (var i = 0; i<divs.length; i++) {
		divs[i].onclick = function (ev,i) {
			var display = document.querySelector('.display');
			//删除div
			display.removeChild(this);
			//在队列中删除对应的值
		    queue.str.splice(i,1);
		};
	}
}

//每次操作后，判断数组长度是否等于60
function checkStr(arr) {
	var btns = document.querySelector('.btn').getElementsByTagName('input');

	if (arr.length >= 60){
		//若数组长度大于或等于60，将添加元素的按钮，设置为无法操作
		for (var i = 0;i < 3;i++) {
			btns[i].setAttribute('disabled',true);
		}
	}
	else {
		//若数组长度小于，将添加元素的按钮，设置为可操作
		for (var j = 0;j < 3;j++) {
			btns[j].removeAttribute('disabled');
		}
	}
}



//快速排序的函数
function sort(arr) {
	var i = 0, j = 1, temp;
	var timer = setInterval(sortData,5);
	function sortData() {
		if(i < arr.length) {
			if (j < arr.length) {
				if (arr[i] > arr[j]) {
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
				renderDisplay(arr);
			}
			j++;
		}
			else {
				i++;
				j = i + 1;
			}
		}
		else {
			clearInterval(sortData);
			return;
		}
	}
}

//生成测试用随机数
function randomNum(arr) {
	for(var i = 0; i<60 ; i++) {
		arr[i] = parseInt(10 + Math.random()*90);
	}
}

init();
