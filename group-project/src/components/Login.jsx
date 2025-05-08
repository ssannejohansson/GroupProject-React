import React from "react"
import {useNavigate} from "react-router"                              // Need to be installed with React Router through " npm i react-router " in terminal
import "./LoginRegistration.css"
import { FaUser, FaLock } from "react-icons/fa";                      // Needs to be installed with React Icons through " npm install react-icons --save " in terminal


function Login ({formHandle}) {
    
    const navigate = useNavigate ();                                  // Navigation 

    
// Login-logic
    const handleLogin = (e) => {
        e.preventDefault();                                           // Prevents browser from realod/refresh
        const loggeduser = JSON.parse(localStorage.getItem('user'));  // Checks for the user in localStorage
        if (e.target.username.value === loggeduser.username && e.target.password.value === loggeduser.password) { // Checks if username and password is equal to the user stored in localStorage
            navigate('triviagame');                                         // If login succeeds, the page navigates to game-page
        } else {
            alert("Wrong username or password");                      // If not, alert will display
        }
    }
        
    return (
    <div> 
        <div className="form-box login">
            <h1>Log in</h1>
                <form onSubmit={(e)=>handleLogin(e)}>
                    <div className="input-box">
                        <input type="text" 
                        placeholder="Username" 
                        name="username" 
                        required /> 
                        <FaUser className="icon"/>
                    </div>

                    <div className="input-box">
                        <input type="password" 
                        placeholder="Password" 
                        name="password" 
                        required />
                        <FaLock className="icon"/>
                    </div>
                  
                    <button type="submit">Log In</button>
                    <p> Don't have an account? <span onClick = {()=> formHandle('signup')}>Register</span></p>
                </form>
        </div>
    </div>

    );
}


export default Login