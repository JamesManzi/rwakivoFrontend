import { Link,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import api from "../../api";
function Register(){
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const [messageType,setMessageType]=useState("");

    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!username||!email||!password){
            setMessage("All Fields Required");
            setMessageType("error");
            return
        }
        try {
            const res=await api.post("/register",{
                username,
                email,
                password
            });
            if(res.data.success){
                setMessage("Register Successfully");
                setMessageType("success");
                setTimeout(()=>{
                    navigate("/login");
                },2000);
            } else{
                setMessage(res.data.message);
                setMessageType("error");
            }
        } catch (error) {
            console.log("Register Error");
            setMessage(error.response?.data?.message||"Register Error");
            setMessageType("error");
        }
    }
    return(
        <>
        <div className="register-page">
            <div className="register-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label><br/>
                    <input type="text" id="username" name="username" value={username}
                  onChange={(e)=>setUsername(e.target.value)} 
                   className="register" placeholder="Username" required/><br/>
                    <label htmlFor="email">Email</label><br/>
                    <input type="email" id="email" name="email" value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="register" placeholder="Email" required/><br/>
                    <label htmlFor="password">Password</label><br/>
                    <input type="password" id="password" name="password" value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="register" placeholder="Password" required/><br/>
                    <button type="submit" className="registerBtn">Register</button>

                    <div className="register-links">
                        <p>
                            ALready have account? <Link to="/login">Login</Link>
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

export default Register;