import { Link } from "react-router-dom";
import auth from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(""); // For error messages

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Logged In");
                navigate("/StudentManagement"); // Redirect if already logged in
            } else {
                console.log("Logged Out");
            }
        });
    }, [navigate]);

    function loginUser() {
        // Validation checks
        if (!user || !pass) {
            setError("Both fields are required!");
            return;
        }

        // Firebase authentication
        signInWithEmailAndPassword(auth, user, pass)
            .then(() => {
                console.log("User Logged In");
                navigate("/StudentManagement");
            })
            .catch((err) => {
                setError("Invalid username or password!"); // Display error message
                console.log("Failed to Login:", err.message);
            });
    }

    return (
        <div className="flex justify-center bg-blue-950 text-white">
            <div className="p-5 m-32 w-80 h-96 bg-slate-500 rounded-md">
                <h1 className="text-3xl font-medium m-5 p-5">Hey Hi...!</h1>

                {/* Input Fields */}
                <input
                    type="text"
                    className="w-52 border-black p-1 m-3 bg-transparent border rounded-md"
                    placeholder="User Name"
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    type="password"
                    className="w-52 border-black p-1 m-3 bg-transparent border rounded-md"
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)}
                />
                
                {/* Display error message */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Login Button */}
                <button
                    className="bg-orange-400 text-blue-950 w-24 p-2 m-3 rounded-md"
                    onClick={loginUser}
                >
                    Login
                </button>

                {/* Register Link */}
                <p>Don't have an account? <Link to={"/Register"} className="underline">Register</Link></p>
            </div>
        </div>
    );
}

export default Login;
