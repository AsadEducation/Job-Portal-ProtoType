import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyPostedJobs = () => {

    const [MyPostedJobs, setMyPostedJobs] = useState([]);


    const { user } = useAuth();

    useEffect(() => {

        fetch(`http://localhost:5000/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyPostedJobs(data));

    }, [user.email]);

    // console.log(MyPostedJobs);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Job Title</th>
                            <th>Deadline</th>
                            <th>Application Count</th>
                            <th>View Applications</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* dynamic  row  */}

                        {
                            MyPostedJobs.map((job, index) => {
                                return <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{job.title}</td>
                                    <td>{job.applicationDeadline}</td>
                                    <td>{job.applicationCount}</td>
                                    <td>
                                        <Link to={`/view-applications/${job._id}`}>
                                            <button className='btn btn-link'>View</button>
                                        </Link>
                                    </td>
                                </tr>
                            })
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;