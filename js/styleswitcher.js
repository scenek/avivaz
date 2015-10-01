//var modStylesSwitcher = true;
var ua=navigator.userAgent;
var isNav4 = ((ua.indexOf("compatible")==-1) && (ua.indexOf("/4")!=-1));

function stylesSwitcherInit(e) {
	if (isNav4) {
		window.onresize = function(e) {
			location.reload();
		}
	} else {
		styleInit(); // initialize the styleswitcher
	}
}

// This used to be tied to window.onload, but that caused
// some strange problems for me in Mozilla (link elements
// *disappeared* from the DOM!)
function styleInit() {
  var cookie = readCookie("style");
  if (cookie!="null") {
	  var title = cookie ? cookie : getPreferredStyleSheet();
	  setActiveStyleSheet(title);
  }
  insertStyleSwitcher("styleSwitcher","navStyle");
}

//  This code used to run "inline" (before onload), I suppose to set the
//  stylesheet while the document loaded so it wouldn't have to wait till
//  window.onload.  The same code runs onload, so for the sake of Mozilla
//  I comment it out.
//
//  var cookie = readCookie("style");
//  var title = cookie ? cookie : getPreferredStyleSheet();
//  setActiveStyleSheet(title);


window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

function setActiveStyleSheet(title) {
  var i, a, main;
  for (i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (a.getAttribute("rel") &&
        a.getAttribute("rel").indexOf("style") != -1 &&
        a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}
function getActiveStyleSheet() {
  var i, a;
  for (i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (a.getAttribute("rel") &&
        a.getAttribute("rel").indexOf("style") != -1 &&
        a.getAttribute("title") &&
        !a.disabled
        ) return a.getAttribute("title");
  }
  return null;
}
function getPreferredStyleSheet() {
  var i, a;
  for (i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (a.getAttribute("rel") &&
        a.getAttribute("rel").indexOf("style") != -1 &&
        a.getAttribute("rel").indexOf("alt") == -1 &&
        a.getAttribute("title")
        ) return a.getAttribute("title");
  }
  return null;
}
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// Construct a form to control styleswitcher and insert 
// it into the document.
function insertStyleSwitcher(id,        //id of form element created
                             target) {  //element form appended to

	if (!document.getElementsByTagName) return false;
	if (!document.getElementById(target)) { return false; }
	var selectMenu = document.createElement("select");
	
	var tempOption , a, currentStyleIndex;

	// for all link elements..
	for (i=0; (a = document.getElementsByTagName("link")[i]); i++) {

		// if a stylesheet with a title..	
		if (a.getAttribute("rel") &&
		  a.getAttribute("rel").indexOf("style") != -1 &&
		  a.getAttribute("title")) 
		{
			// create an option for it and insert into select
			tempOption = document.createElement("option");
			tempOption.value = a.getAttribute("title");
			if (tempOption.value == getActiveStyleSheet()) {
				// note which option should be default
				currentStyleIndex = i;
			}
			tempOption.appendChild(document.createTextNode(a.getAttribute("title")))
			selectMenu.appendChild(tempOption);
		}
	}
	var menu = document.createElement("form");
	menu.setAttribute("id",id);
	menu.appendChild(selectMenu);

	// insert menu into document
	document.getElementById(target).appendChild(menu);

	// Set the default value of the select after creation because
	// Opera7 would ignore the selected attribute set with
	// setAttribute("selected","selected").
	selectMenu.selectedIndex = currentStyleIndex;

	// give the menu functionality
	selectMenu.onchange = function(e) {
		setActiveStyleSheet(selectMenu.value);
	}
}
