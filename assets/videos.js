// Добавьте объект с названием, категорией, описанием и адресом встраивания.
const videos = [
  {
    "title": "Движение — это язык",
    "category": "Шоурил",
    "description": "Сцена, репетиции и жизнь студии.",
    "src": "https://rutube.ru/play/embed/ad0d859935fe6478e5bc4ede35acad5e/?p=aoNQNxyJ76hU-Ip24UYaTw"
  },
  {
    "title": "Танец. Эмоции. Драйв.",
    "category": "Работа с учениками",
    "description": "Подборка танцевальных материалов студии.",
    "src": "https://rutube.ru/play/embed/87375d5cbb34beda9cc7597a4b26e557/?p=41n4jbxj0l8H45o4gK6dYg"
  },
  {
    "title": "Конкурсное выступление",
    "category": "Сценическая хореография",
    "description": "Полная запись конкурсного номера.",
    "src": "https://rutube.ru/play/embed/acc5c49150b493ad02e12c903d5321e1/?p=6UvsKo8_1o3iBsZA23kLfg"
  },
  {
    "title": "Дуэт с педагогом",
    "category": "Дуэт",
    "description": "Руслан Исмаилов танцует с учеником.",
    "src": "https://rutube.ru/play/embed/e6cdd4bc8bfa9aa40eda4dfefb4f8648/?p=5-Lu44fh_4LQ_sZwpVQvZw"
  }
];
const showVideo = (video, container) => {
  const article = document.createElement('article');
  article.className = 'tile';
  for (const [tag, value] of [['p', video.category], ['h3', video.title], ['p', video.description]]) {
    const item = document.createElement(tag);
    if (value === video.category) item.className = 'kicker';
    item.textContent = value;
    article.append(item);
  }
  const player = document.createElement('iframe');
  player.src = video.src;
  player.title = video.title;
  player.className = 'video';
  player.loading = 'lazy';
  player.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
  player.allowFullscreen = true;
  article.append(player);
  container.append(article);
};
const [showreel, ...portfolio] = videos;
showVideo(showreel, document.querySelector('#showreel'));
for (const video of portfolio) showVideo(video, document.querySelector('#portfolio-videos'));
