import React, { useEffect, useState,useContext} from "react";
import PageHeader from "../components/PageHeader";
import { Link, useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from 'sweetalert2'

const JobDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/login";
  const [job, setJob] = useState([]);
  useEffect(() => {
    if (!user) {
        navigate(from, { replace: true });
      }



    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);
      console.log(job.summary)
  
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      

      <div className="mt-10">
        <h3 className="font-semibold mb-2">Job ID: {parseInt(id)}</h3>

       

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <p className="text-xl font-medium mb-2">Job type</p>
          </div>
          <button className="bg-blue px-6 py-1 text-white rounded-sm">
            {job.employmentType}
          </button>
          <Link to={`https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=ASKXGp3vZfvDDepJpiGgPw7xi_XUQDiBD7XAEZ8LQr59ojgdWSjyWeXQXNYMLZzXwttIGOpT8AerUg&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1175055581%3A1707231654803342&theme=glif`} className="bg-indigo-700 px-6 py-1 text-white rounded-sm ms-2" >
            Apply Now
          </Link>
        </div>

        {/* job details */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mt-12">
          <div className="md:w-1/3 bg-white p-4 rounded-lg overflow-auto" style={{ height: "400px" }}>
            <h4 className="text-lg font-medium mb-3">Job Summary</h4>
            <p className="text-primary/90">
            {job.summary} 
            </p>
            <p className="text-red">Send email to {job.postingBy}</p>
            
          </div>

          <div className="md:w-1/3 bg-white p-4 rounded-lg overflow-auto" style={{ height: "400px" }}>
            <h4 className="text-lg font-medium mb-3  ">Qualifications</h4>
            <p className="text-primary/90">
            {job.qualifications}
            </p>
          </div>
          <div className="md:w-1/3 bg-white p-4 rounded-lg overflow-auto" style={{ height: "400px" }}>
            <h4 className="text-lg font-medium mb-3">Roles and Responsibilities</h4>
            <p className="text-primary/90">
            {job.responsibilities}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;
