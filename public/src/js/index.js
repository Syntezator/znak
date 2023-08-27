const debounce = function(func, timeout = 300) {
	let timer;
	return (...args) => {
	 	clearTimeout(timer);
	 	timer = setTimeout(() => { func.apply(this, args); }, timeout);
	};
}

class Application {
	slide(i) {
		this.steps.forEach(step => step.classList.remove('active'));

		if(i < 0) i = 0;
		if(i > this.total) i = this.total;

		this.steps[i].classList.add('active');

		this.current = i;
		const zoomOut = evt => {
			this.wrapper.style.transform = `translate3D(-${this.current * 100}%, 0, 0)`;
			this.wrapper.removeEventListener('transitionend', zoomOut);
		};
		this.wrapper.addEventListener('transitionend', zoomOut.bind(this));
		this.wrapper.style.transform = `translate3D(-${this.current * 100}%, 0, ${this.deep})`;
		this.body.dataset.current = i;
	}

	wheel(e) {
		this.slide(+this.current + e.deltaY / 100);
	}

	init() {
		this.steps.forEach(i => {
			i.addEventListener('click', e => {
				e.preventDefault();
				this.slide(e.target.dataset.target);
			});
		});

		if(this.touch) {
			window.addEventListener('touchstart', e => {
                this.touchStart = this._pointer(e);
			});
			window.addEventListener('touchmove', e => {
                this._drag(e);
			});
			window.addEventListener('touchend', e => {
                this.move(e);
			});
		}else{
			window.addEventListener('wheel', debounce(this.wheel.bind(this), 150));

			this.defaultCursorElements && this.defaultCursorElements.forEach(i => {
				i.addEventListener('mouseenter', e => document.body.classList.add('cursor-default'));
				i.addEventListener('mouseleave', e => document.body.classList.remove('cursor-default'));
			})

			const mouseIcon = this.mouse.querySelector('svg');

			window.addEventListener('mousemove', e => {
				this.mouse.style.left = e.clientX + 'px';
				this.mouse.style.top = e.clientY + 'px';
				if(e.clientX < window.innerWidth / 2) {
					mouseIcon.style.transform = 'rotate(180deg)';
				}else{
					mouseIcon.style.transform = 'rotate(0deg)';
				}
			});

			document.body.addEventListener('mousedown', e => {
				//console.log(e.target.nodeName);
				if(~['A', 'INPUT', 'BUTTON'].indexOf(e.target.nodeName)) return;
				if(e.clientX < window.innerWidth / 2) {
					this.slide(this.current - 1);
				}else{
					this.slide(this.current + 1);
				}
			});
		}
	}

	_drag(e) {
        this.dragging = true;
    }

    move(e) {
    	this.touchEnd = this._pointer(e);
        let delta = this._delta(this.touchStart, this.touchEnd);
        if(this.dragging) {
            if(Math.abs(delta.x) > Math.abs(delta.y) && Math.abs(delta.y) < this.settings.sensitivity.y) {
                this.slide((this.touchEnd.x > this.touchStart.x) ? this.current - 1 : this.current + 1);
            }else if(Math.abs(delta.y) > Math.abs(delta.x) && Math.abs(delta.x) < this.settings.sensitivity.x) {
                this.slide((this.touchEnd.y > this.touchStart.y) ? this.current - 1 : this.current + 1);
            }
            this.dragging = false;
        }
    }

	_pointer (event) {
        let result = {
            x: 0,
            y: 0
        };

        event = event.originalEvent || event || window.event;
        event = event.touches && event.touches.length ? event.touches[0] : event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : event;

        result.x = event.screenX || event.clientX;
        result.y = event.screenY || event.clientY;

        return result;
    }

	_delta(from, to) {
        return {
            x: from.x - to.x,
            y: from.y - to.y
        }
    }

	constructor() {
		this.body = document.body;
		this.wrapper = document.querySelector('.slides');
		this.steps = document.querySelectorAll('.steps__btn');
		this.mouse = document.querySelector('.main-controls');
		this.defaultCursorElements = document.querySelectorAll('a, input, button');
		this.deep = '-50px';
		this.current = 0;
		this.total = this.steps.length - 1;
		this.touch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
		this.dragging = false;
		this.settings = {
			sensitivity: {
	            x: 50,
	            y: 50
	        }
		}

		this.init();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const App = new Application();

	window.app = App;

	const inputs = document.querySelectorAll('.input-text');
	inputs && inputs.forEach(i => {
		i.addEventListener('change', e => i.setAttribute('value', e.target.value));
	});


	const logoIntro = document.querySelector('.logo-intro');
	logoIntro && logoIntro.addEventListener('animationend', () => document.querySelector('.logo').classList.add('presented'));

	/*
	const contactsForm = document.querySelector('#main-form');
	contactsForm && contactsForm.addEventListener('submit', e => {
		e.preventDefault();
		alert('Форма типа отправлена!');
		
	});
	*/
	
	const validationError = (e) => {
		e.target.querySelector('.form-error').classList.add('show');
		throw new Error('Validation error');
	};

	const validationSuccess = (e) => {
		e.target.querySelector('.form-error').classList.add('hide');
		e.target.lastElementChild.classList.add('show');
		e.target.querySelector('button').classList.add('hide');
	};

	const formValidation = (e) => {
		const formInputs = e.target.querySelectorAll('input');

	  	for (var i = 0; i < formInputs.length; i++){
	   		if(formInputs[i].value.length === 0) validationError(e);	   					   	
		} 

		const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
	    const myPhone = document.getElementById('main-contacts__phone').value;
	    const valid = re.test(myPhone);
	    if(!valid) validationError(e);

	    validationSuccess(e); 
	}; 

	[].forEach.call( document.querySelectorAll('.tel'), function(input) {
	    var keyCode;
	    function mask(event) {
	      event.keyCode && (keyCode = event.keyCode);
	      var pos = this.selectionStart;
	      if (pos < 3) event.preventDefault();
	      var matrix = "+7 (___) ___ ____",
	          i = 0,
	          def = matrix.replace(/\D/g, ""),
	          val = this.value.replace(/\D/g, ""),
	          new_value = matrix.replace(/[_\d]/g, function(a) {
	              return i < val.length ? val.charAt(i++) : a
	          });
	      i = new_value.indexOf("_");
	      if (i != -1) {
	          i < 5 && (i = 3);
	          new_value = new_value.slice(0, i)
	      }
	      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
	          function(a) {
	              return "\\d{1," + a.length + "}"
	          }).replace(/[+()]/g, "\\$&");
	      reg = new RegExp("^" + reg + "$");
	      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
	        this.value = new_value;
	      }
	      if (event.type == "blur" && this.value.length < 5) {
	        this.value = "";
	      }
	    }

	    input.addEventListener("input", mask, false);
	    input.addEventListener("focus", mask, false);
	    input.addEventListener("blur", mask, false);
	    input.addEventListener("keydown", mask, false);
	});

	const contactsForm = document.querySelector('#main-form');
	contactsForm && contactsForm.addEventListener('submit', e => {
		e.preventDefault();

		formValidation(e);
		
		const formName = e.target.querySelector('#main-contacts__name').value;
		const formPhone = e.target.querySelector('#main-contacts__phone').value;
		const data_body = "name=" + formName + "&phone="+ formPhone;  

		fetch("send.php", { 
			method: "POST",
		    body: data_body,   
			headers:{"content-type": "application/x-www-form-urlencoded"} 
			})
		   
		.then( (response) => {
		        if (response.status !== 200) { 

					return Promise.reject();
		        }   
		return response.text()
		})
		.then(i => console.log(i))
		.catch(() => console.log('ошибка')); 			
	});

});
