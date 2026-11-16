const categories = ['Hip-hop', 'Contemporary', 'Shuffle', 'K-pop / Jazz-funk', 'Сцена', 'Ученики', 'Осанка и движение'];
const videos = [
  {
    "id": "showreel",
    "category": 4,
    "title": "Движение — это язык",
    "url": "https://rutube.ru/play/embed/ad0d859935fe6478e5bc4ede35acad5e/?p=aoNQNxyJ76hU-Ip24UYaTw",
    "cover": null
  },
  {
    "id": "studio",
    "category": 5,
    "title": "Танец. Эмоции. Драйв.",
    "url": "https://rutube.ru/play/embed/87375d5cbb34beda9cc7597a4b26e557/?p=41n4jbxj0l8H45o4gK6dYg",
    "cover": null
  },
  {
    "id": "competition",
    "category": 4,
    "title": "Конкурсное выступление",
    "url": "https://rutube.ru/play/embed/acc5c49150b493ad02e12c903d5321e1/?p=6UvsKo8_1o3iBsZA23kLfg",
    "cover": null
  },
  {
    "id": "duet",
    "category": 5,
    "title": "Дуэт с педагогом",
    "url": "https://rutube.ru/play/embed/e6cdd4bc8bfa9aa40eda4dfefb4f8648/?p=5-Lu44fh_4LQ_sZwpVQvZw",
    "cover": null
  }
];
const tabs = document.querySelector('.categories');
const grid = document.querySelector('.reels');
const heading = document.querySelector('#video-heading');
const dialog = document.querySelector('.player');
const frame = dialog.querySelector('.player-frame');
const source = dialog.querySelector('.player-source');
const title = dialog.querySelector('#player-title');
let trigger;

function openVideo(video, button) {
  const url = URL.canParse(video.url) ? new URL(video.url) : null;
  if (!url || url.protocol !== 'https:' || !['rutube.ru', 'www.youtube-nocookie.com', 'www.youtube.com', 'vkvideo.ru', 'vk.com'].includes(url.hostname)) return;
  const iframe = document.createElement('iframe');
  iframe.src = url.href;
  iframe.title = video.title;
  iframe.allowFullscreen = true;
  iframe.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
  title.textContent = video.title;
  source.href = url.href;
  frame.replaceChildren(iframe);
  trigger = button;
  dialog.showModal();
}
dialog.addEventListener('close', () => {
  frame.replaceChildren();
  trigger?.focus();
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
function showCategory(index) {
  heading.textContent = categories[index];
  [...tabs.children].forEach((tab, position) => tab.setAttribute('aria-pressed', position === index));
  const current = videos.filter(video => video.category === index);
  const tiles = Array.from({length: 6}, (_, position) => {
    const video = current[position];
    const tile = document.createElement(video ? 'button' : 'div');
    tile.className = 'reel';
    if (!video) {
      tile.textContent = 'Видео пока нет';
      return tile;
    }
    tile.type = 'button';
    if (video.cover) {
      const cover = new Image();
      cover.src = video.cover;
      cover.alt = '';
      cover.loading = 'lazy';
      tile.append(cover);
    }
    const play = document.createElement('span');
    play.className = 'round';
    play.textContent = '▶';
    play.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.textContent = video.title;
    tile.append(play, label);
    tile.addEventListener('click', () => openVideo(video, tile));
    return tile;
  });
  grid.replaceChildren(...tiles);
}
categories.forEach((category, index) => {
  const tab = document.createElement('button');
  tab.type = 'button';
  tab.textContent = category;
  tab.addEventListener('click', () => showCategory(index));
  tabs.append(tab);
});
showCategory(location.hash === '#scene' ? 4 : 0);
