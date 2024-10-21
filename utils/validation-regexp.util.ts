export class ValidationRegexp {
  static LENGTH_10 = 10

  static LENGTH_20 = 20

  static LENGTH_40 = 40

  static LENGTH_50 = 50

  static LENGTH_80 = 80

  static LENGTH_240 = 240

  static PASSWORD_MIN_LENGTH = 6

  static PASSWORD_MAX_LENGTH = 99

  static PASSWORD_SYMBOL(value: string) {
    return /[$^*.{}()?"!@#%&/\\,><':;|_~`=+-]/gi.test(value)
  }

  static PASSWORD_NUMERIC(value: string) {
    return /\d/gi.test(value)
  }
}
