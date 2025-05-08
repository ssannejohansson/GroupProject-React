import {useState} from "react"
import "./LoginRegistration.css"
import Login from "./Login.jsx"
import Registration from "./Registration.jsx"


function LoginRegistration() {
const [form, setForm] = useState('login');

// Logic for Login / Registration pages. If 'login' is true, show Login-page. If 'login' is false, show Registration-page. 

return (
    <>
    {form === 'login' ? (<Login formHandle={setForm}/>) : (<Registration formHandle={setForm}/>) } 
    </>
)
}

export default LoginRegistration; 