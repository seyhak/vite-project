import ReactDOM from "react-dom/client"
import "./index.sass"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { RewardsPage } from "./pages/RewardsPage/RewardsPage"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import {ErrorPage} from "./pages/ErrorPage/ErrorPage"
import { UserProvider } from "./contexts/UserContext"
import { PAGE_ROUTES } from "./constants/routes"

const router = createBrowserRouter([
  {
    path: PAGE_ROUTES.REWARDS,
    element: <RewardsPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: PAGE_ROUTES.LOGIN,
    element: <LoginPage/>,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
)
