import React from "react"
import {useNavigate} from "react-router" // Need to be installed with React Router through " npm i react-router " in terminal
import "./LoginRegistration.css"
import { FaUser, FaLock } from "react-icons/fa"; // Needs to be installed with React Icons through " npm install react-icons --save " in terminal


function Registration ({formHandle}) {
   
    const navigate = useNavigate (); // Navigation 
    const loggeduser = JSON.parse(localStorage.getItem('user')); // Checks for the user in localStorage


// Registration-logic
    const handleRegistration = (e) => {
        e.preventDefault(); // Prevents browser from realod/refresh
        if (e.target.username.value && e.target.password.value) {
          if (!localStorage.getItem("user")) { // If "user" is NOT found in localStorage...
            localStorage.setItem("user", JSON.stringify({username:e.target.username.value, password:e.target.password.value})) // ... it sets a new user in localStorage.
            alert ("Registration succeded!") // Alert that registration is succeded just to be clear to the user
            navigate ('game'); // When alert "OK" is clicked it navigates to game-page 
          }
        } if ((e.target.username.value === loggeduser.username)) { // Checks if the input-username is equal to the stored username
            alert("User already exists"); // If the username already exists in localStorage, alert will show
        }
    } 

    return (
    <div> 
        <div className="form-box login">
            <h1>Register</h1>
                <form onSubmit={(e)=>handleRegistration(e)}>
                
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
                    
                    <button type="submit">Register</button>
                    <p>Already have an account? <span onClick = {()=> formHandle('login')}>Log in</span></p>
                </form>
        </div>
    </div>

    );
}


export default Registration