import { Link, useLoaderData } from "react-router-dom";


const Jobdetails = () => {

    const loaderData = useLoaderData();
    const job = loaderData.data;

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
        <div className="bg-gray-50 py-10 px-5 lg:px-20">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="flex items-center gap-5 p-6 bg-blue-500 text-white">
                    <img
                        src={company_logo}
                        alt={`${company} Logo`}
                        className="w-16 h-16 object-contain rounded-md"
                    />
                    <div>
                        <h1 className="text-3xl font-semibold">{title}</h1>
                        <p className="text-xl mt-2">{company}</p>
                        <p className="text-lg">{location}</p>
                        <span className="bg-blue-600 text-white px-3 py-1 text-sm rounded-full mt-2">{jobType}</span>
                    </div>
                </div>

                {/* Job Details Section */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold mt-4">Job Description</h2>
                    <p className="text-lg mt-2 text-gray-700">{description}</p>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold">Responsibilities</h3>
                        <ul className="list-disc pl-6 mt-2 text-gray-700">
                            {responsibilities.map((responsibility, index) => (
                                <li key={index} className="mt-2">{responsibility}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold">Requirements</h3>
                        <ul className="list-disc pl-6 mt-2 text-gray-700">
                            {requirements.map((skill, index) => (
                                <li key={index} className="mt-2">{skill}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Salary and Deadline */}
                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-xl font-semibold text-blue-600">
                            {currency.toUpperCase()} {min} - {max}
                        </p>
                        <p className="text-lg text-gray-600">Application Deadline: {applicationDeadline}</p>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold">Contact HR</h3>
                        <p className="text-gray-700">HR Name: {hr_name}</p>
                        <p className="text-gray-700">Email: <a href={`mailto:${hr_email}`} className="text-blue-600">{hr_email}</a></p>
                    </div>

                    {/* Apply Button */}
                    <div className="mt-6">
                        <Link to={`/JobApply/${_id}`}>
                            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                                Apply Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobdetails;