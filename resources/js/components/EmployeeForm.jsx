// EmployeeForm.jsx
// No CSS file is required because all styling is done using inline styles.

import { useState } from "react";
import axios from "axios";         //import axios for postman tool 

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    course: "",
    gender: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle form submission-> Old code 
  
 // const handleSubmit = (e) => {
 //   e.preventDefault();

 //   console.log(employee);

 //   alert("Form Submitted Successfully!");
//  }; 

const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response=await axios.post(
            "http://127.0.0.1:8000/api/employees",
            {
                first_name:employee.firstName,
                last_name:employee.lastName,
                email: employee.email,
                phone:employee.phone,
                city:employee.city,
                course:employee.course,
                gender:employee.gender,
            }
        );

        alert(response.data.message);
        console.log(response.data);

        //clear form
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
    catch(error){
        console.log(error);
        alert("Something went wrong");
    }
};

  // Input Style
  const inputStyle = {
    width: "250px",
    padding: "8px",
    border: "1px solid gray",
    borderRadius: "5px",
    fontSize: "15px",
  };

  // Button Style
  const buttonStyle = {
    width: "120px",
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "50px auto",
        padding: "25px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "25px",
        }}
      >
        Employee Registration Form
      </h2>

      <form onSubmit={handleSubmit}>
        <table cellPadding="10">
          <tbody>
            <tr>
              <td>
                <b>First Name</b>
              </td>
              <td>
                <input
                  type="text"
                  name="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr>
              <td>
                <b>Last Name</b>
              </td>
              <td>
                <input
                  type="text"
                  name="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr>
              <td>
                <b>Email</b>
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr>
              <td>
                <b>Phone</b>
              </td>
              <td>
                <input
                  type="text"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr>
              <td>
                <b>City</b>
              </td>
              <td>
                <input
                  type="text"
                  name="city"
                  value={employee.city}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr>
              <td>
                <b>Course</b>
              </td>
              <td>
                <input
                  type="text"
                  name="course"
                  value={employee.course}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr>
              <td>
                <b>Gender</b>
              </td>

              <td>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={employee.gender === "Male"}
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>

                &nbsp;&nbsp;&nbsp;&nbsp;

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={employee.gender === "Female"}
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
              </td>
            </tr>

            <tr>
              <td></td>

              <td>
                <button type="submit" style={buttonStyle}>
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default EmployeeForm;