import { button, div } from "motion/react-client";
import { FaLocationDot, FaMapLocation } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Jobcard = ({ job }) => {

    const {
        _id,
        title,
        location,
        jobType,
        category,
        applicationDeadline,
        salaryRange: { min, max, currency },
        description,
        company,
        requirements,
        responsibilities,
        status,
        hr_email,
        hr_name,
        company_logo
    } = job;

    return (
        <div className="max-w-[500px]  flex flex-col gap-6 rounded-lg p-4 border shadow-md">

            {/* first box  */}
            <div className="flex items-center  gap-4">

                {/* image content  */}
                <img className="w-12 h-12" src={company_logo} alt="" />

                {/* text content  */}

                <div>
                    <h2 className="text-xl font-bold">{company}</h2>
                    <p className="  flex items-center gap-2 text-gray-400"> <FaLocationDot /> <span className="text-sm">{location}</span></p>
                </div>
            </div>

            {/* second box  */}

            <div className="flex flex-col gap-4">
                <h2 className="font-bold">{title}</h2>
                <p className="text-gray-400">{description}</p>
            </div>

            {/* third box  */}

            <div className="flex items-center gap-3 flex-wrap">
                {
                    requirements.map((skill, index) => {
                        return <button key={index} className="rounded-2xl bg-slate-200 hover:bg-blue-300 hover:text-white px-4">{skill}</button>
                    })
                }
            </div>

            {/* fourth box  */}

            <div className="flex justify-between">

                <p className="text-blue-500 text-xl font-bold">${max}<span className="text-sm text-gray-500">/Hour</span></p>


                <Link to={`/jobs/${_id}`}>
                    <button className="bg-blue-400 px-4 text-white py-2 rounded-lg">Details</button>
                </Link>

            </div>

        </div>
    );
};

export default Jobcard;


// <div className=" max-w-[500px] border rounded-lg p-4 shadow-md bg-white text-gray-800">
// {/* Header Section */}
// <div className="flex items-center gap-3">
//   <img
//     src={company_logo}
//     alt={`${company} Logo`}
//     className="w-12 h-12 rounded-md"
//   />
//   <div>
//     <h3 className="font-semibold">{company}</h3>
//     <p className="text-sm text-gray-500">{location}</p>
//   </div>
// </div>

// {/* Job Title */}
// <h2 className="text-lg font-bold mt-3">{title}</h2>
// <p className="text-gray-500 text-sm mt-1">{jobType}</p>

// {/* Description */}
// <p className="text-sm mt-3 text-gray-600">{description}</p>

// {/* Requirements */}
// <div className="flex flex-wrap gap-2 mt-3">
//   {requirements.map((requirement, index) => (
//     <span
//       key={index}
//       className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-700"
//     >
//       {requirement}
//     </span>
//   ))}
// </div>

// {/* Salary */}
// <div className="flex justify-between items-center mt-4">
//   <p className="text-blue-600 font-bold text-xs">
//     {currency.toUpperCase()} {min} - {max}
//   </p>
//   <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//     Apply Now
//   </button>
// </div>
// </div>