import { describe, it, beforeEach, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { RewardsPage } from "./RewardsPage"

const mockData = {
  January: {
    transactions: [
      { date: new Date("2013-01-05T23:00:00.000Z"), value: 209.0, rewards: 268 },
      { date: new Date("2013-01-04T23:00:00.000Z"), value: 152.01, rewards: 154 },
      { date: new Date("2013-01-01T23:00:00.000Z"), value: 52.02, rewards: 2 },
    ],
    rewardsSum: 424,
  },
  December: {
    transactions: [
      { date: new Date("2012-12-29T23:00:00.000Z"), value: 23.12, rewards: 0 },
      { date: new Date("2012-12-20T23:00:00.000Z"), value: 90.12, rewards: 40 },
      { date: new Date("2012-12-19T23:00:00.000Z"), value: 21.52, rewards: 0 },
      { date: new Date("2012-12-11T23:00:00.000Z"), value: 223.12, rewards: 296 },
    ],
    rewardsSum: 336,
  },
  November: {
    transactions: [
      { date: new Date("2012-11-28T23:00:00.000Z"), value: 150.12, rewards: 150 },
      { date: new Date("2012-11-19T23:00:00.000Z"), value: 100.02, rewards: 50 },
    ],
    rewardsSum: 200,
  },
}

const mockUseRewardsPage = vi.fn()
vi.mock("./useRewardsPage", () => ({
  useRewardsPage: () => mockUseRewardsPage(),
}))

describe("RewardsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseRewardsPage.mockReturnValue({
      user: { name: "John" },
      loading: false,
      rewards: mockData,
      total: 960,
    })
  })
  it("renders loader when loading is true", () => {
    mockUseRewardsPage.mockReturnValue({
      user: { name: "John" },
      loading: true,
      rewards: null,
      total: 0,
    })

    const {unmount, container} = render(<RewardsPage />)

    expect(container).toMatchSnapshot()
    unmount()
  })
  it("renders and match snapshot", () => {
    const {unmount, container} = render(<RewardsPage />)

    expect(container).toMatchSnapshot()
    unmount()
  })
  it("renders user name when user is present", () => {
    const {unmount} = render(<RewardsPage />)

    expect(screen.getByText("Welcome John!")).toBeTruthy()
    unmount()
  })
  it("renders total points", () => {
    const {unmount} = render(<RewardsPage />)

    expect(screen.getByText("Total points: 960")).toBeTruthy()
    unmount()
  })
})
