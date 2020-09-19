export let single = [
    {
      name: 'Alimentação',
      value: 500
    },
    {
      name: 'Educação',
      value: 1000
    },
    {
      name: 'Transporte',
      value: 120
    },
    {
      name: 'Lazer',
      value: 800
    }
  ];

export let multi: any = [
    {
        name: '1º Semestre',
        series: [
            {
                name: '2019',
                value: 53000
            },
            {
                name: '2020',
                value: 60500
            }
        ]
    },

    {
        name: '2º Semestre',
        series: [
            {
                name: '2019',
                value: 43000
            },
            {
                name: '2020',
                value: 67000
            }
        ]
    },
];

export let times: any = [
    {
        name: 'Receitas',
        series: [
            {
                value: 2,
                name: '01/07/2020',
            },
            {
                value: 19,
                name: '01/14/2020',
            },
            {
                value: 33,
                name: '01/21/2020',
            },
            {
                value: 89,
                name: '01/28/2020',
            },
        ]
    },
    {
        name: 'Despesas',
        series: [
            {
                value: 43,
                name: '01/07/2020',
            },
            {
                value: 67,
                name: '01/14/2020',
            },
            {
                value: 100,
                name: '01/21/2020',
            },
            {
                value: 22,
                name: '01/28/2020',
            },
        ]
    },
    {
        name: 'Diferença',
        series: [
            {
                value: 87,
                name: '01/07/2020',
            },
            {
                value: 45,
                name: '01/14/2020',
            },
            {
                value: 25,
                name: '01/21/2020',
            },
            {
                value: 83,
                name: '01/28/2020',
            },
        ]
    },
];

export let limit = [
    {
        category: 'Lazer',
        status: 'Ultrapassando o limite!',
        icon: 'sentiment_very_dissatisfied',
        color: '#4DD0E1',
        max: 100,
        limit: 80,
        value: 90
    },
    {
        category: 'Educação',
        status: 'Quase lá!',
        icon: 'sentiment_satisfied',
        color: '#BA68C8',
        max: 100,
        limit: 80,
        value: 70
    },
    {
        category: 'Alimentação',
        status: 'Longe do Limite!',
        icon: 'mood',
        color: '#FF7043',
        max: 100,
        limit: 50,
        value: 10
    },
];
