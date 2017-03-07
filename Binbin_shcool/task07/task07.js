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
//初始化定时器
var timer;

function init() {
	//获取触发排序的按钮，并绑定事件
	var btns = document.getElementsByTagName('input');
	var nodeRoot = document.getElementById('root');
	var preBtn = btns[0];
	var inBtn = btns[1];
	var laterBtn = btns[2];
	var nodes = [];
	addEvent(preBtn,'click',function() {
		//释放定时器
		clearInterval(timer);
		//清空现有的nodes数组
		nodes.splice(0,nodes.length);
		//进行先序遍历
		preOrder(nodeRoot,nodes);
		changeColor(nodes);
	});
	addEvent(inBtn,'click',function() {
		clearInterval(timer);
		nodes.splice(0,nodes.length);
		inOrder(nodeRoot,nodes);
		changeColor(nodes);
	});
	addEvent(laterBtn,'click',function() {
		clearInterval(timer);
		nodes.splice(0,nodes.length);
		laterOrder(nodeRoot,nodes);
		changeColor(nodes);
	});
}

function preOrder(node,arr){
	if (node) {
		arr.push(node);
		//利用递归，将结点按照先序遍历的顺序进入nodes数组
		preOrder(node.firstElementChild,arr);
		preOrder(node.lastElementChild,arr);
	}
}
function inOrder(node,arr){
	if (node) {
		//利用递归，将结点按照中序遍历的顺序进入nodes数组
		inOrder(node.firstElementChild,arr);
		arr.push(node);
		inOrder(node.lastElementChild,arr);
	}
}
function laterOrder(node,arr) {
	if (node) {
		//利用递归，将结点按照后序遍历的顺序进入nodes数组
		laterOrder(node.firstElementChild,arr);
		laterOrder(node.lastElementChild,arr);
		arr.push(node);
	}
}

function changeColor(arr) {
	var i = 0;
	//将根节点背景色设置为蓝色
	arr[i].style.backgroundColor = 'blue';
	timer = setInterval(function (argument) {
		i++;
		if (i < arr.length) {
			//将上一个遍历的节点背景设为白色
			arr[i-1].style.backgroundColor = '#fff';
			//将正在遍历的节点背景色设为蓝色
			arr[i].style.backgroundColor = 'blue';
		} else {
			//释放定时器
			clearInterval(timer);
			//将最后遍历的节点背景色设为白色
			arr[arr.length-1].style.backgroundColor = '#fff';
		}
	},500);
}
//初始化程序
init();