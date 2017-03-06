
//事件绑定函数，兼容浏览器差异
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

//创建队列对象
var queue = {
	str : [],
	leftIn : function(num) {
		this.str.unshift(num);
	},
	rightIn : function(num) {
		this.str.push(num);
	},
	isEmpty : function() {
		return(this.str.length==0);
	},
	leftOut : function() {
		if (!this.isEmpty) {
			this.str.shift();
		}
		else {
			alert('This queue is empty!');
		}
		
	},
	rightOut : function() {
		if (!this.isEmpty) {
			this.str.pop();
		}
		else {
			alert('This queue is empty!');
		}
	}
};

var arr = queue.str;

//生成测试用随机数

for(var i = 0; i<60 ; i++) {
	arr[i] = Math.random()*400;
}

//每次操作后，判断数组长度是否等于60
function checkStr() {
	if (arr.length>=60) {
		btns[0].setAttribute('disabled',true);
	}
	else {
		btns[0].removeAttribute('disabled');
	}
}
//限制用户输入10到100的整数
function checkInput(num) {
	if(num<10||num>100) {
		btns[0].value = '';
		return false;
	}
	else {
		return true;
	}
}
//重新渲染页面
function renderDisplay() {
	display.innerHTML = '';
	for(var i = 0; i<arr.length; i++) {
		var div = document.createElement('div');
		div.style.height = arr[i] + 'px';
		display.appendChild(div);
	}
}

//为每个生成的div绑定删除自身的函数
function attachDelete() {
	var divs = display.getElementsByTagName('div');
	for (var i = 0; i<divs.length; i++) {
		divs[i].onclick = function (e) {
			display.removeChild(e.target);
		};
	}
}

//快速排序的函数
function sort() {
	var i = 0, j = 1, temp;
	var timer = setInterval(sortData,5);
	function sortData() {
		if(i < arr.length) {
			if (j < arr.length) {
				if (arr[i] > arr[j]) {
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
				renderDisplay();
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
//为所有按键绑定事件，并限制用户输入
	var btn = document.querySelector('.btn');
	var btns = btn.getElementsByTagName('input');
	var display = document.querySelector('.display');
	addEvent(btns[1],'click',function() {
		var num = btns[0].value;
		if(checkInput(num)) {
			queue.leftIn(num);
			renderDisplay();
			attachDelete();
			checkStr();
		}
		else {
			alert('请输入位于10至100的整数');
		}
		console.log(arr);
	});

	addEvent(btns[2],'click',function() {
		var num = btns[0].value;
		if(checkInput(num)) {
			queue.rightIn(num);
			renderDisplay();
			attachDelete();
			checkStr();
		}
		else {
			alert('请输入位于10至100的整数');
		}
	});
	addEvent(btns[3],'click',function() {
		if (queue.isEmpty()) {
			alert('队列已空');
		}
		else {
			queue.leftOut();
		}
	});
	addEvent(btns[4],'click',function() {
		if(queue.isEmpty()) {
			alert('队列已空');
		}
		else {
			queue.rightOut();
		}
	});
	addEvent(btns[5],'click',function() {
		sort();
	});

renderDisplay();
