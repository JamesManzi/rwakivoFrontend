import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api";
function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const [messageType,setMessageType]=useState("");

    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!email||!password){
            setMessage("All Fields Required");
            setMessageType("error");
        }
        try {
            const res=await api.post("/login",{
                email,
                password
            });
            if(res.data.success){
                localStorage.setItem("userId",res.data.user._id);
                localStorage.setItem("token",res.data.token);

                setMessage("Login Successfully");
                setMessageType("success");
                setTimeout(()=>{
                    navigate("/dashboard");
                },2000);
            }
        } catch (error) {
            console.log("Login Error");
            setMessage(error.response?.data?.message||"Login Error");
            setMessageType("error");
        }
    }
    return(
        <>
        <div className="login-page">
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label><br/>
                <input type="email" id="email" name="email" value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="login" placeholder="Email" required/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" id="password" name="password" value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="login" placeholder="Password" required/><br/>
                <button className="submit">Login</button>
                <div className="login-links">
                   <p>
                    Don't have account?<Link to="/register">Register</Link>
                   </p>
                </div>
                {message&&(
                    <p className={messageType}>
                        {message}
                    </p>
                )}
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;