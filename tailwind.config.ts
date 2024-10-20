import type { Config } from 'tailwindcss'

import { $getColor } from './utils'

import { Colors } from './enums'

export default <Partial<Config>>{
  theme: {
    screens: {
      xs: { max: '600px' },
      sm: '600px',
      md: '960px',
      lg: '1264px',
      xl: '1904px',
    },
    extend: {
      boxShadow: {
        'products-inset': 'inset 0px 2px 500px 3px rgba(0, 0, 0, 1)',
        'title-inset': 'inset 0px 2px 42px -10px rgba(0, 0, 0, 1)',
      },
      colors: Object.fromEntries(
        Object.values(Colors).map((color: Colors) => [
          `app-${color}`,
          $getColor(color),
        ]),
      ),
    },
  },
  safelist: Object.values(Colors)
    .map((color: Colors) => [
      `tw-text-app-${color}`,
      `tw-bg-app-${color}`,
      `tw-border-app-${color}`,
      `hover:tw-text-app-${color}`,
      `hover:tw-border-app-${color}`,
      `hover:tw-bg-app-${color}`,
      `sm:hover:tw-text-app-${color}`,
      `sm:hover:tw-bg-app-${color}`,
      `!tw-text-app-${color}`,
      `!tw-bg-app-${color}`,
      `!tw-border-app-${color}`,
      `hover:!tw-text-app-${color}`,
      `hover:!tw-border-app-${color}`,
      `hover:!tw-bg-app-${color}`,
      `group-hover:!tw-text-app-${color}`,
      `group-hover:!tw-border-app-${color}`,
      `group-hover:!tw-bg-app-${color}`,
      `group-hover:tw-text-app-${color}`,
      `group-hover:tw-border-app-${color}`,
      `group-hover:tw-bg-app-${color}`,
    ])
    .flat(1),
  prefix: 'tw-',
}
