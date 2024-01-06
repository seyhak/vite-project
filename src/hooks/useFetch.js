import { useState, useEffect, useCallback } from "react"
import { TRANSACTIONS_GET_URL, LOGIN_URL, LOGOUT_URL } from "@constants/routes"
import { getRandomNumber } from "../utils/random"
import { transactionFactory, userFactory } from "../utils/factories"

const fetchData = async (url) => {
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      switch(url) {
        case TRANSACTIONS_GET_URL: {
          const transactionsCount = getRandomNumber(2)
          const transactions = Array.from({ length: transactionsCount }, () => transactionFactory())
          resolve(transactions)
          break
        }
        case LOGIN_URL:
          resolve(userFactory())
          break
        case LOGOUT_URL:
          resolve(null)
          break
        default: {
          reject(null)
        }
      }
    }, 1500)
  })
  return result
}

export const useFetch = (url, lazy = false) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDataAndSetState = useCallback(async () => {
    try {
      setLoading(true)
      const result = await fetchData(url)
      setData(result)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
      setError(error)
    }
  }, [url])

  useEffect(() => {
    if (!lazy) {
      fetchDataAndSetState()
    }
  }, [url, lazy, fetchDataAndSetState])

  return { data, loading, error, refetch: fetchDataAndSetState }
}
