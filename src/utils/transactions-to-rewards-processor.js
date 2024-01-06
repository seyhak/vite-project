class RewardsForAbove100Strategy {
  static multiplier = 2
  static limit = 100

  static getRewards(value){
    const valuesAboveLimit = value - this.limit
    return valuesAboveLimit > 0 ? parseInt(valuesAboveLimit) * this.multiplier : 0
  }
}

class RewardsForBetween50And100Strategy {
  static minLimitForRewards = 50
  static maxLimitForRewards = 100
  static multiplier = 1

  static getRewards(value){
    if (value <= this.minLimitForRewards) return 0
    const maxValueForRewards = this.maxLimitForRewards - this.minLimitForRewards
    const valueForReward = value > this.maxLimitForRewards ? maxValueForRewards : value - this.minLimitForRewards
    const parsedValueForReward = parseInt(valueForReward)
    return parsedValueForReward > 0 ? parsedValueForReward * this.multiplier : 0
  }
}

class TransactionToRewardCounter {
  static rules = [
    RewardsForAbove100Strategy,
    RewardsForBetween50And100Strategy,
  ]
  constructor(transaction) {
    this.transaction = transaction
  }

  getRewards(){
    const rewards = TransactionToRewardCounter.rules.map(
      rule => rule.getRewards(this.transaction.value)
    ).reduce((acc, curr) => (
      acc + curr
    ), 0)
    return rewards
  }
}

const getMonthName = (date) => (
  date.toLocaleString("en-EN", { month: "long" })
)

const getGroupedTransactionsByMonth = (transactions) => {
  transactions.sort((a, b) => b.date - a.date)
  const latestTransaction = new Date(transactions[0].date)

  const keys = Array.from({length: 3}, () => {
    const currentMonth = latestTransaction.getMonth()
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1

    const key = getMonthName(latestTransaction)
    latestTransaction.setMonth(previousMonth)
    return key
  })

  const groupedTransactions = Object.fromEntries(keys.map(k => [k, []]))
  transactions.forEach(transaction => {
    const key = getMonthName(transaction.date)
    const current = groupedTransactions[key]
    groupedTransactions[key] = [...current, transaction]
  })
  return groupedTransactions
}

const getTransactionsWithRewards = (transactions) => {
  return transactions.map(t => {
    const counter = new TransactionToRewardCounter(t)
    return {
      ...t,
      rewards: counter.getRewards()
    }
  })
}

const getTransactionsWithDates = (transactions) => {
  return transactions.map(transaction => {
    return ({
      ...transaction,
      date: new Date(transaction.date)
    })
  })
}

const getGroupedTransactionsWithMonthSums = (transactions) => {
  const transactionsWithSums = {}
  Object.entries(transactions).forEach(([key, values]) => {
    transactionsWithSums[key] = {
      transactions: values,
      rewardsSum: values.reduce((acc, curr) => {
        return acc + curr.rewards
      }, 0)
    }
  })
  return transactionsWithSums
}

export const processTransactionsIntoRewards = (transactions) => {
  let processedTransactions = getTransactionsWithDates(transactions)
  processedTransactions = getTransactionsWithRewards(processedTransactions)
  processedTransactions = getGroupedTransactionsByMonth(processedTransactions)
  processedTransactions = getGroupedTransactionsWithMonthSums(processedTransactions)
  return processedTransactions
}
