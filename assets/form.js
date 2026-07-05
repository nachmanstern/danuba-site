(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var lang = document.documentElement.lang === 'hu' ? 'hu' : 'en';

  var strings = {
    en: {
      sending: 'Sending…',
      ok: "Thanks — we've received your message and will reply within one business day.",
      err: 'Something went wrong. Please email hello@danubaservices.com directly.',
      required: 'Please fill in your name and email.'
    },
    hu: {
      sending: 'Küldés…',
      ok: 'Köszönjük — megkaptuk üzenetét, egy munkanapon belül válaszolunk.',
      err: 'Hiba történt. Kérjük, írjon közvetlenül a hello@danubaservices.com címre.',
      required: 'Kérjük, adja meg nevét és email címét.'
    }
  }[lang];

  var status = form.querySelector('.form-status');

  function setStatus(text, cls) {
    status.textContent = text;
    status.className = 'form-status show ' + cls;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();

    if (!name || !email) {
      setStatus(strings.required, 'err');
      return;
    }

    setStatus(strings.sending, 'ok');

    fetch('https://formsubmit.co/ajax/nachistern5@gmail.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        location: form.querySelector('#location').value,
        message: form.querySelector('#message').value,
        _captcha: 'false'
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('submission failed');
        setStatus(strings.ok, 'ok');
        form.reset();
      })
      .catch(function () {
        setStatus(strings.err, 'err');
      });
  });
})();
