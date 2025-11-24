import { Route, Routes } from "react-router-dom"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainSignup from "./pages/CaptainSignup"
import CaptainLogin from "./pages/CaptainLogin"
import Start from "./pages/Start"
import Home from "./pages/Home"
import UserProtected from "./pages/UserProtected"
import UserLogout from "./pages/UserLogout"
import CaptainHome from "./pages/CaptainHome"
import CaptainProtected from "./pages/CaptainProtected"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/home" element={<UserProtected> <Home /> </UserProtected>} />
        <Route path="/user/logout" element={<UserProtected> <UserLogout /> </UserProtected>} />
        <Route path="/captain-home" element={<CaptainProtected> <CaptainHome /></CaptainProtected>} />

      </Routes>
    </div>
  )
}

export default App
