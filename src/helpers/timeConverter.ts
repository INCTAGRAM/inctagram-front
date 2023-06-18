export const timeConverter = {
  secondsFromDays(quantity: number) {
    return quantity * (60 * 60 * 24)
  },
  secondsFromHours(quantity: number) {
    return quantity * (60 * 60)
  },
  secondsFromMinutes(quantity: number) {
    return quantity * 60
  },
}
