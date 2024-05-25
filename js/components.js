//Copy Template Function//////////////////////////////////////////////////////////////
	var numTemplateCopies = 0;
	function copyTemplate(){
		var template = document.querySelector('template');
		var clone = document.importNode(template.content, true);
		clone.querySelector('.adjective').textContent = "awesome";
		clone.querySelector('.number-of-copies').textContent = ++numTemplateCopies;
		document.getElementById('templateButton').appendChild(clone);
	}
	
	
	class ArrowButtonParade extends HTMLElement{
		constructor(){
				super();
				
				var container = document.createElement('div');
				container.className="arrowContainer";
				this.buttons = [];
			
				for(var i = 0; i < 106; i++){
					var sibling = new ArrowButton();
					this.buttons.push(sibling);
					var youngestChild = container.lastChild; 
					container.insertBefore(sibling, youngestChild);
				}
				this.style.width = document.getElementById('nk-main').offsetWidth + "px";
				this.appendChild(container);
			}

		connectedCallback(){
			this._ticker = setInterval( ()=> {
				this.buttons.forEach( btn => {
					btn.Direction = (btn.Direction >= 360 || btn.Direction <= -360 ? 0 : btn.Direction) + btn.rotationDirection;
					btn.style.transform = "rotate("+btn.Direction+"deg)";
				});
			}, 5);
		}
		
		disconnectedCallback(){
			clearInterval(this._ticker)
		}
	}
	customElements.define('arrow-container', ArrowButtonParade);
	
	class ArrowButton extends HTMLButtonElement {
		static _numButtons = 0;
		
		constructor(){
			super();
			this.Direction =this.getRandomDirection();
			this.rotationDirection = (ArrowButton._numButtons++ % 2 == 0)? 1:-1;
		}
		connectedCallback(){
			this.innerText = NK.Main.ArrowRight;
			this.className = "random_arrow_btn";
			this.style.transform = "rotate("+this.Direction+"deg)";
		}

		getRandomDirection(){
			var dir = [];
			
			for (var i = 0; i < 360; i++)
				dir.push(i);
			
			return dir[Math.floor(Math.random() * Math.floor(360))];
		}

	}	
	customElements.define('custom-button', ArrowButton, {extends: 'button'});
	
	document.getElementById('extendingCustomElements').appendChild(new ArrowButtonParade());
			
// Time Formatted ////////////////////////////////////////////////////////////////////		
	class TimeFormatted extends HTMLElement {

		render() {
			let date = new Date(this.getAttribute('datetime') || Date.now());

			this.innerHTML = new Intl.DateTimeFormat("default", {
				year: this.getAttribute('year') || undefined,
				month: this.getAttribute('month') || undefined,
				day: this.getAttribute('day') || undefined,
				hour: this.getAttribute('hour') || undefined,
				minute: this.getAttribute('minute') || undefined,
				second: this.getAttribute('second') || undefined,
				timeZoneName: this.getAttribute('time-zone-name') || undefined,
			}).format(date);
		}

		connectedCallback() {
			if (!this.rendered) {
				this.render();
				this.rendered = true;
			}
		}

		static get observedAttributes() {
			return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
		}

		attributeChangedCallback(name, oldValue, newValue) {
			this.render();
		}
	}
	customElements.define("time-formatted", TimeFormatted);
	
// Live Timer ////////////////////////////////////////////////////////////////////////
	class LiveTimer extends HTMLElement {
		render() {
			this.innerHTML = `<time-formatted hour="numeric" minute="numeric" second="numeric"></time-formatted>`;

			this.timerElem = this.firstElementChild;
		}

		connectedCallback() { 
			if (!this.rendered) {
				this.render();
				this.rendered = true;
			}
			
			this.timer = setInterval(() => {
				this.date = new Date();
				this.timerElem.setAttribute('datetime', this.date);
				this.dispatchEvent(new CustomEvent('tick', { detail: this.date }));
			}, 1000);
		}

		disconnectedCallback() {
			clearInterval(this.timer); 
		}

	}
	customElements.define("live-timer", LiveTimer);
	
// Shadow DOM ////////////////////////////////////////////////////////////////////////
	window.onload = function(){
		var host = document.getElementById('host');
		
		if (host){
			var root = host.attachShadow({mode: 'open'});
			var h2 = document.createElement('h2');
			h2.textContent = "This is part of the Shadow DOM";
			root.appendChild(h2);
		}
	}
	
	// User Sign In Dialog ////////////////////////////////////////////////////////////////////////
	class SignInDialog extends HTMLElement {
		render() {
			this.innerHTML = `\
				<div class="row user_dialog">\
					<div class="dialog_title" >Sign In</div>\
					<div class="dialog_field_area">\
						<div class="inline_label_field">\
							<label class="user_label">Username:</label>\
							<input class="user_input"type="text"/>\
						</div>\
						<div class="inline_label_field">\
							<label class="user_label">Password:</label>\
							<input class="user_input"type="text"/>\
						</div>\
					</div>\
					<div class="dialog_control_bar">\
						<div class="dialog_option_1"><a href="#">New?</a></div>\
						<div class="dialog_option_2"><a href="#">Forgot<br/>Password</a></div>\
						<div class="dialog_commit_option"><a href="#">Go</a></div>\
					</div>\
				</div>`;
		}

		connectedCallback() { 
			if (!this.rendered) {
				this.render();
				this.rendered = true;
			}
		}
	}
	customElements.define("sign-in-dialog", SignInDialog);
	

