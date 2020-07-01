import './about.css';
import Swiper from 'swiper';
import { GithubApi } from '../js/modules/GithubApi.js';
import { CommitCard } from '../js/components/CommitCard.js';
import { CommitCardList } from '../js/components/CommitCardList.js';
import { OWNER, REPO, COUNT_COMMITS } from '../js/constants/aboutConstants.js';

var swiper = new Swiper('.swiper-container', {
  init: false,
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
      spaceBetween: 16,
    },
  },
});

const containerCommits = document.querySelector('.swiper-wrapper');
const createCommitCard = ({ name, email, date, message, avatarUrl }) => {
  const card = new CommitCard();
  return card.create({ name, email, date, message, avatarUrl });
};

const githubApi = new GithubApi({
  owner: OWNER,
  repo: REPO,
});

const commitCardList = new CommitCardList(containerCommits, createCommitCard);

githubApi
  .getCommits()
  .then((data) => {
    commitCardList.render(data.slice(0, COUNT_COMMITS));
    swiper.init();
  })
  .catch((err) => {
    console.log(err);
  });
