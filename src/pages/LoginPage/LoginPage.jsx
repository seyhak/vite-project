import useForm from "@hooks/useForm"
import { Button } from "@components/Button/Button"
import { Input } from "@components/Input/Input"
import { Loader } from "@components/Loader/Loader"
import { useLoginPage } from "./useLoginPage"
import "./LoginPage.sass"


export const LoginPage = () => {
  const { loading, handleFormSubmit } = useLoginPage()
  const { formData, handleChange, handleSubmit } = useForm({
    username: "",
    password: "",
  })

  return (
    <div className="LoginPage">
      {loading ? <Loader /> :
      <>
        <h1 className="emoji">😎</h1>
        <h4>Please Log In</h4>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="inputs">
          <Input
            label="Username:"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
          />
          </div>

          <div className="controllers">
          <Button type="submit">Submit</Button>
          </div>
      </form>
    </>}
    </div>
  )
}
