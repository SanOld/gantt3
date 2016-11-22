var project4 = {
    data:[
        {id:1, text:"Проект",      start_date:"13-11-2016", duration:11, progress: 0.6, open: true, type: "task"},
        {id:2, text:"Задача #1",   start_date:"15-11-2016", duration:5, progress: 1,   open: true,  type: "task", parent:1},
        {id:3, text:"Задача #2",   start_date:"14-11-2016", duration:7, progress: 0.5, open: true,  type: "task", parent:1},
        {id:4, text:"Задача #2.1", start_date:"15-11-2016", duration:2, progress: 1,   open: true,  type: "task", parent:3},
        {id:5, text:"Задача #2.2", start_date:"16-11-2016", duration:3, progress: 0.8, open: true,  type: "task", parent:3},
        {id:6, text:"Задача #2.3", start_date:"17-11-2016", duration:15, progress: 0.2, open: true,  type: "task", parent:3},
        
        {id: 101, text:"Кирпич1",       start_date:"13-11-2016", duration:1, amount:61.00,  unit:"шт",    type: "resource", parent: 1},
        {id: 102, text:"Кирпич2",       start_date:"15-11-2016", duration:1, amount:150.00, unit:"шт",    type: "resource", parent: 2},
        {id: 103, text:"Гипсокартон1",  start_date:"15-11-2016", duration:1, amount:35.00,  unit:"лист",  type: "resource", parent: 4},
        {id: 104, text:"Кирпич3",       start_date:"14-11-2016", duration:1, amount:200.00, unit:"шт",    type: "resource", parent: 3}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:1, target:3, type:"1"},
        {id:3, source:3, target:4, type:"1"},
        {id:4, source:4, target:5, type:"0"},
        {id:5, source:5, target:6, type:"0"}
    ]
};

var project5 = {
   "data":[
      {
         "id":"1",
         "start_date":"2013-04-01 00:00:00",
         "duration":"5",
         "text":"Project #1",
         "progress":"0.8",
         "parent":"0",
         "deadline":"2013-04-09 00:00:00",
         "planned_start":"2013-04-01 00:00:00",
         "planned_end":"2013-04-07 00:00:00",
         "open":1
      },
      {
         "id":"2",
         "start_date":"2013-04-06 00:00:00",
         "duration":"4",
         "text":"Task #1",
         "progress":"0.5",
         "parent":"1",
         "deadline":"2013-04-11 00:00:00",
         "planned_start":"2013-04-06 00:00:00",
         "planned_end":"2013-04-10 00:00:00",
         "open":1
      },
      {
         "id":"3",
         "start_date":"2013-04-05 00:00:00",
         "duration":"6",
         "text":"Task #2",
         "progress":"0.7",
         "parent":"1",
         "deadline":"2013-04-10 00:00:00",
         "planned_start":"2013-04-05 00:00:00",
         "planned_end":"2013-04-14 00:00:00",
         "open":1
      },
      {
         "id":"4",
         "start_date":"2013-04-07 00:00:00",
         "duration":"2",
         "text":"Task #3",
         "progress":"0",
         "parent":"1",
         "deadline":"2013-04-17 00:00:00",
         "planned_start":"2013-04-03 00:00:00",
         "planned_end":"2013-04-05 00:00:00",
         "open":1
      },
      {
         "id":"5",
         "start_date":"2013-04-05 00:00:00",
         "duration":"5",
         "text":"Task #1.1",
         "progress":"0.34",
         "parent":"2",
         "deadline":"2013-04-10 00:00:00",
         "planned_start":"2013-04-03 00:00:00",
         "planned_end":"2013-04-08 00:00:00",
         "open":1
      }
   ],
   "collections":{
      "links":[
         {
            "id":"1",
            "source":"1",
            "target":"2",
            "type":"0"
         },
         {
            "id":"2",
            "source":"1",
            "target":"3",
            "type":"0"
         },
         {
            "id":"3",
            "source":"1",
            "target":"4",
            "type":"0"
         },
         {
            "id":"4",
            "source":"2",
            "target":"6",
            "type":"0"
         }
      ]
   }
};
var project6 = {
   "data":[
      {
         "id":"1",
         "start_date":"2013-04-01 00:00:00",
         "duration":"5",
         "text":"Project #1",
         "progress":"0.8",
         "parent":"0",
         "deadline":"2013-04-09 00:00:00",
         "planned_start":"2013-04-01 00:00:00",
         "planned_end":"2013-04-07 00:00:00",
         "open":1
      }
    ]
  }
var project1 = {

  data: [
    {
      "id": 1,
      "text": "Проект",
      "name": "Проект 1",
      "start_date": "16.11.2016",
      "duration": 1,
      "progress": 1,
      "open": true,
      "type": "task"
    },
    {
      "id": 2,
      "text": "Смета",
      "name": "Смета 1",
      "start_date": "16.11.2016",
      "duration": 1,
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 1
    },
    {
      "id": 3,
      "text": "Система утеплення  Ceresit Ceretherm Premium\t",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 4,
      "text": "Система утепления Ceresit Ceretherm Express",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 5,
      "text": "Внутренняя отделка",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 6,
      "text": "Монолитные стены",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 7,
      "text": "Бетон",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.00",
      "unit": "м3",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 6
    },
    {
      "id": 8,
      "text": "Внутренняя отделка под облицовку",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 9,
      "text": "установка плинтуса",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 10,
      "text": "Монолитные стены",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 11,
      "text": "Бетон",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.00",
      "unit": "м3",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 10
    },
    {
      "id": 12,
      "text": "Внутренняя отделка",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 13,
      "text": "Внутренняя отделка",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 14,
      "text": "Шпаклевка минеральная стартовая Ceresit CT 29",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "3.60",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 13
    },
    {
      "id": 15,
      "text": "Акриловая шпаклевка для внутренних работ Ceresit СТ95 (0,07) ",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.70",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 13
    },
    {
      "id": 16,
      "text": "Грунтовка Ceresit CT 17",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.15",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 13
    },
    {
      "id": 17,
      "text": "Декоративная отделка - акриловая краска Ceresit CT50 ",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.30",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 13
    },
    {
      "id": 18,
      "text": "Внутренняя отделка газобетон",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 19,
      "text": "Грунтовка Ceresit CT 17 супер",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.15",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 18
    },
    {
      "id": 20,
      "text": "Штукатурка выравнивающая для оснований из ячеистых бетонных блоков Ceresit CT 24",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "3.90",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 18
    },
    {
      "id": 21,
      "text": "Грунтовка Ceresit CT 17",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.15",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 18
    },
    {
      "id": 22,
      "text": "Декоративная отделка - акриловая краска Ceresit CT50 ",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.30",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 18
    },
    {
      "id": 23,
      "text": "Декоративная отделка - структурная акриловая краска Ceresit CT53 ",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.50",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 18
    },
    {
      "id": 24,
      "text": "Акриловая шпаклевка для внутренних работ",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.70",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 18
    },
    {
      "id": 25,
      "text": "Внутренняя отделка",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 26,
      "text": "Внутренняя отделка под облицовку",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 27,
      "text": "Выравнивающие массы",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 28,
      "text": "КНАУФ Нивелирэстрих 425",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.80",
      "unit": "",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 27
    },
    {
      "id": 29,
      "text": "КНАУФ Нивелиршпахтель 415",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.60",
      "unit": "",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 27
    },
    {
      "id": 30,
      "text": "КНАУФ Faserflex 15",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.50",
      "unit": "",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 27
    },
    {
      "id": 31,
      "text": "1.12 Снятие штукатурки со стен",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 32,
      "text": "Мешки строительные",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.50",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 31
    },
    {
      "id": 33,
      "text": "Распираторы",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.04",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 31
    },
    {
      "id": 34,
      "text": "Веник",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.02",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 31
    },
    {
      "id": 35,
      "text": "Перчатки строительные",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.04",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 31
    },
    {
      "id": 36,
      "text": "Лампочки 200 Вт.",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.04",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 31
    },
    {
      "id": 37,
      "text": "Лопатка совковая",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.02",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 31
    },
    {
      "id": 38,
      "text": "1.12 Снятие штукатурки со стен",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 39,
      "text": "Мешки строительные",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.50",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 38
    },
    {
      "id": 40,
      "text": "Распираторы",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.04",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 38
    },
    {
      "id": 41,
      "text": "Веник",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.02",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 38
    },
    {
      "id": 42,
      "text": "Перчатки строительные",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.04",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 38
    },
    {
      "id": 43,
      "text": "Лампочки 200 Вт.",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.04",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 38
    },
    {
      "id": 44,
      "text": "Лопатка совковая",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.02",
      "unit": "м2",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 38
    },
    {
      "id": 45,
      "text": "Коробка здания",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 46,
      "text": "Кирпич",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 45
    },
    {
      "id": 47,
      "text": "авав",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 45
    },
    {
      "id": 48,
      "text": "Коробка здания",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 49,
      "text": "Кирпич",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 48
    },
    {
      "id": 50,
      "text": "авав",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 48
    },
    {
      "id": 51,
      "text": "Коробка здания",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 52,
      "text": "Кирпич",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 51
    },
    {
      "id": 53,
      "text": "авав",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 51
    },
    {
      "id": 54,
      "text": "Коробка здания",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 55,
      "text": "Кирпич",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 54
    },
    {
      "id": 56,
      "text": "авав",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 54
    },
    {
      "id": 57,
      "text": "Коробка здания",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 58,
      "text": "Кирпич",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 57
    },
    {
      "id": 59,
      "text": "авав",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "0.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 57
    },
    {
      "id": 60,
      "text": "Коробка здания",
      "start_date": "16.11.2016",
      "duration":"1.00",
      "progress": 1,
      "open": true,
      "type": "task",
      "parent": 2
    },
    {
      "id": 61,
      "text": "Кирпич",
      "start_date": "16.11.2016",
      "duration": 1,
      "amount": "1.00",
      "unit": "м",
      "progress": 1,
      "open": true,
      "type": "resource",
      "parent": 60
    }
  ],
  links: []
}


var project3 = {
  data: [
    {
      "id": 1,
      "text": "Проект",
      "name": "Проект 1",
      "start_date": "13-11-2016",
      "duration": 0.1,
      "progress": 1,
      "open": true,
      "type": "task"
    },
    {
      "id": 2,
      "text": "Про",
      "name": "Проект",
      "start_date": "14-11-2016",
      "duration": 0,
      "progress": 0,
      "open": true,
      "type": "task"
    }
  ]
  }  


