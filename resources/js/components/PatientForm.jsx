import { useState, useEffect } from "react";
import axios from "axios";

function PatientForm() {
    const [patient, setPatient] = useState({
        'name': "",
        'email': '',
        'phone': '',
        'age': '',
        'gender': '',
        'city': '',
        'bed_no': '',
        'admit_date': '',
        'discharge_date': '',
        'disease': ''
    });


    const [patients, setPatients] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/patient";

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    };

    const getAllPatients = async () => {
        const response = await axios.get(URL);
        setPatients(response.data);
    };

    useEffect(() => {
        getAllPatients();
    }, []);

    const getSinglePatient = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setPatient(response.data);
        setEditId(id);
    };

    const addPatient = async () => {
            await axios.post(URL, patient);
            alert("Patient Added");
        
    };

    const updatePatient = async () => {
        await axios.put(`${URL}/${editId}`, patient);
        alert("Patient Updated");
    };

    const deletePatient = async (id) => {

        const confirmDelete = window.confirm("Delete Patient?");
        if (!confirmDelete) {
            return;
        }

        else {
            await axios.delete(`${URL}/${id}`);
            alert("Patient Deleted");
            getAllPatients();
        }

    };

    const clearForm = () => {
        setPatient({
            'name': "",
            'email': '',
            'phone': '',
            'age': '',
            'gender': '',
            'city': '',
            'bed_no': '',
            'admit_date': '',
            'discharge_date': '',
            'disease': ''
        });

        setEditId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId === null) {
                await addPatient();
            }
            else {
                await updatePatient();
                setEditId(null);
            }
            clearForm();
            setErrors({});
            await getAllPatients();
        }

        catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            else {
                alert("Something went wrong");
            }
        }
    };
        return (
            <div style={{ width: "700px", margin: "30px auto" }}>

                <form onSubmit={handleSubmit}>
                    <h1>Patient Form</h1>

                    <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>Name:</label>
                        <input type="text" name="name" value={patient.name} placeholder="Name" onChange={handleChange} />

                        <div style={{ color: "red", marginLeft: "110px" }}>{errors.name?.[0]}</div>

                    </div>

                    <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>Email:</label>
                        <input type="text" name="email" value={patient.email} placeholder="Email" onChange={handleChange} />

                        <div style={{ color: "red", marginLeft: "100px" }}>{errors.email?.[0]}</div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>Phone:</label>
                        <input type="text" name="phone" value={patient.phone} placeholder="Phone" onChange={handleChange} />

                        <div style={{ color: "red", marginLeft: "100px" }}>{errors.phone?.[0]}</div>


                    </div>

                    <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>Age:</label>
                        <input type="number" name="age" value={patient.age} placeholder="Age" onChange={handleChange} />
                        <div style={{ color: "red", marginLeft: "110px" }}>{errors.age?.[0]}</div>

                    </div>


                    <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>Gender:</label>

                        <label htmlFor="male">
                            <input type="radio" id="male" value="Male" checked={patient.gender === "Male"} name="gender" onChange={handleChange} />Male</label>
                        &nbsp;&nbsp;

                        <label htmlFor="female">
                            <input type="radio" name="gender" id="female" value="Female" checked={patient.gender === "Female"} onChange={handleChange} /> Female</label>

                        <div style={{ color: "red", marginLeft: "110px" }}>{errors.gender?.[0]}</div>

                    </div>

                    <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>City:</label>

                        <select name="city" value={patient.city} onChange={handleChange}>
                            <option value="">Select City:</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Noida">Noida</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                        </select>


                        <div style={{ color: "red", marginLeft: "100px" }}>{errors.city?.[0]}</div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>Bed Number:</label>

                        <input type="number" name="bed_no" value={patient.bed_no} placeholder="Bed Number" onChange={handleChange} />

                        <div style={{ color: "red", marginLeft: "110px" }}>{errors.bed_no?.[0]}</div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>Admit Date:</label>
                        <input type="date" name="admit_date" value={patient.admit_date} placeholder="Admit Date" onChange={handleChange} />

                        <div style={{ color: "red", marginLeft: "110px" }}>{errors.admit_date?.[0]}</div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>Discharge Date:</label>

                        <input type="date" name="discharge_date" value={patient.discharge_date} placeholder="Discharge Date" onChange={handleChange} />

                        <div style={{ color: "red", marginLeft: "110px" }}>{errors.discharge_date?.[0]}</div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>Disease:</label>

                        <input type="text" name="disease" value={patient.disease} placeholder="Disease" onChange={handleChange} />

                        <div style={{ color: "red", marginLeft: "110px" }}>{errors.disease?.[0]}</div>
                    </div>

                    <p>
                        <button type="submit">{editId === null ? "Save" : "Update"}</button>
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
                            <th>Age</th>
                            <th>Gender</th>
                            <th>City</th>
                            <th>Bed Number</th>
                            <th>Admit Date</th>
                            <th>Discharge Date</th>
                            <th>Disease</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {patients.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.age}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.city}</td>
                                    <td>{item.bed_no}</td>
                                    <td>{item.admit_date}</td>
                                    <td>{item.discharge_date}</td>
                                    <td>{item.disease}</td>

                                    <td>
                                        <button type="button" onClick={() => { getSinglePatient(item.id) }}>Edit</button>
                                        &nbsp;
                                        <button type="button" onClick={() => { deletePatient(item.id) }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

            </div>
        )
    
};
export default PatientForm;