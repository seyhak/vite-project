import { useCallback, useEffect } from "react"
import { useFetch } from "@hooks/useFetch"
import { LOGIN_URL } from "@constants/routes"
import { useUser } from "@hooks/useUser"
import { useNavigate } from "react-router-dom"
import { PAGE_ROUTES } from "../../constants/routes"

export const useLoginPage = () => {
  const {loginUser} = useUser()
  const navigate = useNavigate()
  const { data: loginData, loading, error, refetch: login } = useFetch(LOGIN_URL, true)
  const handleFormSubmit = useCallback(async () => {
    await login()
  }, [login])

  useEffect(() => {
    if(loginData) {
      loginUser(loginData)
      navigate(PAGE_ROUTES.REWARDS)
    }
  }, [loginData, loginUser, navigate])

  return {
    handleFormSubmit,
    loading,
    error
  }
}
