
(function (){
	var added=false;
	
	window.calendar=function (oInp)
	{
		var oDiv=document.createElement('div');
		oDiv.className='calendar';
		oDiv.innerHTML='<a href="javascript:;" id="prev" class="prev">←</a> \
		<a href="javascript:;" id="next" class="next">→</a> \
		<span id="span1">xxxx年xx月</span> \
		<ol> \
			<li>一</li> \
			<li>二</li> \
			<li>三</li> \
			<li>四</li> \
			<li>五</li> \
			<li class="week">六</li> \
			<li class="week">日</li> \
		</ol>\
		<ul id="ul1"> \
		</ul>';
		
		oDiv.style.left=oInp.offsetLeft+'px';
		oDiv.style.top=oInp.offsetHeight+5+'px';
		
		oInp.parentNode.insertBefore(oDiv, oInp);
		oInp.onfocus=function (){
			oDiv.style.display='block';
		};
		
		var now=0;
		// 当前月
		create();
		
		// 下个月
		var oNext=document.getElementById('next');
		oNext.onclick=function (){
			now++;
			create();
		};
		
		// 上个月
		var oPrev=document.getElementById('prev');
		oPrev.onclick=function (){
			now--;
			create();
		};
		
		function create()
		{
			var oUl=document.getElementById('ul1');
			oUl.innerHTML='';
			// 改span文字
			var oSpan=document.getElementById('span1');
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+now, 1);
			var y=oDate.getFullYear();
			var m=oDate.getMonth();
			oSpan.innerHTML=y+'年'+toDub(m+1)+'月';
			
			// 创建空格
			var oDate=new Date(); // ?
			oDate.setMonth(oDate.getMonth()+now, 1);
			oDate.setDate(1);
			var week=oDate.getDay();
			if (week == 0)
			{
				week=7;
			}
			for (var i=0; i<week-1; i++)
			{
				var oLi=document.createElement('li');
				
				oUl.appendChild(oLi);
			}
			
			// 创建真正的日期
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+now, 1);
			oDate.setMonth(oDate.getMonth()+1, 1);
			oDate.setDate(0);
			var total=oDate.getDate();
			for (var i=1; i<=total; i++)
			{
				var oLi=document.createElement('li');
				oLi.innerHTML=i;
				oUl.appendChild(oLi);
			}
			
			// 加week
			var aLi=oUl.children;
			for (var i=0; i<aLi.length; i++)
			{
				if((i%7==5) || (i%7==6))
				{
					aLi[i].className='week';
				}
				
				// 处理、今天
				if (now==0)
				{
					var oDate=new Date();
	
					if (aLi[i].innerHTML==oDate.getDate())
					{// 今天
						aLi[i].className='today';
						aLi[i].innerHTML='今天';
						aLi[i].onclick=function (){
							var num=oDate.getDate();
							fn(num);
						};
					}	
					else if (aLi[i].innerHTML < oDate.getDate())
					{// 以前
						aLi[i].className='past';
					}
					else
					{ // 未来
						aLi[i].onclick=function (){
							// 2015-03-27
							var num=this.innerHTML;
							fn(num);
						};
					}
				}
				else if (now < 0)
				{ // 上个月
					aLi[i].className='past';
				}
				else
				{ // 下个月
					if (aLi[i].innerHTML != '')
					{
						aLi[i].onclick=function (){
							// 2015-03-27
							var num=this.innerHTML;
							fn(num);
						};
					}
					
				}
			}	
			
			function fn(num)
			{
				oInp.value=oSpan.innerHTML+toDub(num)+'日';
				oDiv.style.display='none';
			}	
		}
	}
	
	function toDub(n)
	{
		return n<10 ? '0'+n : ''+n;
	}
})();







