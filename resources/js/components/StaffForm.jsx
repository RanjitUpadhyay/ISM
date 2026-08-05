import { useState, useEffect } from "react";
import axios from "axios";

function StaffForm() {

    // Form data
    const [staff, setStaff] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        gender: "",
    });

    // Store all staff records
    const [staffs, setStaffs] = useState([]);//initially empty []

    // Store editing record ID
    const [editId, setEditId] = useState(null);

    // API URL
    const API_URL = "http://127.0.0.1:8000/api/staff";


    //==========================
    // Handle textbox changes
    //==========================

    const handleChange = (e) => {
        setStaff({
            ...staff,
            [e.target.name]: e.target.value,
        });
    };

    //==========================
    // GET : Read all records
    //==========================

    const getAllStaffs = async () => {

        const response = await axios.get(API_URL);

        setStaffs(response.data);
    };

    // Load data when page opens
    useEffect(() => {
        getAllStaffs();    //So useEffect() calls the getAllStaffs() function
    }, []); //[] means page renders one time only 

    //==========================
    // POST : Insert record
    //==========================


    const addStaff = async () => {

        const response = await axios.post(API_URL, staff);// Sends the staff object to the Laravel API to create a new staff record.

        alert("Staff Added Successfully");
    };
    /*  const addStaff = async () => {
  
          await axios.post(API_URL, staff);
  
          alert("Staff Added Successfully");
      };*/

    //==========================
    // PUT : Update record
    //==========================

    const updateStaff = async () => {
        //the "staff" passed to axios.put() is the same staff state created by const [staff, setStaff] = useState(...).
        const response = await axios.put(`${API_URL}/${editId}`, staff);  // It contains the latest values entered by the user in the form

        alert("Staff Updated Successfully");
    };

    //==========================
    // GET : Read one record
    //==========================

    const getSingleStaff = async (id) => {

        const response = await axios.get(`${API_URL}/${id}`);//JavaScript replaces the variables with their values.Backticks(` `) are used because the URL is dynamic.

        setStaff(response.data); //After the API response is received, pass response.data to setStaff() to update the staff state.

        setEditId(id); //Pass the id value to setEditId() to update the editId state.
    };

    //==========================
    // DELETE : Delete record
    //==========================
    const removeStaff = async (id) => {

        const confirmDelete = window.confirm("Delete this staff?");

        if (!confirmDelete) {
            return;
        } else {

            const response = await axios.delete(`${API_URL}/${id}`);

            alert("Staff Deleted Successfully");

            getAllStaffs();
        }
    };

    //==========================
    // Clear Form
    //==========================

    const clearForm = () => {

        setStaff({
            name: "",
            email: "",
            phone: "",
            city: "",
            gender: "",
        });

        setEditId(null);
    };

    //==========================
    // Submit Form
    //==========================

    const handleSubmit = async (e) => {    //e → Event object generated when the form is submitted.

        e.preventDefault(); //to prevent reloading of the page after clicking submit button

        if (editId === null) {

            await addStaff();

        } else {

            await updateStaff();
        }

        clearForm();

        getAllStaffs();
    };

    return (

        <div style={{ width: "600px", margin: "30px auto" }}>

            <h2>Staff CRUD</h2>

            <form onSubmit={handleSubmit}>

                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={staff.name}
                        onChange={handleChange}
                    />
                </p>

                <p>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={staff.email}
                        onChange={handleChange}
                    />
                </p>

                <p>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={staff.phone}
                        onChange={handleChange}
                    />
                </p>

                <p>
                    <select
                        name="city"
                        value={staff.city}
                        onChange={handleChange}
                    >
                        <option value="">Select City</option>
                        <option>Delhi</option>
                        <option>Mumbai</option>
                        <option>Kolkata</option>
                        <option>Chennai</option>
                    </select>
                </p>

                <p>

                    <label>

                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={staff.gender === "Male"}
                            onChange={handleChange}
                        />

                        Male

                    </label>

                    &nbsp;&nbsp;

                    <label>

                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={staff.gender === "Female"}
                            onChange={handleChange}
                        />

                        Female

                    </label>

                </p>

                <button type="submit">{editId === null ? "Save" : "Update"}</button>

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

                    {staffs.map((item) => (

                        <tr key={item.id}>

                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.city}</td>
                            <td>{item.gender}</td>

                            <td>

                                <button onClick={() => getSingleStaff(item.id)}>Edit</button>

                                &nbsp;

                                <button onClick={() => removeStaff(item.id)}>Delete</button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default StaffForm;