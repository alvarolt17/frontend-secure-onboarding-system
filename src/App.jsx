import CreatePasswordPage from "./pages/CreatePasswordPage"
import NameInputPage from "./pages/nameInputPage"
import PhoneInputPage from "./pages/phoneInputPage"
import EmailInputPage from "./pages/emailInputPage"
import EKTPVerificationPage from "./pages/eKTPVerificationPage"
import Home from "./pages/Home"
import JenisTabunganPage from "./pages/JenisTabunganPage"
import { Routes, Route } from "react-router-dom"
import TermsCondition from "./pages/termsCondition"
import Undang from "./pages/undang"
import WondrLanding from "./pages/WondrLanding"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/name" element={<NameInputPage/>}/>
      <Route path="/phone" element={<PhoneInputPage/>}/>
      <Route path="/email" element={<EmailInputPage/>}/>
      <Route path="/password" element={<CreatePasswordPage/>}/>
      <Route path="/KTP" element={<EKTPVerificationPage/>}/>
      <Route path="/tabungan" element={<JenisTabunganPage/>}/>
      <Route path="/terms" element ={<TermsCondition/>}/>
      <Route path="/undang" element={<Undang/>} />
      <Route path="/wondrLanding" element={<WondrLanding/>} />
    </Routes>
  )
}

export default App
