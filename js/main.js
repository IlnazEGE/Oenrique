$(document).ready(function () {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie;
	}
	if (isIE()) {
		$('body').addClass('ie');
	}
	if (isMobile.any()) {
		$('body').addClass('touch');
	}
	//FORMS
	function forms() {
		//FIELDS
		$('input,textarea').focus(function () {
			if ($(this).val() == $(this).attr('data-value')) {
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				};
				$(this).val('');
			};
			removeError($(this));
		});
		$('input[data-value], textarea[data-value]').each(function () {
			if (this.value == '' || this.value == $(this).attr('data-value')) {
				if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
					$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
				} else {
					this.value = $(this).attr('data-value');
				}
			}
			if (this.value != $(this).attr('data-value') && this.value != '') {
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
					$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
				}
			}

			$(this).click(function () {
				if (this.value == $(this).attr('data-value')) {
					if ($(this).attr('data-type') == 'pass') {
						$(this).attr('type', 'password');
					};
					this.value = '';
				};
			});
			$(this).blur(function () {
				if (this.value == '') {
					if (!$(this).hasClass('l')) {
						this.value = $(this).attr('data-value');
					}
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
					if ($(this).attr('data-type') == 'pass') {
						$(this).attr('type', 'text');
					};
				};
				if ($(this).hasClass('vn')) {
					formValidate($(this));
				}
			});
		});
		$('.form-input__viewpass').click(function (event) {
			if ($(this).hasClass('active')) {
				$(this).parent().find('input').attr('type', 'password');
			} else {
				$(this).parent().find('input').attr('type', 'text');
			}
			$(this).toggleClass('active');
		});

	}
	forms();

	function digi(str) {
		var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		return r;
	}

	//VALIDATE FORMS
	$('form button[type=submit]').click(function () {
		var er = 0;
		var form = $(this).parents('form');
		var ms = form.data('ms');
		$.each(form.find('.req'), function (index, val) {
			er += formValidate($(this));
		});
		if (er == 0) {
			removeFormError(form);
			if (ms != null && ms != '') {
				showMessageByClass(ms);
				return false;
			}
		} else {
			return false;
		}
	});
	function formValidate(input) {
		var er = 0;
		var form = input.parents('form');
		if (input.attr('name') == 'email' || input.hasClass('email')) {
			if (input.val() != input.attr('data-value')) {
				var em = input.val().replace(" ", "");
				input.val(em);
			}
			if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
				er++;
				addError(input);
			} else {
				removeError(input);
			}
		} else {
			if (input.val() == '' || input.val() == input.attr('data-value')) {
				er++;
				addError(input);
			} else {
				removeError(input);
			}
		}
		if (input.attr('type') == 'checkbox') {
			if (input.prop('checked') == true) {
				input.removeClass('err').parent().removeClass('err');
			} else {
				er++;
				input.addClass('err').parent().addClass('err');
			}
		}
		if (input.hasClass('name')) {
			if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
				er++;
				addError(input);
			}
		}
		if (input.hasClass('pass-2')) {
			if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
				addError(input);
			} else {
				removeError(input);
			}
		}
		return er;
	}
	function clearForm(form) {
		$.each(form.find('.input'), function (index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
			if ($(this).hasClass('phone')) {
				maskclear($(this));
			}
		});
	}
	var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	if (isMobile.any()) { }

	$('.wrapper').addClass('loaded');

	var act = "click";
	if (isMobile.iOS()) {
		var act = "touchstart";
	}

	let iconMenu = document.querySelector(".menu-header__icon");
	let body = document.querySelector("body");
	let menuBody = document.querySelector(".menu-header__body");
	if (iconMenu) {
		iconMenu.addEventListener("click", function () {
			iconMenu.classList.toggle("active");
			body.classList.toggle("lock");
			menuBody.classList.toggle("active");
		});
	}

	function ibg() {
		if (isIE()) {
			let ibg = document.querySelectorAll(".ibg");
			for (var i = 0; i < ibg.length; i++) {
				if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
					ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
				}
			}
		}
	}
	ibg();

});