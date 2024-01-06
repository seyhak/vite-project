import { describe, it, beforeEach, expect, vi } from "vitest"

import { useRewardsPage } from "./useRewardsPage"
import { renderHook } from "@testing-library/react"

const mockData = {
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
}
const mockUseUser = vi.fn()
const mockNavigate = vi.fn()
const mockUseFetch = vi.fn()
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock("@hooks/useUser", () => ({
  useUser: () => mockUseUser()
}))

vi.mock("@hooks/useFetch", () => ({
  useFetch: () => mockUseFetch()
}))

const mockProcessedRewards = vi.fn()
vi.mock("@src/utils/transactions-to-rewards-processor", () => ({
  processTransactionsIntoRewards: () => mockProcessedRewards(),
}))

describe("useRewardsPage", () => {
  beforeEach(()=> {
    vi.clearAllMocks()
    mockUseFetch.mockReturnValue({
      data: {},
      loading: false,
      error: null,
      refetch: vi.fn(),
    })
    mockUseUser.mockReturnValue({ name: "Me" })
    mockProcessedRewards.mockReturnValue(mockData)
  })
  describe("total", () => {
    it("counts total properly", () => {
      const { result } = renderHook(() => useRewardsPage())
      expect(result.current.rewards).toEqual(mockData)
      expect(result.current.total).toEqual(960)
    })
  })
  describe("rewards", () => {
    it("calls data processor if has data", () => {
      const { result } = renderHook(() => useRewardsPage())
      expect(mockProcessedRewards).toBeCalled()
      expect(result.current.rewards).toEqual(mockData)
    })
    it("returns null if has no data", () => {
      mockUseFetch.mockReturnValue({
        data: undefined,
        loading: false,
        error: null,
        refetch: vi.fn(),
      })
      const { result } = renderHook(() => useRewardsPage())
      expect(mockProcessedRewards).not.toBeCalled()
      expect(result.current.rewards).toBeNull()
    })
  })
  it("should redirect to login if no user", async () => {
    const { result } = renderHook(() => useRewardsPage())

    expect(result.current.loading).toBeFalsy()
    expect(result.current.error).toBe(null)
    expect(mockNavigate).toHaveBeenCalledWith("/login")
  })

  it("should fetch rewards when user is present", async () => {
    const { result } = renderHook(() => useRewardsPage())

    expect(result.current.loading).toBeFalsy()
    expect(result.current.error).toBeNull()
  })

})
