//版权 北京智能社©, 保留所有权利

function addWheel(obj, fn)
{
	function _wheel(ev)
	{
		var oEvent=ev || event;
		var down=false;
		
		if (oEvent.wheelDelta)
		{
			down=oEvent.wheelDelta>0 ? false : true;
		}
		else
		{
			down=oEvent.detail>0 ? true : false;
		}
		
		fn && fn(down);
		
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	
	if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
	{
		obj.addEventListener('DOMMouseScroll', _wheel, false);
	}
	else
	{
		obj.onmousewheel=_wheel;
	}
}