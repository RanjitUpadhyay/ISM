/* 

import { useState } from "react";
import axios from "axios";

function EmployeeForm() {

    const API_URL = "http://127.0.0.1:8000/api/employees";

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        course: "",
        gender: "",
    });

    //error
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    // POST Request
    const addEmployee = async () => {
        await axios.post(API_URL, {           // employee.firstName->the value stored in your React state, which comes from the HTML input.
            first_name: employee.firstName,  //first_name-> from table column and firstName->from html code.
            last_name: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            city: employee.city,
            course: employee.course,
            gender: employee.gender,
        });

        alert("Employee Added Successfully");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addEmployee();

            setEmployee({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                city: "",
                course: "",
                gender: "",
            });
        }
        //catch (error) {
        //   console.log(error);
        // alert("Something went wrong");
        // }

        catch (error) {

            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            else {
                alert("Something went wrong");
            }

        }
    };



    // &nbsp; is an HTML entity that stands for Non-Breaking Space. 
    // It inserts a blank space that the browser will not collapse. /
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <form onSubmit={handleSubmit}>
                <h2>Employee Registration Form</h2>

                <p>
                    <label style={{ display: "inline-block", width: "100px" }}>First Name*:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                    />

                    <p style={{ color: "red" }}>
                        {errors.first_name?.[0]}
                    </p>
                </p>

                <p>
                    <label style={{ display: "inline-block", width: "100px" }}>Last Name*:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                    />

                    <p style={{ color: "red" }}>
                        {errors.last_name?.[0]}
                    </p>
                </p>

                <p>
                    <label style={{ display: "inline-block", width: "100px" }}>Email*:</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                    />

                    <p style={{ color: "red" }}>
                        {errors.email?.[0]}
                    </p>
                </p>

                <p>
                    <label style={{ display: "inline-block", width: "100px" }}>Phone*:</label>
                    <input
                        type="text"
                        name="phone"
                        value={employee.phone}
                        onChange={handleChange}
                    />

                    <p style={{ color: "red" }}>
                        {errors.phone?.[0]}
                    </p>
                </p>

                <p>
                    <label style={{ display: "inline-block", width: "100px" }}>City*:</label>
                    <select
                        name="city"
                        value={employee.city}
                        onChange={handleChange}
                    >
                        <option value="">-- Select City --</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bengaluru">Bengaluru</option>
                    </select>

                    <p style={{ color: "red" }}>
                        {errors.city?.[0]}
                    </p>
                </p>

                <p>
                    <label style={{ display: "inline-block", width: "100px" }}>Course*:</label>
                    <input
                        type="text"
                        name="course"
                        value={employee.course}
                        onChange={handleChange}
                    />
                    <p style={{ color: "red" }}>
                        {errors.course?.[0]}
                    </p>
                </p>

                <label>
                    <label style={{ display: "inline-block", width: "100px" }}>Gender*:</label>
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={employee.gender === "Male"}
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
                        checked={employee.gender === "Female"}
                        onChange={handleChange}
                    />
                    Female
                </label>
                <p style={{ color: "red" }}>
                    {errors.gender?.[0]}
                </p>

                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EmployeeForm;

*/
/* 

If your React state uses the same field names as your Laravel database columns (first_name, last_name, etc.),
then the code becomes much simpler because you can send the entire employee object directly.


import { useState } from "react";
import axios from "axios";

function EmployeeForm() {

    const API_URL = "http://127.0.0.1:8000/api/employees";

    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        course: "",
        gender: "",
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const addEmployee = async () => {
        await axios.post(API_URL, employee);
        alert("Employee Added Successfully");
    };

    const clearForm = () => {
        setEmployee({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            city: "",
            course: "",
            gender: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addEmployee();
            clearForm();
        }
        catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <form onSubmit={handleSubmit}>

                <h2>Employee Registration Form</h2>

                <p>
                    <label>First Name</label>
                    <br />
                    <input
                        type="text"
                        name="first_name"
                        value={employee.first_name}
                        onChange={handleChange}
                    />
                </p>

                <p>
                    <label>Last Name</label>
                    <br />
                    <input
                        type="text"
                        name="last_name"
                        value={employee.last_name}
                        onChange={handleChange}
                    />
                </p>

                <p>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                    />
                </p>

                <p>
                    <label>Phone</label>
                    <br />
                    <input
                        type="text"
                        name="phone"
                        value={employee.phone}
                        onChange={handleChange}
                    />
                </p>

                <p>
                    <label>City</label>
                    <br />
                    <select
                        name="city"
                        value={employee.city}
                        onChange={handleChange}
                    >
                        <option value="">-- Select City --</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bengaluru">Bengaluru</option>
                    </select>
                </p>

                <p>
                    <label>Course</label>
                    <br />
                    <input
                        type="text"
                        name="course"
                        value={employee.course}
                        onChange={handleChange}
                    />
                </p>

                <p>
                    <label>Gender</label>
                    <br />

                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={employee.gender === "Male"}
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
                            checked={employee.gender === "Female"}
                            onChange={handleChange}
                        />
                        Female
                    </label>
                </p>

                <button type="submit">
                    Submit
                </button>

            </form>
        </div>
    );
}

export default EmployeeForm;


*/



//=====================================Best approach==============================================

import { useState } from "react";
import axios from "axios";

function EmployeeForm() {

    //==========================
    // API URL
    //==========================
    const API_URL = "http://127.0.0.1:8000/api/employees";

    //==========================
    // Employee State
    // Stores form values
    //==========================
    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        course: "",
        gender: "",
    });

    //==========================
    // Validation Error State
    // Stores Laravel validation errors
    //==========================
    const [errors, setErrors] = useState({});

    //==========================
    // Handle Input Changes
    // Updates the state whenever user types
    //==========================
    const handleChange = (e) => {

        setEmployee({
            ...employee,

            // e.target.name -> input name
            // e.target.value -> current value
            [e.target.name]: e.target.value,
        });

    };

    //==========================
    // POST Request
    // Adds a new employee
    //==========================
    const addEmployee = async () => {

        await axios.post(API_URL,employee)

        alert("Employee Added Successfully");
    };

    //==========================
    // Form Submit
    //==========================
    const handleSubmit = async (e) => {

        // Prevent page refresh
        e.preventDefault();

        try {

            // Call POST request
            await addEmployee();

            // Clear all validation errors
            setErrors({});

            // Reset Form
            setEmployee({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                city: "",
                course: "",
                gender: "",
            });

        }

        catch (error) {

            // Validation Error (422)
            if (error.response && error.response.status === 422) {

                // Store validation errors
                setErrors(error.response.data.errors);

            }
            else {

                alert("Something went wrong");

            }

        }

    };

    return (
// style={{ marginBottom: "15px" }}-> Leave 15 pixels of space below this element.
//style={{display: "inline-block",width: "110px"}}-> It is used to align all text fields

        <div style={{width:"600px",margin:"30px auto" }}>

            <form onSubmit={handleSubmit}>

                <h2>Employee Registration Form</h2>

               
                <div style={{ marginBottom: "15px" }}> 

                 <label style={{display: "inline-block",width: "110px"}}>
                        First Name*:
                    </label>

                    <input type="text" name="first_name" value={employee.first_name} onChange={handleChange} />

                   
                    <div style={{color: "red", marginLeft: "110px"}}>
                        {errors.first_name?.[0]}
                    </div>

                </div>

             
                <div style={{ marginBottom: "15px" }}>

                    <label
                        style={{display: "inline-block", width: "110px"}}>
                        Last Name*:
                    </label>

                    <input type="text" name="last_name" value={employee.last_name} onChange={handleChange}/>

                    <div
                        style={{color: "red",marginLeft: "110px"}}>
                        {errors.last_name?.[0]}
                    </div>

                </div>

               
                <div style={{ marginBottom: "15px" }}>

                    <label style={{display: "inline-block", width: "110px"}}>
                        Email*:
                    </label>

                    <input type="email" name="email" value={employee.email} onChange={handleChange}/>

                    <div style={{color: "red",marginLeft: "110px"}}>
                        {errors.email?.[0]}
                    </div>

                </div>

               
                <div style={{ marginBottom: "15px" }}>

                    <label style={{display: "inline-block", width: "110px"}}>
                        Phone*:
                    </label>

                    <input type="text" name="phone" value={employee.phone} onChange={handleChange}/>

                    <div style={{color: "red",marginLeft: "110px"}}>
                        {errors.phone?.[0]}
                    </div>

                </div>

                <div style={{ marginBottom: "15px" }}>

                    <label style={{display: "inline-block",width: "110px"}}>
                        City*:
                    </label>

                    <select
                        name="city"
                        value={employee.city}
                        onChange={handleChange}
                    >
                        <option value="">-- Select City --</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bengaluru">Bengaluru</option>
                    </select>

                    <div style={{color: "red",marginLeft: "110px"}}>
                        {errors.city?.[0]}
                    </div>

                </div>

                <div style={{ marginBottom: "15px" }}>

                    <label style={{display: "inline-block",width: "110px"}}>
                        Course*:
                    </label>

                    <input type="text" name="course" value={employee.course} onChange={handleChange}/>

                    <div style={{color: "red",marginLeft: "110px"}}>
                        {errors.course?.[0]}
                    </div>

                </div>

               
                <div style={{ marginBottom: "15px" }}>

                    <label style={{display: "inline-block",width: "110px"}}>
                        Gender*:
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={employee.gender === "Male"}
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
                            checked={employee.gender === "Female"}
                            onChange={handleChange}
                        />

                        Female

                    </label>

                    <div style={{color: "red",marginLeft: "110px"}}>
                        {errors.gender?.[0]}
                    </div>

                </div>

                <button type="submit">Submit</button>

            </form>

        </div>

    );
}

export default EmployeeForm;

