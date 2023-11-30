
import { useState } from "react"
import useRequest from "../../hooks/use-request";
import Router from "next/router";
export default () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors} =useRequest({
        url:"/api/users/signUp",
        method: "post",
        body:{
            email,
            password
        },
        onSuccess: ()=>Router.push("/")

    })
    const onSubmit = async(e)=>{
        e.preventDefault();
        if(!email || !password) return;
        await doRequest();
    }
    return  <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        {
            errors
        }

        <div className="form-group">
            <label>Email address</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value) }className="form-control"/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input   value={password} onChange={(e)=>setPassword(e.target.value) } type="password" className="form-control"/>
        </div>
        <button type="submit" className="btn btn-primary">Sumbit</button>

    </form>
}