'use strict'
import galleryItems from "./gallery-items.js"

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
}

const pictureGalleryMarkup = createPictureGalleryMarkup(galleryItems);
refs.gallery.innerHTML = pictureGalleryMarkup;

function createPictureGalleryMarkup (images) {
 return images.map(({ preview, original , description }) => 
`<li class="gallery__item">
  <a
  class="gallery__link"
  href= ${original}
  >
  <img
    class="gallery__image"
    src=${preview}
    data-source=${original}
    alt='${description}'
  />
  </a>
  </li>
  `)
  .join('');
}

refs.gallery.addEventListener('click' , onGalleryContainerClick);

function onGalleryContainerClick(event){
if(!event.target.classList.contains('gallery__image')  && !event.target.classList.contains('gallery__link')){
  return;
}
event.preventDefault();

refs.lightbox.classList.add('is-open');
refs.modalImage.src = event.target.dataset.source || event.target.href;
refs.modalImage.alt = event.target.alt || event.target.firstElementChild.alt;
}

refs.modalCloseBtn.addEventListener('click', onModalCloseBtnClick);
window.addEventListener('keyup', onModalCloseBtnClick );
window.addEventListener('click', onModalCloseBtnClick);

function onModalCloseBtnClick(event) {
  if(!refs.lightbox.classList.contains('is-open') && event.code !== 'Escape' && !event.target.classList.contains('lightbox__overlay')){
    return;
  }if (event.code === 'Escape' || event.target.nodeName === 'BUTTON' || event.target.classList.contains('lightbox__overlay')){
    refs.lightbox.classList.remove('is-open');
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
  }
}
