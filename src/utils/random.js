export function getRandomNumber(maxLength = 1) {
  return parseInt(
    parseFloat(Math.random().toFixed(maxLength)) * Math.pow(10, maxLength) + 1
  )
}

export function getRandomDateWithinThreeMonths() {
  const now = new Date()
  const randomDate = new Date(
    2024,
    Math.floor(Math.random() * 3),
    Math.floor(Math.random() * 28) + 1,
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    Math.floor(Math.random() * 1000)
  )

  return randomDate.toISOString()
}
