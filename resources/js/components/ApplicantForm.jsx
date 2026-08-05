import { useState, useEffect } from "react";
import axios from "axios";

function ApplicantForm() {
    const [applicant, setApplicant] = useState({
        'name': "",
        'email': "",
        'phone': "",
        'city': "",
        'gender': ""
    });

    const [applicants, setApplicants] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/applicant";

    const handleChange = (e) => {

        setApplicant({
            ...applicant,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const getAllApplicants = async () => {
        const response=await axios.get(URL);
        setApplicants(response.data);
        
    };

    useEffect(() => {
        getAllApplicants();
    }, []);

    const singleApplicant = async (id) => {
        const response=await axios.get(`${URL}/${id}`);
        setApplicant(response.data);
        setEditId(id);
    };

    const addApplicant = async () => {
        const response = await axios.post(URL, applicant);
        alert("Applicant Added");
    };

    const updateApplicant = async () => {
        await axios.put(`${URL}/${editId}`, applicant);
        alert("Applicant Updated");

    };

    const deleteApplicant = async (id) => {
        const confirmDelete = window.confirm("Delete Account");

        if (!confirmDelete) {
            return;
        }
        else {
            await axios.delete(`${URL}/${id}`);
            getAllApplicants();
            alert("Applicant Deleted");
        }
    }

    const clearForm = () => {
        setApplicant({
            'name': "",
            'email': "",
            'phone': "",
            'city': "",
            'gender': ""
        });

        setEditId(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

       try{
        if (editId === null) {
            await addApplicant();
        }
        else {
            await updateApplicant();
            setEditId(null);
        }

        await getAllApplicants();
        clearForm();
        setErrors({});
    }
    catch(error){
        if(error.response && error.response.status===422)
        {
            setErrors(error.response.data.errors);
        }
        else{
            alert("Something went Wrong");
        }
    }
       }

       return(
        <div style={{width:"600px", margin:"30px auto"}}>
            <form onSubmit={handleSubmit}>
                <h1>Applicant Form</h1>

                <div style={{marginBottom:"15px"}}>
                    <input type="text" name="name" value={applicant.name} placeholder="Name" onChange={handleChange} />
                    <div style={{color:"red", marginLeft:"110px" }}>{errors.name?.[0]}</div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <input type="text" name="email" value={applicant.email} placeholder="Email" onChange={handleChange} />
                    <div style={{color:"red", marginLeft:"110px"}}>{errors.email?.[0]}</div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <input type="text" name="phone" value={applicant.phone} placeholder="Phone" onChange={handleChange} />
                    <div style={{color:"red", marginLeft:"110px"}}>{errors.phone?.[0]}</div>

                </div>

                <div style={{marginBottom:"15px"}}>
                    <label>City:</label>
                    <select name="city" value={applicant.city} onChange={handleChange}>
                        <option value="">Select City</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Noida">Noida</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>

                    <div style={{color:"red", marginLeft:"110px"}}>{errors.city?.[0]}</div>

                </div>

                <div style={{marginBottom:"15px"}}>
                    <label>Gender:</label>
                    <label htmlFor="male">
                        <input type="radio" name="gender" id="male" value="Male" checked={applicant.gender==="Male"} onChange={handleChange} />Male
                    </label>

                    &nbsp;&nbsp;

                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="Female" checked={applicant.gender==="Female"} onChange={handleChange}/>
                        Female</label>

                        <div style={{color:"red", marginLeft:"110px"}}>{errors.gender?.[0]}</div>
                </div>
                <p>
                    <button type="submit">{editId==null?"Save":"Update"}</button>
                </p>
            </form>

            <hr />

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {applicants.map((item)=>{
                        return(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.city}</td>
                                <td>{item.gender}</td>

                                <td>
                                    <button type="button" onClick={()=>singleApplicant(item.id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={()=>deleteApplicant(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </div>
       )

}

export default ApplicantForm;