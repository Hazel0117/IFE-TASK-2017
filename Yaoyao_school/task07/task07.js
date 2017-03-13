/**
*调用SortTable函数生成表格
*参数：
*	table: 需要调用组件的表格元素
	cols: 表格拥有的数据列（表头），如语文，数学等
	sortCols: 数据列中，所有支持按此排序的数据列
	data: 表格中的数据
	defaultCriteria: 表格中默认的排序依据
**/



function SortTable(table,cols,sortCols,data,defaultCriteria) {
	//需要调用组件的表格
	this.table = table;
	//数据列
	this.cols = cols;
	//支持排序的数据列
	this.sortCols = sortCols;
	//默认的排序依据
	this.defaultCriteria = defaultCriteria;
	//表格中所有的数据
	this.data = data;
}

SortTable.prototype = {
	init: function() {
		var data = this.data;
		var thead = this.table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
		var tbody = this.table.getElementsByTagName('tbody')[0];
		var sortTag = '<div class="sortTag"><div class="asOrder"></div><div class="desOrder"></div></div>';
		for (var i = 0; i < cols.length; i++) {

			if (inArray(cols[i],this.sortCols)) {
				//为所有支持排序的数据列添加表头排序标签样式
				thead.innerHTML += '<td>'+ cols[i] + sortTag + '</td>'; 
			} else {
				//给相应数据列增加表头
				thead.innerHTML += '<td>' + cols[i] + '</td>';
			}	
		}
		
		//根据默认排序依据排序，并生成表格样式

		this.sort(this.defaultCriteria);

		//为生成的排序按钮，绑定排序事件
		var asBtns = document.querySelectorAll('.asOrder');
		var desBtns = document.querySelectorAll('.desOrder');

		var _self = this;

		for (var a = 0; a < asBtns.length; a++) {
			//对应数据列按照升序排序
				asBtns[a].addEventListener('click', function(e) {
				var ev = e || window.event;
				var target = event.target;
				var criteria = target.parentNode.parentNode.innerText.trim();
				_self.sort(criteria,'as');
			});
		}

		for (var b = 0; b < desBtns.length; b++) {
			//对应数据列按照降序排序
				desBtns[b].addEventListener('click', function(e) {
				var ev = e || window.event;
				var target = event.target;
				var criteria = target.parentNode.parentNode.innerText.trim();
				_self.sort(criteria,'des');
			});
		}
		
	},


	sort: function(criteria,dir) {
		if (dir == 'as') {
				this.data.sort(function(a,b) {
				return a[criteria] - b[criteria];
			});
		} else {
				this.data.sort(function(a,b) {
				return b[criteria] - a[criteria];
			});
		}
		this.renderDisplay();
	},


	renderDisplay: function() {
		var data = this.data;
		var tbody = this.table.getElementsByTagName('tbody')[0];
		tbody.innerHTML = '';
		for (var j = 0; j < data.length; j++) {
			var tr = document.createElement('tr');
			for (var item in data[j]) {
				var td = document.createElement('td');
				td.innerHTML = data[j][item];
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
	}

};

//判断某个元素是否在数组中
function inArray(ele,arr) {
	for (var i = 0; i < arr.length; i++) {
		if (ele == arr[i]) {
			return true;
		}
	}
	return false;
}

var table = document.getElementById('sortTable');
var cols = ['学生姓名','语文','数学','英语','总分'];
var sortCols = ['语文','数学','英语','总分'];
var defaultCriteria = '总分';
var newData = [
	{	
		学生姓名: '张三',
		语文: 80,
		数学: 91,
		英语: 29,
		总分: 200
	},
	{
		学生姓名: '李四',
		语文: 66,
		数学: 81,
		英语: 89,
		总分: 236
	},
	{
		学生姓名: '王五',
		语文: 65,
		数学: 71,
		英语: 77,
		总分: 213
	}
	];

var sortTable = new SortTable(table,cols,sortCols,newData,defaultCriteria);
sortTable.init();