import React ,{useState,useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./sign_up.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logincontext } from "../context/ContextProvider";
import { Navigate } from 'react-router-dom';
const Sign_in = () => {
    const { account, setAccount } = useContext(Logincontext);
    const navigate=useNavigate()
    const [logdata, setData] = useState({
        email:"",
        password:""
    })
    const adddata=(e)=>{
        const {name,value}=e.target;
        setData(()=>{
            return{
                ...logdata,
                [name]:value
            }
        })
    }
    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;
        // console.log(email);
        try {
            const res = await fetch("https://clone-backend-zo32.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });


            const data = await res.json();
            // console.log(data);

            if (res.status === 400 || !data) {
                console.log("invalid details");
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setAccount(data);
                setData({ ...logdata, email: "", password: "" })
                toast.success("Login Successfull", {
                    position: "top-center"
                });
                navigate("/buynow")
            }
        } catch (error) {
            console.log("Login Error" + error.message);
        }
    };

  return (
    <section>
    <div className="sign_container">
        <div className="sign_header">
          <NavLink to='/'> <img src="./blacklogoamazon.png" alt="signupimg" /></NavLink>
        </div>
        <div className="sign_form">
            <form method="POST">
                <h1>Sign-In</h1>

                <div className="form_data">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"
                    value={logdata.email}
                        onChange={adddata}
                        id="email" />
                </div>
                <div className="form_data">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"
                        onChange={adddata}
                        value={logdata.password}
                        id="password" placeholder="At least 6 characters" />
                </div>
                <button onClick={senddata} type="submit" className="signin_btn" >Continue</button>
            </form>
            <ToastContainer/>
        </div>
        <div className="create_accountinfo">
            <p>New to Amazon?</p>
            <button>  <NavLink to="/register">Create your Amazon Account</NavLink></button>
        </div>
    </div>

</section>
  )
}

export default Sign_in