// script.js

document.addEventListener('DOMContentLoaded', function() {
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
      contactBtn.addEventListener('click', function() {
        alert('お問い合わせありがとうございます！\n後ほどご連絡いたします。');
      });
    }
  });