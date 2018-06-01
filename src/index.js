/**
 * @author durba.zhang <durban.zhang@gmail.com>
 */
import './styles/index.css';

import tanchuangPng from './images/tanchuang.png';

class Box {
  constructor(options) {
    this.containerObj = $('.pop-container');
    this.options = Object.assign({}, {
      title: '提示',
      text: '',
    }, options);

    this.parent = $('<div class="pop-container"></div>');

    if (this.containerObj.length) {
      this.containerObj.remove();
    }
  }

  init() {
    const {
      middleBtnText,
    } = this.options;

    let {
      confirmBtnText,
      cancelBtnText,
    } = this.options;

    if (!confirmBtnText) {
      confirmBtnText = '确定';
    }

    if (!confirmBtnText) {
      cancelBtnText = '取消';
    }

    let conText = '';
    if (Object.prototype.hasOwnProperty.call(this.options, 'text') &&
      this.options.text) {
      conText = this.options.text;
    }

    const $overlayContainer = $('<div class="pop-overlay"></div>');
    const $divContainer = $('<div class="pop-alert"></div>');
    const $imgContainer = $(`<div class="pop-logo"><img src=${tanchuangPng} width=100 height=100 /></div>`);
    const $messageContainer = $('<div class="pop-info"></div>');

    const $conContainer = $('<p class="pop-text"></p>');
    $conContainer.append(conText);

    let $confirmbtnContainer;
    if (Object.prototype.hasOwnProperty.call(this.options, 'confirmBtnLink') &&
      this.options.confirmBtnLink) {
      $confirmbtnContainer = $(`<div class="pop-horizal-box pop-top-border" style="line-height:28px"><a href="${this.options.confirmBtnLinkUrl}" class="btn btn-default confirm-btn">${confirmBtnText}</button></div>`);
    } else {
      $confirmbtnContainer = $(`<div class="pop-horizal-box pop-top-border"><button class="btn btn-default confirm-btn">${confirmBtnText}</button></div>`);
      $confirmbtnContainer.on('click', this.confirmHandle.bind(this));
    }

    let $middlebtnContainer;
    if (Object.prototype.hasOwnProperty.call(this.options, 'middleBtnLink') &&
      this.options.middleBtnLink) {
      $middlebtnContainer = $(`<div class="pop-horizal-box pop-top-border" style="border-top:none"><a style="padding-top:10px" href="${this.options.middleBtnLinkUrl}" class="btn btn-default confirm-btn">${middleBtnText}</button></div>`);
    } else {
      $middlebtnContainer = $(`<div class="pop-horizal-box pop-top-border" style="border-top:none"><button class="btn btn-default confirm-btn">${middleBtnText}</button></div>`);
      $middlebtnContainer.on('click', this.middleHandle.bind(this));
    }

    const $cancelbtnContainer = $(`<div class="pop-horizal-box no-bottom-border"><button class="btn btn-default cancel-btn">${cancelBtnText}</button></div>`);
    $cancelbtnContainer.on('click', this.cancelHandle.bind(this));

    $messageContainer.append($conContainer);
    if (!this.options.hideConfirmBtn) {
      $messageContainer.append($confirmbtnContainer);
    }

    if (this.options.middleBtnShow) {
      $messageContainer.append($middlebtnContainer);
    }

    if (!this.options.hideCancelBtn) {
      if (this.options.hideConfirmBtn) {
        $cancelbtnContainer.css({
          'border-top': '1px solid #f1f1f1',
        });
      }

      $messageContainer.append($cancelbtnContainer);
    }

    $divContainer.append($messageContainer);
    this.parent.append($overlayContainer);
    this.parent.append($divContainer);
    this.parent.append($imgContainer);

    $('body').append(this.parent);
    this.containerObj = $('.pop-container');
  }

  confirmHandle() {
    this.closeBoxHandle();
    if (Object.prototype.hasOwnProperty.call(this.options, 'confirmFunc') &&
      this.options.confirmFunc) {
      this.options.confirmFunc();
    }
  }

  cancelHandle() {
    this.closeBoxHandle();
    if (Object.prototype.hasOwnProperty.call(this.options, 'cancelFunc') &&
      this.options.cancelFunc) {
      this.options.cancelFunc();
    }
  }

  middleHandle() {
    this.closeBoxHandle();
    if (Object.prototype.hasOwnProperty.call(this.options, 'middleFunc') &&
      this.options.middleFunc) {
      this.options.middleFunc();
    }
  }

  closeBoxHandle() {
    console.log(this.containerObj);
    this.containerObj.remove();
  }
}

class Popbox {
  static pop(options, func) {
    const box = new Box(options, func);
    box.init();
  }

  static closePop() {
    $('.pop-container').remove();
  }
}

export default Popbox;
