//传入参数，决定弹出框的高度，宽度，以及是哪个元素
function FloatDiv(width,height,ele) {
	this.width = width;
	this.height = height;
	this.ele = ele;
}
FloatDiv.prototype = {
	init: function() {
		//获取弹出框div
		var floatDiv = this.ele;
		//显示浮动框，并根据参数设置宽高
		floatDiv.style.display = 'block';
		floatDiv.style.width = this.width + 'px';
		floatDiv.style.height = this.height + 'px';
		//遮罩
		var cover = document.getElementById('cover');
		cover.style.display = 'block';
		cover.style.height = document.body.scrollHeight + 'px';
		cover.addEventListener('click', function() {
			//点击遮罩，浮动框与遮罩都消失
			floatDiv.style.display = 'none';
			cover.style.display = 'none';
		});
		//将this.ele变为可拖拽
		dragDiv(floatDiv);
		//当窗口，放大或缩小，仍然使div位于页面正中央
		window.addEventListener('resize', function() {
			this.ele.top = '50%';
			this.ele.left ='50%';
		});
	},
};

//弹出浮动框的按钮
var alertDiv = document.getElementById('alert');
alertDiv.addEventListener('click', function() {
	//初始化浮动框
	var floatDiv = document.getElementById('floatDiv');
	var newDiv = new FloatDiv(600,300,floatDiv);
	newDiv.init();
});

//为浮动框中的按钮绑定事件，点击确定或取消按钮，浮动框将消失
var btnGroup = document.querySelector('.btnGroup');
btnGroup.addEventListener('click', function(e) {
	var ev = e || window.event;
	var target = ev.target || ev.srcElement;
	if (target.value === null || target.value === undefined) {
		return;
	} else {
		var floatDiv = document.getElementById('floatDiv');
		floatDiv.style.display = 'none';
		var cover = document.getElementById('cover');
		cover.style.display = 'none';
	}
});

//获取元素相关CSS属性
var getCSS = function(obj,key) {
	return window.getComputedStyle ? window.getComputedStyle(obj,null)[key] : obj.currentStyle[key]; 
};

var params = {
	left: 0,
	right: 0,
	currentX: 0,
	currentY: 0,
	move: false
};

//将某个元素变为可拖拽，target为此元素
var dragDiv = function(target) {
	target.addEventListener('mousedown',function(event) {
		params.move = true;
		//获取元素left，top值
		params.left = getCSS(target,'left');
		params.top = getCSS(target,'top');
		var e = event || window.event;
		//获取鼠标此时所在位置
		params.currentX = e.clientX;
		params.currentY = e.clientY;
	});
	document.addEventListener('mousemove',function(event) {

		if (params.move) {
			var e = event || window.event;
			var mouseX = e.clientX,
				mouseY = e.clientY;
			//根据鼠标位置，移动div
			target.style.left = mouseX - params.currentX + parseInt(params.left) + 'px';
			target.style.top = mouseY - params.currentY + parseInt(params.top) + 'px';
			console.log(target.style.top);
		}	
	});
	target.addEventListener('mouseup',function() {
		params.move = false;
	});
};
