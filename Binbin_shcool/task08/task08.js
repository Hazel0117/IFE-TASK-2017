(function init(argument) {
	var rootNode = document.getElementById('root');
	//深度优先遍历按钮
	var btnDF = document.querySelector('#btnDF');
	//广度优先遍历按钮
	var btnBF = document.querySelector('#btnBF');
	//提交搜索条件按钮
	var btnSearch = document.querySelector('#submit');
	//初始化定时器
	var timer;
	//用于存放按照遍历顺序排好的节点
	var nodes = [];
	btnDF.addEventListener('click',function() {
		//清空先用nodes数组
		nodes.splice(0,nodes.length);
		//将所有div背景色还原为白色
		clearStyle();
		//释放运行中的定时器
		clearInterval(timer);
		//由根节点出发，对于多叉树进行基于深度的遍历
		traverseDF(rootNode);
		renderDisplay(nodes);
	});
	btnBF.addEventListener('click',function() {
		nodes.splice(0,nodes.length);
		clearStyle();
		clearInterval(timer);
		//由根节点出发，对于多叉树进行基于深度的遍历
		traverseBF(rootNode);
		renderDisplay(nodes);
	});
	btnSearch.addEventListener('click',function() {
		nodes.splice(0,nodes.length);
		clearStyle();
		clearInterval(timer);
		traverseDF(rootNode);
		var s = searchHandler();
		if (s) {
			renderDisplay(nodes);
		} else {
			alert('无匹配项');
		}
	});

	//将DOM树，转化为多叉树，存放在nodes数组中
	function traverseDF(node) {
		var children = node.children;
		for (var i = 0; i < children.length; i++) {
			traverseDF(children[i]);
		}
		if (node === undefined) {
			return;
		}else {
			nodes.push(node);
		}
	}



	function traverseBF(node) {
		//利用队列存储将要遍历的节点
		var queue = [];
		if (node === undefined) {
			return;
		}
		//将根节点推入用于存放遍历结果的数组nodes
		nodes.push(node);
		//获取根节点的子节点
		var children = node.children;
		for (var i = 0; i < children.length; i++) {
			//将根节点的所有子节点，按照顺序推入队列中
			queue.push(children[i]);
		 }
		
		while (queue.length > 0) {
			//当队列长度大于0时，弹出队列中的第一个节点，并存入nodes数组
			firstNode = queue.shift();
			nodes.push(firstNode);
			//若弹出队列的节点有子节点，遍历其子节点，推入队列中待处理
			if (firstNode.children) {
				for (var j = 0; j < firstNode.children.length; j++) {
					queue.push(firstNode.children[j]);
				}
			}
		}
	}

	function renderDisplay(arr) {
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
	function searchHandler() {
		//获取
		var condition = document.querySelector('#condition').value.trim();
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].firstChild.nodeValue.trim() == condition) {
				nodes.splice(i+1,nodes.length-1);
				setTimeout(function() {
					nodes[nodes.length-1].style.background = 'red';
				}, (nodes.length+1)*500);
				//若有匹配项，返回true
				return true;
			} 
		}
		return false;
	}
	function clearStyle() {
		//还原所有div背景颜色
		var divs = document.querySelectorAll('div');
		for (var i = 0; i < divs.length; i++) {
			divs[i].style.background = "#ffffff";
		}
	}
})();