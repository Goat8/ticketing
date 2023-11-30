import axios from "axios";
import { useState} from "react";
export default  ({url, method, body, onSuccess}) =>{
    const [errors, setError] = useState(null);
    const doRequest = async()=>{
        try{
            const req ={
                method: method,
                url: url,
                data: body,
              }
            const response = await axios(req);
            setError(null)
            if(onSuccess) {onSuccess( response.data)}
            return response.data;
        }
        catch(err) {
            console.log("why ever here", err);
            if(err){
                setError(   

                    <div className="alert alert-danger"><h4>Ooops</h4>
                    <ul className="my-0">
                     {
                         err?.response?.data?.errors?.map(err=><li>{err.message}</li>)
                     }
                    </ul>
                   </div>)
            }
           
        }
    }
    return {
        errors,
        doRequest
    }
}

