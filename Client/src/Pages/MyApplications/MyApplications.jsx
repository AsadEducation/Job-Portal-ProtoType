import { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import axios from "axios";

const MyApplications = () => {

    const {user}=useAuth();
    const [jobs,setJobs]=useState(null);

    useEffect(()=>{

        axios.get(`http://localhost:5000/jobApply?email=${user.email}`,{withCredentials:true})
        .then(res=>setJobs(res.data));

    },[user.email])

    return (
        <div>
            My Applications Page
        </div>
    );
};

export default MyApplications;