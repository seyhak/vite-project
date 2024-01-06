import { useState } from "react"

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (callback) => (e) => {
    e.preventDefault()
    callback(formData)
  }

  const resetForm = () => {
    setFormData(initialState)
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    resetForm,
  }
}

export default useForm
