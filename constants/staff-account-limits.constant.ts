import { NavigationDrawerRoute, UserRole } from '../enums'

export const staffAccountLimits: any = {
  [UserRole.STAFF]: {
    SIDEBAR: [NavigationDrawerRoute.MANAGEMENT],
    URLS: ['settings/staff', 'management'],
    // RE_WRITE_URL: {
    //   payments: 'payments/nonprofits',
    // },
  },
}
