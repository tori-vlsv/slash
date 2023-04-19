function validator() {

  function date(date) {
    return /^(0[1-9]|1[0-2])\/([0-9]{2})$/g.test(date)
  }
    
  let acceptedCreditCards = [4, 5, 62, 2200, 2204];

  $('#cvv').attr('maxlength', 3);

  $('.cc-number-input').on('input', function(){
    $(this).parent().addClass('error');
    acceptedCreditCards.forEach(el => {
      if ($('.cc-number-input').val().length == 19 && $('.cc-number-input').val().startsWith(el)) {
        $('.cc-number-input').parent().removeClass('error');
      }
    });
  });

  $('.cc-expiry-input').on('input', function(){
    $(this).parent().addClass('error');
    if ($('.cc-expiry-input').val().length == 5 && date($('.cc-expiry-input').val())) {
      $('.cc-expiry-input').parent().removeClass('error');
    }
  });

  $('.cc-cvc-input').on('input', function(){
    $(this).parent().addClass('error');
    if ($('.cc-cvc-input').val().length == 3) {
      $('.cc-cvc-input').parent().removeClass('error');
    }
  });

  let ccNumberInput = $('.cc-number-input'),
      ccNumberPattern = /^\d{0,16}$/g,
      ccNumberSeparator = " ",
      ccNumberInputOldValue,
      ccNumberInputOldCursor,
      
      ccExpiryInput = $('.cc-expiry-input'),
      ccExpiryPattern = /^\d{0,4}$/g,
      ccExpirySeparator = "/",
      ccExpiryInputOldValue,
      ccExpiryInputOldCursor,
      
      ccCVCInput = $('.cc-cvc-input'),
      ccCVCPattern = /^\d{0,3}$/g,
      ccCVCInputOldValue,
      ccCVCInputOldCursor,
      
      mask = (value, limit, separator) => {
        let output = [];
        for (let i = 0; i < value.length; i++) {
          if ( i !== 0 && i % limit === 0) {
            output.push(separator);
          }
          
          output.push(value[i]);
        }
        
        return output.join("");
      },
      unmask = (value) => value.replace(/[^\d]/g, ''),
      checkSeparator = (position, interval) => Math.floor(position / (interval + 1)),
      ccNumberInputKeyDownHandler = (e) => {
        let el = e.target;
        ccNumberInputOldValue = el.value;
        ccNumberInputOldCursor = el.selectionEnd;
      },
      ccNumberInputInputHandler = (e) => {
        let el = e.target,
            newValue = unmask(el.value),
            newCursorPosition;
        
        if ( newValue.match(ccNumberPattern) ) {
          newValue = mask(newValue, 4, ccNumberSeparator);
          
          newCursorPosition = 
            ccNumberInputOldCursor - checkSeparator(ccNumberInputOldCursor, 4) + 
            checkSeparator(ccNumberInputOldCursor + (newValue.length - ccNumberInputOldValue.length), 4) + 
            (unmask(newValue).length - unmask(ccNumberInputOldValue).length);
          
          el.value = (newValue !== "") ? newValue : "";
        } else {
          el.value = ccNumberInputOldValue;
          newCursorPosition = ccNumberInputOldCursor;
        }
        
        el.setSelectionRange(newCursorPosition, newCursorPosition);
        
      },
      ccExpiryInputKeyDownHandler = (e) => {
        let el = e.target;
        ccExpiryInputOldValue = el.value;
        ccExpiryInputOldCursor = el.selectionEnd;
      },
      ccExpiryInputInputHandler = (e) => {
        let el = e.target,
            newValue = el.value;
        
        newValue = unmask(newValue);
        if ( newValue.match(ccExpiryPattern) ) {
          newValue = mask(newValue, 2, ccExpirySeparator);
          el.value = newValue;
        } else {
          el.value = ccExpiryInputOldValue;
        }
      },
      ccCVCInputKeyDownHandler = (e) => {
        let el = e.target;
        ccCVCInputOldValue = el.value;
        ccCVCInputOldCursor = el.selectionEnd;
      },
      ccCVCInputInputHandler = (e) => {
        let el = e.target,
            newValue = el.value;
        
        newValue = unmask(newValue);
        if ( newValue.match(ccCVCPattern) ) {
          newValue = mask(newValue, 3);
          el.value = newValue;
        } else {
          el.value = ccCVCInputOldValue;
        }
      };

  ccNumberInput.on('keydown', ccNumberInputKeyDownHandler);
  ccNumberInput.on('input', ccNumberInputInputHandler);

  ccExpiryInput.on('keydown', ccExpiryInputKeyDownHandler);
  ccExpiryInput.on('input', ccExpiryInputInputHandler);


  ccCVCInput.on('keydown', ccCVCInputKeyDownHandler);
  ccCVCInput.on('input', ccCVCInputInputHandler);
}
validator()


function alphaOnly(event) {
  var value = String.fromCharCode(event.which);
  var pattern = new RegExp(/[ A-Za-z]/i);
  return pattern.test(value);
}
$('.card__title input').bind('keypress', alphaOnly);

function bubbleToggle() {
  let bubble = $('.card__bubble');
  let button = $ ('.card__attention');
  let close = $ ('.card__bubble__close');
  button.on('click', function() {
    bubble.toggle();
  })
  close.on('click', function() {
    bubble.hide();
  })
}
bubbleToggle();

function submitForm() {
  let form = $('.card');
  let label = $('.card__label');
  form.on('submit', function (e) {
    if (!label.hasClass('error')) {
      e.preventDefault();
      $(this).get(0).reset();
      label.removeClass('error');
    } else {
      return false;
    }
  });
}
submitForm();

import "./assets/styles/app.scss";