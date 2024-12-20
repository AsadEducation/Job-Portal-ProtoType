import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import logo from '../../assets/logo/logo.png'


const Navbar = () => {

    const { user, logoutUser } = useContext(AuthContext);

    const links = <>
        <li>
            <NavLink to={`/`}>Home</NavLink>
        </li>
        <li>
            <NavLink to={`/myApplications`}>MyApplications</NavLink>
        </li>
        <li>
            <NavLink to={`/AddJob`}>AddJob</NavLink>
        </li>
        <li>
            <NavLink to={`/my-posted-jobs`}>MyPostedJobs</NavLink>
        </li>

    </>


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>

                {/* website logo  */}

                <a className="btn btn-ghost text-xl">
                    <img className="h-12" src={logo} alt="" />JobPortal
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    {links}

                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <button onClick={() => logoutUser()} className="btn">Logout</button>
                        : <Link to='/auth/login'><button className="btn">Login</button></Link>

                }

            </div>
        </div>
    );
};

export default Navbar;