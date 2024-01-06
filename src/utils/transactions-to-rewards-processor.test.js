import { describe, it, beforeEach, expect } from "vitest"
import { processTransactionsIntoRewards } from "./transactions-to-rewards-processor"

describe("processTransactionsIntoRewards", () => {
  let transactions = null

  beforeEach(() => {
    transactions = [
      { date: new Date(2012, 10, 20), value: 100.02 },
      { date: new Date(2012, 11, 21), value: 90.12 },
      { date: new Date(2012, 10, 29), value: 150.12 },
      { date: new Date(2012, 11, 12), value: 223.12 },
      { date: new Date(2013, 0, 6), value: 209.0 },
      { date: new Date(2013, 0, 5), value: 152.01 },
      { date: new Date(2012, 11, 30), value: 23.12 },
      { date: new Date(2012, 11, 21), value: 21.52 },
      { date: new Date(2013, 0, 2), value: 52.02 },
    ]
  })
  it("should return properly processed values", () => {
    const result = processTransactionsIntoRewards(transactions)
    expect(JSON.parse(JSON.stringify(result))).toEqual({
      January: {
        transactions: [
          { date: "2013-01-05T23:00:00.000Z", value: 209.0, rewards: 268 },
          { date: "2013-01-04T23:00:00.000Z", value: 152.01, rewards: 154 },
          { date: "2013-01-01T23:00:00.000Z", value: 52.02, rewards: 2 },
        ],
        rewardsSum: 424,
      },
      December: {
        transactions: [
          { date: "2012-12-29T23:00:00.000Z", value: 23.12, rewards: 0 },
          { date: "2012-12-20T23:00:00.000Z", value: 90.12, rewards: 40 },
          { date: "2012-12-20T23:00:00.000Z", value: 21.52, rewards: 0 },
          { date: "2012-12-11T23:00:00.000Z", value: 223.12, rewards: 296 },
        ],
        rewardsSum: 336,
      },
      November: {
        transactions: [
          { date: "2012-11-28T23:00:00.000Z", value: 150.12, rewards: 150 },
          { date: "2012-11-19T23:00:00.000Z", value: 100.02, rewards: 50 },
        ],
        rewardsSum: 200,
      },
    })
  })
})
