
import {BrowserRouter, Routes, Route} from "react-router"
import LoginRegistration from "./components/LoginRegistration.jsx";
import TriviaGame from "./components/TriviaGame.jsx";

function App() {


  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginRegistration/>} />
        <Route path="/triviagame" element={<TriviaGame/>} />
        </Routes>
        </BrowserRouter>
  )
}


export default App
