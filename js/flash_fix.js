function flashFix() {
	if (navigator.appVersion.indexOf("MSIE 5.5")!=-1)
		for (i=0;a=document.getElementsByTagName("object")[i];i++)
			if (a.getAttribute("type")
				&& a.getAttribute("type").indexOf("application/x-shockwave-flash")!=-1
				&& !a.getAttribute("classid"))
					a.outerHTML=(p=a.outerHTML).slice(0,p.indexOf(">"))
					+ " classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' "
					+ "><param name='movie' value='"
					+ a.getAttribute("data")
					+ "' \/>"
					+ p.slice(p.indexOf(">")+1,p.length);
}

//window.onload=function() { flashFix(); };
