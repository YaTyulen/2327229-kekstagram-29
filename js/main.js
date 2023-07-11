import './data.js';
import './util.js';

const PHOTOS_NUMBER = 25; //количество фотографий, которое нужно сгенерировать

//массив из описаний к фотографиям
const DESCRIPTION = [
  'Это я на море. Сейчас дома уже.',
  'Мой лююимый кот',
  'Безумно можно быть первым',
  '-В чём силы брат? - В Ньютонах',
  'Королева Танцпола',
  'Я не мог найти свои очки, чтобы надеть их на работу. Они были на моей голове. Опять я и мои проблемы.',
  'Да это же безумие',
  'Агрессивное молчание',
  'Самое удивительное то, что мы работали-работали, копили-копили, а терять нам до сих пор нечего',
  'Если уж копаешься в себе, тогда уж заодно и сажай что-нибудь',
  'Настроение: уставший грузовичок, который больше не вывозит',
  'Хочу на новый год серотонин, эндорфин и новую нервную систему',
  'Гуманитарии женятся по любви, потому что по рассчету как-то сложно',
  'Лучший выход всегда через',
  'Если нет борьбы, нет прогресса',
  'Больше теряется из-за нерешительности, чем из-за неправильного решения',
  'Если бы высшей целью капитана было сохранить свой корабль, он навсегда оставил бы его в порту',
  'Ты можешь быть самым спелым и сочным персиком в мире, и все равно найдется кто-то, кто ненавидит персики',
  'Поддерживайте огонь; каким бы маленьким, каким бы скрытым он ни был',
  'Через год вы пожалеете, что не начали сегодня',
  'Где-то нечто невероятное ждет, чтобы о нем узнали',
  'Не беспокойтесь о неудачах; нужно быть правым только один раз',
  'Ты носишь паспорт к своему счастью',
  'Если вы ничем не рискуете, вы рискуете еще больше',
  'Я выбираю сделать остаток своей жизни лучшим в своей жизни',
  'Чтобы быть незаменимым, нужно всегда быть другим',
];

//массив сообщений в комментариях
const MESSAGE = [
  'Всё отлично! ',
  'В целом всё неплохо. Но не всё. ',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. ',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. ',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. ',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! ',
];

//массив имён
const NAME = [
  'Артём',
  'Олег',
  'Томара',
  'Юлия',
  'Дмитрий',
  'Сергей',
  'Кирилл',
  'Максим',
];

//функция получения рандомного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//конструктор комментария
const messageBuilder = () => {
  if (getRandomInteger(1,2) === 2) {
    return getRandomArrayElement(MESSAGE) + getRandomArrayElement(MESSAGE);
  }
  return getRandomArrayElement(MESSAGE);
};

//генератор id по порядку чисел
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generatePhotoId = createIdGenerator();
const generatePhotoName = createIdGenerator();

//генератор случайного числа в диапазоне
function getRandomInteger (minNumber, maxNumber) {
  const lower = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const upper = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

//генератор id из диапазона
function IdGeneratorFromRange (minNumber, maxNumber) {
  const previousValues = [];

  let currentValue = getRandomInteger(minNumber, maxNumber);

  while (previousValues.includes(currentValue)) {
    currentValue = getRandomInteger(minNumber, maxNumber);
  }
  previousValues.push(currentValue);

  return currentValue;
}

//создатель комментария
const createComment = () => ({
  id: IdGeneratorFromRange(1, 5000),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: messageBuilder(),
  name:  getRandomArrayElement(NAME),
});

//генератор объектa фотографии
const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoName()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0,30)}, createComment),
});

//создание массива из объектов - опубликованных фотографий
const similarPhotos = () => {
  Array.from({length: PHOTOS_NUMBER}, createPhotoDescription);
  return similarPhotos;
};

similarPhotos();
