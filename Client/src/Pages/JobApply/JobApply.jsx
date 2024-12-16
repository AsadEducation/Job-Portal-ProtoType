import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { use } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const JobApply = () => {

    const id = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    // console.log(id,user);



    const handleFormClicked = (e) => {

        e.preventDefault();

        const form = e.target;
        const github = form.github.value;
        const linkedin = form.linkedin.value;
        const resume = form.resume.value;

        // console.log(github , linkedin , resume);

        const applyInfo = {

            job_id: id,
            applicant_email: user.email,
            github, linkedin, resume
        }

        axios.post(`http://localhost:5000/jobApply`, applyInfo)
        .then(res => {
            Swal.fire({
                icon:'success',
                title:'Successfully Applied',
            })
            navigate('/myApplications')
        })
        .catch(err => console.log(err))

    }

    return (
        <div>
            <h2 className="text-3xl font-bold  text-center">Apply For Job !</h2>
            <form onSubmit={handleFormClicked} className="card-body w-[40%] mx-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">LinkedIn</span>
                    </label>
                    <input type="url" name="linkedin" placeholder="Linked in Url" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">GitHub</span>
                    </label>
                    <input type="url" name="github" placeholder="GitHub Url" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Resume</span>
                    </label>
                    <input type="url" name="resume" placeholder="Resume Url" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Apply</button>
                </div>
            </form>
        </div>
    );
};

export default JobApply;