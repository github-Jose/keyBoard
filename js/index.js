// 初始化数据
var data  = init();
var key = data.key;
var value = data.value;

//生成键盘
for(var index1 = 0;index1<key['length'];index1++){
	var div1 = createNode('div');
	allBoard.appendChild(div1);

	var row = key[index1];
	for(var index2=0;index2<row['length'];index2++){
		var keyBoard = createNode('kbd',{textContent:row[index2]});
		//编辑按钮
		var buttonx = createNode('button',{id:row[index2]});
		var image = createNode('img',{id:row[index2],src:'./image/edit4.png'});

		buttonx.appendChild(image);
		keyBoard.appendChild(buttonx);
		
		var spanImg = createNode('span');
		var Img = createNode('img');
		//favicon.ico
		createFavicon(Img,value[row[index2]])

		spanImg.appendChild(Img);
		keyBoard.appendChild(spanImg);
		
		buttonx.onclick = function(event){
			var img2 = event.target.parentNode.nextSibling.children[0];
			var key = event.target.id;
			// console.log(key)
			x = prompt('tell me the website') //保存用户输入的网址
			value[key] = x;  //改变value中的值
			img2.src = 'http://' + x + '/favicon.ico';
			img2.onerror = function(e){
				e.target.src= './not.png';
			}
			localStorage.setItem('newValue',JSON.stringify(value))
			// location.reload();
		}
		
		div1.appendChild(keyBoard);
	}
}
//监听键盘
document.onkeypress = function(event){
	var key = event['key'];
	if(value[key] != undefined){
		website = 'http://' + value[key];
		// location.href = website; // 模拟用户在当前地址栏输入地址
		window.open(website) // 模拟用户打开新窗口
	}
}

function init(){
	var key = {
		0:{0:'~',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'0',11:'-',12:'=','length':13},
		1:{0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',10:'[ ',11:' ]',12:'\\','length':13},
		2:{0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',9:';',10:'\'',11:'Enter','length':12},
		3:{0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',7:',',8:'.',9:'/','length':10},
		'length':4
	}
	//数组就是对象
	var value = {  //hash  键值对
		'q':'qq.com',
		'w':'weibo.com',
		'e':'ele.me',
		'r':'renren.com',
		't':'taobao.com',
		'y':'youtube.com',
		'z':'zhihu.com'
	}
	 // 判断localStorage中是否有相应的值
	 var changValue = getLocalStorage('newValue');
	
	 if(changValue){
		 value = changValue;
	 }
	 return {
		 "key":key,
		 "value":value
	 }
}

//获取localStorage的值
function getLocalStorage(name){
	return JSON.parse(localStorage.getItem(name) || 'null');
}

function createFavicon(ele,domain){
	if(value[row[index2]]){
		ele.src = 'http://' + domain + '/favicon.ico';
	}else{
		ele.src = './image/edit.png';
	}
	ele.onerror = function(e){
		e.target.src= './image/not.png';
	}
}
//生成元素
function createNode(tagName,attributes){
	var element = document.createElement(tagName);
	if(attributes){
		for(var key in attributes){
			element[key] = attributes[key];
		}
	}
	return element;
}