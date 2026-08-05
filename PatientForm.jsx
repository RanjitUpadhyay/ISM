import { useState, useEffect } from "react";
import axios from "axios";

function PatientForm() {

    const [patient, setPatient] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        city: "",
        bed_no: "",
        admit_date: "",
        discharge_date: "",
        disease:""
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

    }

    const getAllPatients = async () => {

        const response = await axios.get(URL);

        setPatients(response.data);

    };

    useEffect(() => {

        getAllPatients();

    }, []);

    const singlePatient = async (id) => {

        const response = await axios.get(`${URL}/${id}`);

        setPatient(response.data);

        setEditId(id);

    };

    const addPatient = async () => {

       try {
        await axios.post(URL, patient);

        alert("Patient Added");
       } 

        catch (error) {
            console.log(error.response.data);
        }

    };

    const updatePatient = async () => {

        await axios.put(`${URL}/${editId}`, patient);

        alert("Patient Updated");

    };

    const deletePatient = async (id) => {

        const confirmDelete = window.confirm("Delete Patient");

        if (!confirmDelete) {
            return;
        }

        await axios.delete(`${URL}/${id}`);

        getAllPatients();

        alert("Patient Deleted");

    }

    const clearForm = () => {

        setPatient({
            name: "",
            email: "",
            phone: "",
            age: "",
            gender: "",
            city: "",
            bed_no: "",
            admit_date: "",
            discharge_date: "",
            disease:""
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

            await getAllPatients();

            clearForm();

            setErrors({});

        }
        catch (error) {

            if (error.response && error.response.status === 422) {

                setErrors(error.response.data.errors);

            }
            else {

                alert("Something went Wrong");

            }

        }

    }

    return (

        <div style={{ width: "700px", margin: "30px auto" }}>

            <form onSubmit={handleSubmit}>

                <h1>Patient Form</h1>

                <div style={{marginBottom:"15px"}}>
                    <input
                        type="text"
                        name="name"
                        value={patient.name}
                        placeholder="Name"
                        onChange={handleChange}
                    />
                    <div style={{color:"red", marginLeft:"110px"}}>
                        {errors.name?.[0]}
                    </div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <input
                        type="text"
                        name="email"
                        value={patient.email}
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <div style={{color:"red", marginLeft:"110px"}}>
                        {errors.email?.[0]}
                    </div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <input
                        type="text"
                        name="phone"
                        value={patient.phone}
                        placeholder="Phone"
                        onChange={handleChange}
                    />
                    <div style={{color:"red", marginLeft:"110px"}}>
                        {errors.phone?.[0]}
                    </div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <input
                        type="number"
                        name="age"
                        value={patient.age}
                        placeholder="Age"
                        onChange={handleChange}
                    />
                    <div style={{color:"red", marginLeft:"110px"}}>
                        {errors.age?.[0]}
                    </div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <label>Gender:</label>

                    <label htmlFor="male">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            checked={patient.gender==="Male"}
                            onChange={handleChange}
                        />
                        Male
                    </label>

                    &nbsp;&nbsp;

                    <label htmlFor="female">
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            checked={patient.gender==="Female"}
                            onChange={handleChange}
                        />
                        Female
                    </label>

                    <div style={{color:"red", marginLeft:"110px"}}>
                        {errors.gender?.[0]}
                    </div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <label>City:</label>

                    <select
                        name="city"
                        value={patient.city}
                        onChange={handleChange}
                    >
                        <option value="">Select City</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Noida">Noida</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>

                    <div style={{color:"red", marginLeft:"110px"}}>
                        {errors.city?.[0]}
                    </div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <input
                        type="number"
                        name="bed_no"
                        value={patient.bed_no}
                        placeholder="Bed Number"
                        onChange={handleChange}
                    />

                    <div style={{color:"red", marginLeft:"110px"}}>
                        {errors.bed_no?.[0]}
                    </div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <label>Admit Date : </label>

                    <input
                        type="date"
                        name="admit_date"
                        value={patient.admit_date}
                        onChange={handleChange}
                    />

                    <div style={{color:"red", marginLeft:"110px"}}>
                        {errors.admit_date?.[0]}
                    </div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <label>Discharge Date : </label>

                    <input
                        type="date"
                        name="discharge_date"
                        value={patient.discharge_date}
                        onChange={handleChange}
                    />

                    <div style={{color:"red", marginLeft:"110px"}}>
                        {errors.discharge_date?.[0]}
                    </div>
                </div>

                
                <div style={{marginBottom:"15px"}}>
                    <input
                        type="text"
                        name="disease"
                        value={patient.disease}
                        placeholder="Disease"
                        onChange={handleChange}
                    />
                    <div style={{color:"red", marginLeft:"110px"}}>
                        {errors.phone?.[0]}
                    </div>
                </div>

                <p>
                    <button type="submit">
                        {editId==null ? "Save" : "Update"}
                    </button>
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
                        <th>Bed No</th>
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

                                    <button
                                        type="button"
                                        onClick={() => singlePatient(item.id)}
                                    >
                                        Edit
                                    </button>

                                    &nbsp;

                                    <button
                                        type="button"
                                        onClick={() => deletePatient(item.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </div>

    )

}

export default PatientForm;
