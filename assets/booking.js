const booking = document.querySelector('#child-booking');
booking.addEventListener('submit', (event) => {
  event.preventDefault();
  const age = new FormData(booking).get('age');
  const message = 'Здравствуйте, Руслан! Хочу узнать об индивидуальных занятиях для ребёнка.' + (age ? ' Возраст ребёнка: ' + age + '.' : '');
  location.href = 'https://t.me/voliamsir?text=' + encodeURIComponent(message);
});
