"use strict";

var NK = {};

var app = angular.module('nkMain', []);
app.controller('profile_cntrl', function($scope) {
  $scope.firstName= "Nicholas";
  $scope.lastName= "Krivanec";
  $scope.pg_golor="#ffffff";
});

NK.Main = function (){
		var scripts = document.scripts;
		var myPath = scripts[scripts.length - 1].src;
		
		var Element = function (tag, p = {}, e = {}){
			var html = document.createElement(tag);
			Object.keys(p).forEach((key)=>{
				if (p[key] !== undefined)
					html.setAttribute(key, p[key]);
			});
			
			Object.keys(e).forEach((key)=>{
				if(typeof e[key] === 'function')
					html.addEventListener(key, e[key]);
			});
				
			return html;	
		}
		var pageId;
			
		var Prefix = function(){ return (pageId == "jwpractice") ? "../../":"../"; }
		var Prefix2 = function(){	return (pageId == "jwpractice") ? "../../html/":"";}

		class HeadTag extends HTMLHeadElement {
			render() {
				pageId = this.getAttribute('id').toLowerCase()??"";;
				var title = Element('title');
				var prefix = Prefix();
				title.innerText = pageId;

				var nodes = [	title,
				
					Element('meta',{name:"description",content: (this.getAttribute('description')??"") + " Screen"}),
					Element('meta',{name:"keywords",content:(this.getAttribute('keywords')??"".split(','))}),
					Element('meta',{name:"author",content:"NK"}),
					Element('meta',{name:"viewport",content:'width=device-width, initial-scale=1.0' + (pageId == "chess" ? ' ,minimum-scale=1':'')}),
					Element('script',{src: "../js/" + pageId + ".js"}),
					Element('link',{rel:"icon",href:prefix + "resources/images/nkIcon.ico",type:"image/png"}),
					Element('link',{rel:"stylesheet",href:prefix + "css/main.css",type:"text/css"}),
					Element('link',{rel:"stylesheet",href:"../css/" + pageId + ".css",type:"text/css"})];

											
				for (var i = 0; i < nodes.length; i++)
					this.appendChild(nodes[i]);
		
			}
			
			connectedCallback() { 
				if (!this.rendered) {
					this.render();
					this.rendered = true;
				}
			}
			
			LoadScript( url, callback )
			{
				var script = document.createElement( "script" );
				script.type = "text/javascript";
				if(script.readyState) {  // only required for IE <9
					script.onreadystatechange = function(){
						if ( script.readyState === "loaded" || script.readyState === "complete" )
						{
							script.onreadystatechange = null;
							callback();
						}
					};
				} else {  //Others
					script.onload = function() {
						callback();
					};
				}

				script.src = url;
				this.appendChild( script );
			}
		}
		customElements.define('nk-head', HeadTag, {extends: 'head'});
		
		class LeftMenuBar extends HTMLElement {
			render(){
				this.innerHTML = '\
				<div class="left_menu_bar">\
					<a aria-label="Chess.com - Play Chess Online" data-panel="notifications" class="link main-link chess-logo-wrapper sprite chess-logo" href="https://www.chess.com/today" target="_blank"></a>\
					<a id="plural_sight_link" href="https://app.pluralsight.com/library/" target="_blank"></a>\
					<a id="home_tab" class="w3schools-logo" href="https://www.w3schools.com/" target="_blank">w3schools<span class="dotcom">.com</span></a>\
				</div>'
			}
			
			connectedCallback() { 
				if (!this.rendered) {
					this.render();
					this.rendered = true;
				}
			}
		}
		customElements.define('left-menu-bar',LeftMenuBar);
		
		class MenuBar extends HTMLElement {
			render() {
				var prefix2 = Prefix2();
				var prefix = Prefix();
				var jwLink = pageId == "jwpractice" ? "jwPractice.html" : "../JW/html/jwPractice.html";
				
				this.innerHTML = '\
					<div class="menu_bar" >\
						<a id="home_tab" href="' + prefix2 + 'home.html"	 class=""	>Home</a>\
						<a id="sandbox_tab"href="' + prefix2 + 'sandbox.html" class=""	>Sandbox</a>\
						<a id="components_tab" href="' + prefix2 + 'components.html" class="" 	>Components</a>\
						<a id="jwpractice_tab" href="' + jwLink + '" class="" 	>Practice</a>\
						<a id="portfolio_tab" href="' + prefix2 + 'portfolio.html" class=""style="float:right;" >About</a>\
					</div>';
							
				var title = document.title.toLowerCase();
				var elem;
				
				if (title) 
					elem = document.getElementById(title + '_tab');
				
				if (elem)
					elem.className += " active";
				
				this.setAttribute("class","fixedNavBar");
			}
			
			connectedCallback() { 
				if (!this.rendered) {
					this.render();
					this.rendered = true;
				}
			}
		}
		customElements.define('menu-bar',MenuBar);
		
		class MainDiv extends HTMLElement {
			render() {
				this.innerHTML = '\
					<div id="main"></div>';
			}
			
			connectedCallback() { 
				if (!this.rendered) {
					this.render();
					this.rendered = true;
				}
			}
		}
		customElements.define('main-div', MainDiv);
		
		class IconBar extends HTMLElement {
			render() {
				this.innerHTML = '\
					<div style="position:fixed;bottom:0;right:0;width:100%;height:50px;">\
						<a id="home_tab" href="https://www.w3schools.com/" class="w3schools">\
							<img style="width:150px;height:28px;border:0" src="../resources/images/w3schoolscom_gray.gif" alt="W3Schools.com">\
						</a>\
					</div>';
			}
			
			connectedCallback() { 
				if (!this.rendered) {
					this.render();
					this.rendered = true;
				}
			}
		}
		customElements.define('icon-bar',IconBar);
		
		function display() {
			for (var i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] === 'object') 
					displayObject(arguments[i])
				else
					displayValue(arguments[i], true)
			}
		}

		function displayObject(object) {
			if (object == null)
				displayValue('null');
			displayValue(getTypeName(object) + ' {');
			
			for(var propertyName in object) 
				if (propertyName != 'constructor') 
					displayValue(propertyName + ': ' + object[propertyName], false, true);

			displayValue('}', true)
		}

		function displayValue(value, addMargin, addPadding) {
			var div = document.createElement('div');
			div.style.fontSize='12px'
			if (addMargin)
				div.style.marginBottom='10px'
			if (addPadding)
				div.style.paddingLeft='10px'
			div.textContent = value;
			
			if(document.body)
				document.body.appendChild(div)
		}

		function getTypeName(object) {
			 var funcNameRegex = /function (.{1,})\(/;
			 var results = (funcNameRegex).exec(object.constructor.toString());
			 return (results && results.length > 1) ? results[1] : "";
		}
}
NK.Main();

NK.Main.ArrowRight = "\u2794";

NK.Main.Color = {
	lightBlue		:"#5978BF"
	 ,darkBlue		:"#11327C"
	 ,teal			:"#289999"
	 ,lightTeal 	:"#76CFCF"
	 ,darkTeal 		:"#046F6F"
	 ,lightGreen 	:"#83E783"
};


