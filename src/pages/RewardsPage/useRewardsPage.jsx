import { useCallback, useEffect, useMemo } from "react"
import { useUser } from "@hooks/useUser"
import { useNavigate } from "react-router-dom"
import { PAGE_ROUTES } from "@constants/routes"
import { useFetch } from "@hooks/useFetch"
import { TRANSACTIONS_GET_URL } from "@constants/routes"
import { processTransactionsIntoRewards } from "@src/utils/transactions-to-rewards-processor"
import "./RewardsPage.sass"

export const useRewardsPage = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const {
    data,
    loading,
    error,
    refetch: getRewards,
  } = useFetch(TRANSACTIONS_GET_URL, true)

  const handleGetRewards = useCallback(async () => {
    await getRewards()
  }, [getRewards])

  useEffect(() => {
    if (!user) {
      navigate(PAGE_ROUTES.LOGIN)
    } else {
      handleGetRewards()
    }
  }, [user, handleGetRewards, navigate])

  const rewards = useMemo(() => {
    return data ? processTransactionsIntoRewards(data) : null
  }, [data])

  const total = useMemo(() => {
    return rewards
      ? Object.values(rewards).reduce((acc, curr) => {
          return acc + curr.rewardsSum
        }, 0)
      : 0
  }, [rewards])

  return { user, loading, rewards: rewards, error, total }
}
