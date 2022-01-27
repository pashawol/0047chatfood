"use strict";
const JSCCommon = { 
	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад", 
			}, 
		}); 
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() { 
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
 
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .footer__btn-top", function () {  
				$('html, body').animate({ scrollTop: 0}, 0);
				return false; 
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
 
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall(); 
	JSCCommon.mobileMenu(); 
	JSCCommon.heightwindow(); 
	JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swipersPrises = new Swiper('.s-slider-js', { 
		slidesPerView: 'auto',
		observer: true,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	});
	const swiperssBlog = new Swiper('.sBlog__btns-slider--js', { 
		slidesPerView: 'auto', 
		freeMode: true
	});
	const swipersCases = new Swiper('.sCases__slider--js', { 
		slidesPerView: 'auto',
		spaceBetween: 20,
		loop: true,
		navigation: {
			nextEl: '.sCases .swiper-button-next',
			prevEl: '.sCases .swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
		breakpoints: { 
			991: {
				slidesPerView: 4
			}
		}
	});
	const swipersFacilityMenu = new Swiper('.sFacilityMenu__slider--js', { 
		slidesPerView: 'auto',
		spaceBetween: 20,
		// loop: true,
		navigation: {
			nextEl: '.sFacilityMenu .swiper-button-next',
			prevEl: '.sFacilityMenu .swiper-button-prev',
		},
		scrollbar: {
			el: '.sFacilityMenu .swiper-scrollbar',
			draggable: true,
		}
	});

	const swiperssTopDishes = new Swiper('.sTopDishes__slider--js', { 
		slidesPerView: 'auto',
		spaceBetween: 20,
		// loop: true,
		navigation: {
			nextEl: '.sTopDishes .swiper-button-next',
			prevEl: '.sTopDishes .swiper-button-prev',
		},
		// scrollbar: {
		// 	el: '.sTopDishes .swiper-scrollbar',
		// 	draggable: true,
		// }
	});
	// modal window


	$(".dd-head-js").click(function(){
		$(this).toggleClass("active").next().slideToggle();
	})

	$(".dropdown-block__toggle").click(function() {
		$(this).parents(".dropdown-block").toggleClass("on")
	})
	
	document.addEventListener('mouseup', (event) => {
		let container = event.target.closest(".dropdown-block.on"); // (1)
		// let link = event.target.closest(".dropdown-block__toggle"); // (1)
		// let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
		if (!container ) {
			$(".dropdown-block").removeClass("on")

		}
	}, { passive: true });

	
	var swiper = new Swiper(".sCompare__table-scroll", {
		// direction: "vertical",
		slidesPerView: "auto",
		freeMode: true,
		scrollbar: {
			el: ".swiper-scrollbar",
			draggable: true,
			hide: false
		},
		mousewheel: true,
	});

	var swiper = new Swiper(".table-scroll-block", {
		// direction: "vertical",
		slidesPerView: "auto",
		freeMode: true,
		scrollbar: {
			el: ".swiper-scrollbar",
			draggable: true,
			hide: false
		},
		mousewheel: true,
	});

	const breadSlider = new Swiper('.bread-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
		spaceBetween: 0,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// slideToClickedSlide: true,
		// freeModeMomentum: true,

	});

	const gallerySlider = new Swiper('.gallery-slider--js', {
		slidesPerView: 'auto',
		// freeMode: true,
		// loop: true,
		watchOverflow: true,
		spaceBetween: 20,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// slideToClickedSlide: true,
		// freeModeMomentum: true,
		breakpoints: {
			992: {
				slidesPerView: 3,
				spaceBetween: 20
			}
		}
	});
	const gallery2Slider = new Swiper('.gallery2-slider--js', {
		slidesPerView: 'auto',
		// freeMode: true,
		loop: true,
		watchOverflow: true,
		spaceBetween: 0,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// slideToClickedSlide: true,
		// freeModeMomentum: true,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
		navigation: {
			nextEl: '.gallery2-slider .swiper-button-next',
			prevEl: '.gallery2-slider .swiper-button-prev',
		},
	});
	const sWeRecommendSlider = new Swiper('.sWeRecommend__slider--js', {
		slidesPerView: 'auto',
		// freeMode: true,
		// loop: true,
		watchOverflow: true,
		spaceBetween: 20,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// slideToClickedSlide: true,
		// freeModeMomentum: true,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
		navigation: {
			nextEl: '.sWeRecommend .swiper-button-next',
			prevEl: '.sWeRecommend .swiper-button-prev',
		},
		breakpoints: {
			992: {
				slidesPerView: 3,
				spaceBetween: 20
			}
		}
	});

	$('.sContent__soc-wrapper').hcSticky({
    stickTo: $('.sContent__body'),
		top: 100,
		bottomEnd: 100,
		responsive: {
			992: {
				disable: true,
			}
		}
  });

	$('.modal-banner').hcSticky({
    stickTo: $('.sContent__main-wrapper'),
		top: 110,
		bottomEnd: 100,
		
  });

	$(".modal-banner__close-btn").click(function(){
		$(this).parent(".modal-banner").hide();
	});

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }

if (document.querySelector("#map")) {


	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
			center: [53.214663, 50.214073],
			zoom: 16,
			controls: ['zoomControl']
		}, {
			//searchControlProvider: 'yandex#search'
		}),
			// Создаём макет содержимого.
			// MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
			// 		'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
			// ),

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				hintContent: 'ChatFood',
				balloonContent: 'г. Самара, ул. Советской Армии, дом 127'
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#image',
				// Своё изображение иконки метки.
				iconImageHref: 'img/map-icon.svg',
				// Размеры метки.
				iconImageSize: [40, 40],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-20, -40]
			});
		myMap.behaviors.disable('scrollZoom');
		//на мобильных устройствах... (проверяем по userAgent браузера)
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			//... отключаем перетаскивание карты
			myMap.behaviors.disable('drag');
		}
		myMap.geoObjects
			.add(myPlacemark);
	});

}