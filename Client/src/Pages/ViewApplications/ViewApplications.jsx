import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewApplications = () => {

    const loaderData = useLoaderData();

    console.log(loaderData);

    const [applications , setApplications]= useState([]);

    setApplications(loaderData);



    return (
        <div>
            <h2 className="text-5xl font-bold text-center"> applications { applications.length} </h2>
        </div>
    );
};

export default ViewApplications;