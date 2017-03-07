
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

//为数组原型增加通过值删除数组的功能
Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
};

//创建自定义队列对象
function Queue() {
	this.str = [];
	this.leftIn = function(num) {
		this.str.unshift(num);
	};
	this.rightIn = function(num) {
		this.str.push(num);
	};
	this.isFull = function() {
		if (this.str.length > 10) {
			this.str.shift();
		}
	};
}

//创建新的队列
var queue = new Queue();

function init() {
	//获取用户输入的DOM结点
	var userIn = document.querySelector('#userIn');
	var btn = document.querySelector('#submit');
	addEvent(btn,'click',function() {
		//将用户输入按照分隔符进行处理
		queue.str = manageInput('userIn');
		userIn.value = '';
		renderDisplay('display');
		delTag('display');
	});
	//获取搜索条件框
	var searchIn = document.querySelector('#search');
	var searchBtn = document.querySelector('#searchBtn');
	addEvent(searchBtn,'click',searchHandler)
}

//获取用户输入参数，进行分隔处理，并进行重复验证后，加入数组
function manageInput(ele) {
	var value = document.querySelector('#'+ele).value.trim();
	//将输入框内容根据分隔符分隔，并存入数组
    var arrayIn = value.split(/[^\u4e00-\u9fa5\w]+/g).filter(function(e) {
    	return e.length !== 0; 
	});
  	return arrayIn;	
}

//重新渲染页面
function renderDisplay(ele) {
	var element = document.querySelector('.'+ ele);
	element.innerHTML = '';
	var arr = queue.str;
	for(var i = 0; i<arr.length; i++) {
		var div = document.createElement('div');
		div.innerHTML = arr[i];
		element.appendChild(div);
	}

}
//为每个生成的div绑定删除自身的函数
function delTag() {
	var displayArea = document.querySelector('.display');
	var odivs = displayArea.getElementsByTagName('div');
	for (var i = 0; i < odivs.length; i++) {
		addEvent(odivs[i],'click',function(e) {
			var ev = e || window.event;
			var target = ev.target || srcElement;
			var val = target.innerText;
			displayArea.removeChild(target);
			//删除队列str中相应的值
			queue.str.removeByValue(val);
		});
	}
}
//搜索处理函数
function searchHandler() {
	var condition = document.querySelector('#search').value.trim();
	var arr = queue.str;
	for (var i = 0; i < arr.length; i++) {
		var odivs = document.querySelector('.display').getElementsByTagName('div');
		//移除上一次搜索所形成的结果样式
		odivs[i].setAttribute('class','');
		if (arr[i].indexOf(condition) !== -1) {
			//将匹配项的背景设置为粉红色
			odivs[i].setAttribute('class','result');
		}
	}
}



//初始化
init();





