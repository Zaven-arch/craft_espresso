export const generateOrder = () => {
  // Generate a random letter from A to Z
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomLetter = letters[Math.floor(Math.random() * letters.length)]

  // Generate a random number from 10 to 99
  const randomNumber = Math.floor(Math.random() * 90) + 10

  // Combine the letter and number
  return `${randomLetter}${randomNumber}`
}
