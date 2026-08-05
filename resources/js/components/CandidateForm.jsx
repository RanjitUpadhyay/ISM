import { useState, useEffect } from "react";
import axios from "axios";

function CandidateForm() {
    const [candidate, setCandidate] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        gender: ""
    })

    const [candidates, setCandidates] = useState([]);
    const [editId, setEditId] = useState(null);

    const URL = "http://127.0.0.1:8000/api/candidate";

    const handleChange = async (e) => {
        setCandidate({
            ...candidate,
            [e.target.name]: e.target.value
        });
    };

    const getAllCandidates = async() => {
        const response = await axios.get(URL)
        setCandidates(response.data);
    }

    useEffect(() => {
        getAllCandidates();
    }, []);

    const addCandidate = async () => {
        const response = await axios.post(URL, candidate)
        alert("Candidate Added");
    };

    const updateCandidate = async () => {
        const response = await axios.put(`${URL}/${editId}`,candidate);
        alert("Candidate Updated");
    };

    const getOneCandidate = async (id) => {
        const response = await axios.get(`${URL}/${id}`)
        setCandidate(response.data);
        setEditId(id);
    }

    const deleteCandidate = async (id) => {
        const confirmDelete = window.confirm("Delete candidate?");
        if (!confirmDelete) {
            return;
        }

        else {
            await axios.delete(`${URL}/${id}`);
        }
        setEditId(null);
        getAllCandidates();
    }

    const clearForm = () => {
        setCandidate({
            name: "",
            email: "",
            phone: "",
            city: "",
            gender: ""
        });
        setEditId(null);

    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(editId==null)
        {
            await addCandidate();
        }
        else{
            await updateCandidate();
        }
        clearForm();
        getAllCandidates();
    }
   

    return(
        <div style={{width:"600px",margin:"30px auto"}}>

            <h1>Candidate Form</h1>

            <form onSubmit={handleSubmit}>

            <p>
                <label>Name:</label>
                <input type="text" name="name" value={candidate.name} placeholder="Name" onChange={handleChange} />
            </p>

            <p>
            <label>Email:</label>
                <input type="text" name="email" value={candidate.email} placeholder="Email" onChange={handleChange} />
            </p>

            <p>
            <label>Phone:</label>
                <input type="text" name="phone" value={candidate.phone} placeholder="Phone" onChange={handleChange} />
            </p>

            <p>
            <label>City:</label>
                <select name="city" value={candidate.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    <option>Kolkata</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                </select>
            </p>

           <p>
           <label>Gender:</label>
           <label htmlFor="male">
            <input type="radio" id="male" value="Male" checked={candidate.gender==="Male"} name="gender" onChange={handleChange} />Male
           </label> 
           &nbsp;&nbsp;

           <label htmlFor="female">
            <input type="radio" id="female" value="Female" checked={candidate.gender==="Female"} name="gender" onChange={handleChange} />Female
           </label>
           </p>

           <button type="submit">{editId==null?"Save":"Update"}</button>

           </form>

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
                {candidates.map((item)=>{
                    return( <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.city}</td>
                        <td>{item.gender}</td>
                        <td>
                        <button onClick={()=>getOneCandidate(item.id)}>Edit</button>
                        &nbsp;
                        <button onClick={()=>deleteCandidate(item.id)}>Delete</button>
                        </td>
                        </tr>
                    )
                })}
               

            </tbody>

           </table>


        </div>
    )
}

export default CandidateForm;