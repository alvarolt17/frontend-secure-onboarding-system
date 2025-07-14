import CreatePasswordPage from "./pages/CreatePasswordPage"
import NameInputPage from "./pages/nameInputPage"
import PhoneInputPage from "./pages/phoneInputPage"
import EmailInputPage from "./pages/emailInputPage"
import EKTPVerificationPage from "./pages/eKTPVerificationPage"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/name" element={<NameInputPage/>}/>
      <Route path="/phone" element={<PhoneInputPage/>}/>
      <Route path="/email" element={<EmailInputPage/>}/>
      <Route path="/password" element={<CreatePasswordPage/>}/>
      <Route path="/KTP" element={<EKTPVerificationPage/>}/>
    </Routes>
  )
}

export default App
