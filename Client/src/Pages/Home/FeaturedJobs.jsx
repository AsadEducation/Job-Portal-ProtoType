import { useEffect, useState } from "react";
import Jobcard from "./Jobcard";


const FeaturedJobs = () => {

    const [jobs,setJobs]= useState([]);
    
    useEffect(()=>{
        fetch(`http://localhost:5000/jobs`)
        .then(res=>res.json())
        .then(data=>setJobs(data))
    },[]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto">
                {
                    jobs.map((job)=>{
                        return <Jobcard
                         key={job._id}
                         job={job}
                          />
                    })
                }
            </div>
        </div>
    );
};

export default FeaturedJobs;