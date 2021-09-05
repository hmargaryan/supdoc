const systemParts = {
  buttonBg_true: 'danger',
  buttonBg_false: 'success',
  buttonText_true: 'Выйти',
  buttonText_false: 'Войти'
}

export const userCheck = (isLoggedIn, item) => {
  return systemParts[`${item}_${isLoggedIn}`]
}

export const deliveryVariants = [
  {
    id: 'asap',
    title: 'Как можно скорее',
    subtitle: 'За заказом придет ближайший свободный курьер',
    price: 100,
    description: '<ul><li>Вернем до 50 000 ₽ при утере</li> <li>Работаем по региону</li></ul>'
  },
  {
    id: 'plan',
    title: 'Запланировать',
    subtitle: 'Выберете время сами',
    price: 100,
    description: '<ul><li>Вернем до 50 000 ₽ при утере</li> <li>Работаем по региону</li></ul>'
  },
  {
    id: 'express',
    title: 'Экспресс доставка',
    subtitle: 'Назначим курьера сразу и доставим точно в указанное время',
    price: 300,
    description: '<ul><li>Компенсация до 50 000 ₽ при утере включена</li> <li>Работаем от места отправки в +10км</li></ul>'
  }
]

export const deliveryTransports = [
  {
    id: 'foot',
    title: 'Пешком',
  },
  {
    title: 'Автомобиль',
    id: 'car'
  }
]

export const deliveryWeights = {
  foot: ['1', '5', '10', '15', '20'],
  car: ['50', '100', '150', '200']
}

export const paymentMethods = [
  {
    id: 'cash',
    title: 'Наличными'
  },
  {
    id: 'card',
    title: 'Картой'
  }
]

export const priceList = {

}

export const orders = {
  '0605092102': {
    id: '0605092102',
    date: '5 Сентября 2021',
    addresses: [
      { address: 'Лесная, 7' },
      { address: 'въезд Гоголя, 74', name: 'Зайцева Эмилия', phone: '+7 (495) 480-13-08' }
    ],
    status: {
      status: 'accepted',
      bg: 'primary',
      text: 'Заявка принята'
    },
    price: {
      price: 600,
      type: 'картой'
    },
    history: [
      { text: 'Заявка принята', time: '12:00', variant: 'primary' }
    ],
    weight: 1
  },
  '0605092101': {
    id: '0605092101',
    date: '5 Сентября 2021',
    addresses: [
      { address: 'ул. Будапештсткая, 63' },
      { address: 'наб. Ломоносова, 78', name: 'Софронова Полина', phone: '+7 (495) 937-84-89' }
    ],
    status: {
      status: 'in_progress',
      bg: 'info',
      text: 'На выполнении'
    },
    price: {
      price: 600,
      type: 'картой'
    },
    history: [
      { text: 'Заявка принята', time: '12:00', variant: 'primary' },
      { text: 'Курьер едет к вам', time: '12:15' },
      { text: 'Курьер едет по адресу: наб. Ломоносова, 78', time: '12:30' },
    ],
    isExpress: true,
    weight: 1
  },
  '0604092101': {
    id: '0604092101',
    date: '4 Сентября 2021',
    addresses: [
      { address: 'наб. Гагарина, 43' },
      { address: 'пр. Космонавтов, 60', name: 'Рожков Даниил', phone: '+7 (495) 254-91-01' }
    ],
    status: {
      status: 'done',
      bg: 'success',
      text: 'Доставлено',
    },
    price: {
      price: 1275,
      type: 'наличными'
    },
    history: [
      { text: 'Заявка принята', time: '12:00', variant: 'primary' },
      { text: 'Курьер едет к вам', time: '12:15' },
      { text: 'Курьер едет по адресу: наб. Ломоносова, 78', time: '12:30' },
      { text: 'Доставлено', time: '12:45', variant: 'success' },
    ],
    weight: 5,
    isSafe: true
  },
  '0601092101': {
    id: '0601092101',
    date: '1 Сентября 2021',
    addresses: [
      { address: 'пер. Ладыгина, 97' },
      { address: 'бульвар Домодедовская, 16', name: 'Семенова Дарья', phone: '+7 (495) 755-89-74' },
      { address: 'Солецкий район, 21', name: 'Быков Герман', phone: '+7 (495) 917-20-33' },
      { address: 'Хуторская ул., 12', name: 'Никонов Мирослав', phone: '+7 (495) 309-97-47' }
    ],
    status: {
      status: 'cancled',
      bg: 'danger',
      text: 'Отменено',
    },
    price: {
      price: 4350,
      type: 'картой'
    },
    history: [
      { text: 'Заявка принята', time: '12:00', variant: 'primary' },
      { text: 'Отмена заказа', time: '12:15', variant: 'danger' }
    ],
    isSafe: true,
    weight: 15
  },
  '0626082101': {
    id: '0626082101',
    date: '26 Августа 2021',
    addresses: [
      { address: 'Белоярский р-н, 63' },
      { address: 'Колпинский р-н, 22', name: 'Абрамова Дарья', phone: '+7 (495) 609-27-93' },
      { address: 'Сосновая, 19', name: 'Мартынова Арина', phone: '+7 (495) 231-26-73' }
    ],
    status: {
      status: 'done',
      bg: 'success',
      text: 'Доставлено',
    },
    price: {
      price: 3100,
      type: 'картой'
    },
    history: [
      { text: 'Заявка принята', time: '12:00', variant: 'primary' },
      { text: 'Курьер едет к вам', time: '12:15' },
      { text: 'Курьер едет по адресу: Колпинский р-н, 22', time: '12:30' },
      { text: 'Доставлено по адресу: Колпинский р-н, 22', time: '12:45', variant: 'success' },
      { text: 'Курьер едет по адресу: Сосновая, 19', time: '13:00' },
      { text: 'Доставлено по адресу: Сосновая, 19', time: '13:15', variant: 'success' },
    ],
    weight: 10,
    isSafe: true
  }
}

export const formatWord = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}