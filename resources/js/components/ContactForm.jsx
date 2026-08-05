import { useState, useEffect } from "react";
import axios from "axios";

function ContactForm() {
    const [contact, setContact] = useState({
        'name': "",
        'email': "",
        'phone': "",
        'city': "",
        'gender': ""
    });

    const [contacts, setContacts] = useState([]);
    const [editId, setEditId] = useState(null);

    //const → Declares variables whose references won't be reassigned.
    //[errors, setErrors] → Array destructuring returned by the useState hook.
    //errors → State variable that stores the validation errors.
    //setErrors → Function used to update the errors state.
    //useState() → React Hook used to create and manage state in a functional component.
    //{} → The initial value of the errors state is an empty object, meaning there are no validation errors initially.
    //useState({}) → Initializes the errors state as an empty object (no errors).

    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/contact";

    const handleChange = (e) => {
        setContact({                                  
            ...contact,
            [e.target.name]: e.target.value
        });
                                          //setErrors() →Update the validation errors state.             
        setErrors({                    //setErrors() → Updates the errors state. and { } → Creates a new errors object.

            ...errors,                 //...errors → Copies all existing validation errors into the new object i.e Keep all existing errors.

            [e.target.name]: null    //[e.target.name] → Gets the name of the input field that the user is typing in (e.g., "name", "email", "phone").
                                   //: null → Removes the error for that particular field by setting its value to null,, leaving all other field errors unchanged.
        });
    }

    const getAllContacts = async () => {
        const response = await axios.get(URL);
        setContacts(response.data);
    }

    useEffect(() => {
        getAllContacts();
    }, []);

    const addContact = async () => {
        const response = await axios.post(URL, contact);
        alert("Contact Added");
    }

    const getSingleContact = async (id) => {
        const response = await axios.get(`${URL}/${id}`)
        setContact(response.data);
        setEditId(id);
    }

    const updateContact = async () => {
        const response = await axios.put(`${URL}/${editId}`, contact);
        alert("Contact Updated");
    }

    const deleteContact = async (id) => {
        const confirmDelete = window.confirm("Delete contact?");
        if (!confirmDelete) {
            return;
        }
        else {
            const response = await axios.delete(`${URL}/${id}`);
            alert("Contact Deleted");
            await getAllContacts();
        }
    }

    const clearForm = () => {
        setContact({
            'name': "",
            'email': "",
            'phone': "",
            'city': "",
            'gender': ""
        });
        setEditId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (editId === null) {
                await addContact();
            }

            else {
                await updateContact();
                setEditId(null);//Otherwise, clicking Submit again will keep updating instead of adding a new contact.
            }
            setErrors({});//it runs after both Add and Update.
            clearForm();
            await getAllContacts();
        }

        catch (error) {   //  error is an object that contains all information about the error and it is an object sent by Axios.
                                                                    //error.response- The HTTP response returned by the server (Laravel).
            if (error.response && error.response.status === 422) {   // The HTTP status code->422-Validation Error
                setErrors(error.response.data.errors);   //The validation errors returned by Laravel. 
            }                                            //setErrors(...)-Stores the validation errors in the React state.
            else {
                alert("Something went wrong");     //Displays a message for non-validation errors (404, 500, network errors, etc.).
            }

        }
    }

    //display: "inline-block" → Keep it inline but allow width/height.
    //width: "110px" → Reserve exactly 110 pixels for this label.

    //errors → The validation errors object you created in useState
    //.email → Get the errors for the email field.
    //?.(Optional Chaining) → If email exists, continue; otherwise return undefined.
    //[0] → Display the first error message.

    return (<div style={{ width: "600px", margin: "30px auto" }}>

        <form onSubmit={handleSubmit}>
            <h1>Contact Form</h1>

            <div style={{ marginBottom: "15px" }}>

                <label style={{ display: "inline-block", width: "110px" }}>Name*:</label>
                <input type="text" name="name" value={contact.name} onChange={handleChange} />
                <div style={{ color: "red", marginLeft: "110px" }}>{errors.name?.[0]}</div>

            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "inline-block", width: "110px" }}>Email*:</label>
                <input type="text" name="email" value={contact.email} onChange={handleChange} />
                <div style={{ color: "red", marginLeft: "110px" }}>{errors.email?.[0]}</div>
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "inline-block", width: "110px" }}>Phone*:</label>
                <input type="text" name="phone" value={contact.phone} onChange={handleChange} />
                <div style={{ color: "red", marginLeft: "110px" }}>{errors.phone?.[0]}</div>

            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "inline-block", width: "110px" }}>City*:</label>
                <select name="city" value={contact.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Noida">Noida</option>
                </select>
                <div style={{ color: "red", marginLeft: "110px" }}>{errors.city?.[0]}</div>
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "inline-block", width: "110px" }}>
                    Gender*:
                </label>

                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={contact.gender === "Male"}
                        onChange={handleChange}
                    />
                    Male
                </label>

                <label style={{ marginLeft: "15px" }}>
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={contact.gender === "Female"}
                        onChange={handleChange}
                    />
                    Female
                </label>

                <div style={{ color: "red", marginLeft: "110px" }}>
                    {errors.gender?.[0]}
                </div>
            </div>

            <p>
                <button type="submit">{editId == null ? "Save" : "Update"}</button>
            </p>
            <hr />
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

            <tbody >
                {contacts.map((item) => {
                    return (<tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.city}</td>
                        <td>{item.gender}</td>

                        <td>
                            <button onClick={() => getSingleContact(item.id)}>Edit</button>
                            &nbsp;&nbsp;
                            <button onClick={() => deleteContact(item.id)}>Delete</button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>

    </div>

    )
}

export default ContactForm;