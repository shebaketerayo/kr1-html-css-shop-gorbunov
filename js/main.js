const modal = document.querySelector('#order-modal');
const form = document.querySelector('#order-form');
const toast = document.querySelector('#toast');
const teaInput = document.querySelector('#order-tea');
const teaTitle = document.querySelector('#order-tea-title');
const topic = document.querySelector('#client-topic');

function chooseTea(name) {
  teaInput.value = name;
  teaTitle.textContent = name;

  if (topic.value === '') {
    topic.value = 'buy';
  }
}

function clearErrors() {
  form.querySelectorAll('.is-error').forEach((field) => {
    field.classList.remove('is-error');
  });
}

function showToast() {
  toast.hidden = false;

  setTimeout(() => {
    toast.hidden = true;
  }, 5000);
}

document.querySelectorAll('[data-order]').forEach((button) => {
  button.addEventListener('click', () => {
    chooseTea(button.dataset.order);
    modal.showModal();
  });
});

document.querySelectorAll('[data-close]').forEach((button) => {
  button.addEventListener('click', () => {
    modal.close();
  });
});

if (form) {
  const teaFromLink = new URLSearchParams(window.location.search).get('tea');

  if (teaFromLink) {
    chooseTea(teaFromLink);
  }

  form.addEventListener('input', (event) => {
    event.target.classList.remove('is-error');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    if (!form.checkValidity()) {
      for (const field of form.elements) {
        if (field.willValidate && !field.validity.valid) {
          field.classList.add('is-error');
        }
      }

      form.reportValidity();
      return;
    }

    form.reset();
    teaInput.value = '';
    teaTitle.textContent = 'не выбран';

    if (modal) {
      modal.close();
    }

    showToast();
  });
}
