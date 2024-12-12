import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config";
import { useNavigate } from "react-router-dom";

function Register() {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState(""); // For error messages

    const navigate = useNavigate();

    function registerUser() {
        // Validation checks
        if (!user || !pass || !confirmPass) {
            setError("All fields are required!");
            return;
        }
        if (pass !== confirmPass) {
            setError("Passwords do not match!");
            return;
        }
        if (pass.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }

        // Firebase registration
        createUserWithEmailAndPassword(auth, user, pass)
            .then(() => {
                console.log("User Registered");
                navigate("/Login");
            })
            .catch((err) => {
                setError(err.message); // Display Firebase error
            });
    }

    return (
        <div className="flex justify-center bg-blue-950 text-white">
            <div className="p-5 m-20 bg-slate-500 rounded-md">
                <h1 className="text-3xl font-medium m-5 p-5">Hey Students...!</h1>
                <p>Signup Here :)</p>

                <div className="flex flex-col gap-2 my-2 p-5 m-5">
                    <input 
                        type="text" 
                        className="w-52 border-black p-1 m-1 bg-transparent border rounded-md" 
                        placeholder="User Name" 
                        onChange={(e) => setUser(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        className="w-52 border-black p-1 m-1 bg-transparent border rounded-md" 
                        placeholder="Password" 
                        onChange={(e) => setPass(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        className="w-52 border-black p-1 m-1 bg-transparent border rounded-md" 
                        placeholder="Confirm Password" 
                        onChange={(e) => setConfirmPass(e.target.value)} 
                    />
                    {/* Display error message */}
                    {error && <p className="text-red-800">{error}</p>}
                    
                    <button 
                        className="bg-yellow-600 w-24 p-2 rounded-md m-1" 
                        onClick={registerUser}
                    >
                        Register
                    </button>
                    <p>Already have an account? <Link to={"/Login"} className="underline">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
