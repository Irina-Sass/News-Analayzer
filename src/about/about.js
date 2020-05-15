import './about.css';
import Swiper from 'swiper';

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    loop: false,
    centeredSlides: false,
    spaceBetween: 8,
    loopedSlides: 3,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,           
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
           
      1023: {
        centeredSlides: true,
        loop: true,       
        spaceBetween: 16
      },
    }  
  }); 