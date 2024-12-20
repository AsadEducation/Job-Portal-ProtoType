import {
    createBrowserRouter,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/Error/ErrorPage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Jobdetails from "../Pages/Details/Jobdetails";
import axios from "axios";
import Private from "./Private";
import JobApply from "../Pages/JobApply/JobApply";
import MyApplications from "../Pages/MyApplications/MyApplications";
import AddJob from "../Pages/AddJob/AddJob";
import MyPostedJobs from "../Pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../Pages/ViewApplications/ViewApplications";


const router = createBrowserRouter([
    {
        path: "",
        element: <RootLayout />,

        children: [

            {
                path: '',
                element: <Home />
            },
            {
                path: 'auth',
                element: <AuthLayout />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    },

                    {
                        path: 'register',
                        element: <Register />
                    }

                ]
            },
            {
                path: 'jobs/:id',
                element: <Private><Jobdetails /></Private>,
                loader: ({ params }) => axios.get(`http://localhost:5000/jobs/${params.id}`)

            },
            {
                path: 'JobApply/:id',
                element: <Private><JobApply /></Private>
            },
            {

                path:'myApplications',
                element:<Private><MyApplications/></Private>
            },
            {
                path:'AddJob',
                element:<Private><AddJob/></Private>,
            },
            {
                path:'my-posted-jobs',
                element:<Private><MyPostedJobs/></Private>,
            },
            {
                path:'view-applications/:job_id',
                element:<Private><ViewApplications/></Private>,
                loader:({params})=>fetch(`http://localhost:5000/view-applications/${params.job_id}`),
            }
        ],
        errorElement: <ErrorPage />,
    },
]);

export default router;