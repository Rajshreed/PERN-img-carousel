import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
const Logout = () => {
    const [errMsg,setErrMsg] = useState(''); 
    const navigate = useNavigate();
    const handleLogOut =() =>{
        var token = Cookies.get('access_token');
        if (token){
            Cookies.remove('access_token');
            navigate("/");
        }
        else{
            setErrMsg("User already logged out!");
        }
    }
    if(!Cookies.get('access_token')){
       return( <p>User not logged in!</p>);
    }
    return(
        <>
        <div>
        <br></br>
        <br></br>
        <button type="submit" onClick={handleLogOut}>Confirm Log Out</button>
        <p>{errMsg}</p>
        </div>
        </>
    );
}
export default Logout;