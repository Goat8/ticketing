import axios from "axios";

const LandingPage = ({currentUser})=>{
     console.log("0000000000",currentUser)
    return <h1>Landing Page</h1>
};
LandingPage.getInitialProps = async ()=>{//used for server side rendering 
   
    if(typeof window === 'undefined'){
         const req ={
        method: "get",
        url: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      }
    const response = await axios.get("http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser", {
        headers:{
            Host:"ticketing.dev"
        }
    });
    return response?.data

    }
    else{
        const {data} = await axios.get("/api/users/currentuser");
        return data
    }
};

export default LandingPage;