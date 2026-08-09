export type ViSlide = {
  id: number
  color: string
  title: string
  titleLines: string[]
  caption: string
  images: string[]
}

const img = (name: string) => `/videinfra/images/${name}`

export const VI_COLORS = {
  clear: '#9b89c9',
  black: '#0b0b0f',
  white: '#ffffff',
} as const

export const viSlides: ViSlide[] = [
  {
    id: 1,
    color: '#8a80a6',
    title: 'Automated Expense Management',
    titleLines: ['Automated', 'Expense', 'Management'],
    caption:
      'AI simplifies finance management, enhancing banking UX with automated support for wise spending and effective saving in-app.',
    images: [
      img('slider-1-1@xxl.webp'),
      img('slider-1-2@xxl.webp'),
      img('slider-1-3@xxl.webp'),
    ],
  },
  {
    id: 2,
    color: '#998ca2',
    title: 'Seamless Payment Experience',
    titleLines: ['Seamless', 'Payment', 'Experience'],
    caption:
      'In addition to providing financial guidance, the AI simplifies the payment process, making it as seamless as possible.',
    images: [img('slider-2-1@xxl.webp')],
  },
  {
    id: 3,
    color: '#9694a2',
    title: 'AI-Enhanced Cost-Efficient Shopping',
    titleLines: ['AI-Enhanced', 'Cost-Efficient', 'Shopping'],
    caption:
      'AI algorithms monitor real-time prices and analyze purchasing data, informing users about cost-effective deals.',
    images: [
      img('slider-3-1@xxl.webp'),
      img('slider-3-2@xxl.webp'),
      img('slider-3-3@xxl.webp'),
    ],
  },
  {
    id: 4,
    color: '#828ca9',
    title: 'Health and Lifestyle',
    titleLines: ['Health', 'and Lifestyle'],
    caption:
      'AI can analyze user behavior, such as travel bookings, significant purchases, or changes in family size, to proactively suggest insurance plans.',
    images: [img('slider-4-1@xxl.webp')],
  },
  {
    id: 5,
    color: '#937aab',
    title: 'Family Financial Management',
    titleLines: ['Family Financial', 'Management'],
    caption:
      'Family Financial Management includes AI-powered features aimed at automating and optimizing the financial responsibilities of family life.',
    images: [img('slider-5-1@xxl.webp')],
  },
  {
    id: 6,
    color: '#9c6ca7',
    title: 'Localized Cost-of-Living Calculators',
    titleLines: ['Localized', 'Cost-of-Living', 'Calculators'],
    caption:
      'Localized Cost-of-Living Calculators feature AI-powered tools that offer localized budget suggestions tailored to the cost of living in specific regions or cities.',
    images: [
      img('slider-6-1@xxl.webp'),
      img('slider-6-2@xxl.webp'),
      img('slider-6-3@xxl.webp'),
    ],
  },
  {
    id: 7,
    color: '#4a8e67',
    title: 'Seamless Integration with IoT Devices',
    titleLines: ['Seamless', 'Integration with', 'IoT Devices'],
    caption:
      'AI bridges the gap by integrating with connected devices, offering real-time financial guidance in the app.',
    images: [img('slider-7-1@xxl.webp')],
  },
  {
    id: 8,
    color: '#5e8fbc',
    title: 'Debt Management and Loan Options',
    titleLines: ['Debt Management', 'and Loan Options'],
    caption:
      'AI in banking apps assesses debt, forecasts the impact on credit scores, suggests tailored loans for future needs.',
    images: [
      img('slider-8-1@xxl.webp'),
      img('slider-8-2@xxl.webp'),
      img('slider-8-3@xxl.webp'),
    ],
  },
  {
    id: 9,
    color: '#6583bd',
    title: 'Fully Personalized Financial Strategies',
    titleLines: ['Fully Personalized', 'Financial Strategies'],
    caption:
      "The AI simplifies investment by offering personalized strategies tailored to each user's unique profile.",
    images: [img('slider-9-1@xxl.webp'), img('slider-9-2@xxl.webp')],
  },
  {
    id: 10,
    color: '#a47cbb',
    title: 'Real-time Investment Updates',
    titleLines: ['Real-time', 'Investment', 'Updates'],
    caption:
      'AI monitors investments and offers personalized real-time recommendations in one banking app, adapting to market changes.',
    images: [img('slider-10-1@xxl.webp')],
  },
]

/** Intro + 10 feature slides */
export const VI_SEGMENT_COUNT = viSlides.length + 1
