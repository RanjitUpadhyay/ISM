import axios from "axios";
import { useState, useEffect } from "react";

function MemberForm() {
    const [member, setMember] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        gender: ""
    });

    const [members, setMembers] = useState([]);
    const [editId, setEditId] = useState(null);

    const URL = "http://127.0.0.1:8000/api/member";

    const handleChange = async (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value
        });
    };

    const getAllMembers = async () => {
        const response = await axios.get(URL);
        setMembers(response.data);
    }

    useEffect(() => {
        getAllMembers();
    }, [])

    const addMember = async () => {
        const response = await axios.post(URL, member);
        alert("Member added");
    }

    const updateMember = async () => {
        const response = await axios.put(`${URL}/${editId}`, member)
        alert("Member Updated");
        getAllMembers();
    }

    const getSingleMember = async (id) => {
        const response = await axios.get(`${URL}/${id}`, member);
        setEditId(id);
        setMember(response.data);
    }

    const deleteMember = async (id) => {
        const confirmDele = window.confirm("Delete Member?");
        if (!confirmDele) {
            return;
        }

        else {
            const response = await axios.delete(`${URL}/${id}`)
            alert("Member Deleted");
            getAllMembers();
        }
    }

    const clearForm = () => {
        setMember({
            name: "",
            email: "",
            phone: "",
            city: "",
            gender: ""
        });
        setEditId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId == null) {
            await addMember();
        }
        else {
            await updateMember();
        }

        clearForm();
        getAllMembers();
    }

    return (
        <div style={{ width: "600px", margin: "30px auto" }}>

            <form onSubmit={handleSubmit}>
                <h1>Member Form</h1>

                <p>
                    <input type="text" name="name" placeholder="Name" value={member.name} onChange={handleChange} />
                </p>

                <p>
                    <input type="text" name="email" placeholder="Email" value={member.email} onChange={handleChange} />
                </p>

                <p>
                    <input type="text" name="phone" placeholder="Phone" value={member.phone} onChange={handleChange} />
                </p>

                <p>
                    <select name="city" value={member.city} onChange={handleChange}>
                        <option value="">Select City</option>
                        <option>Delhi</option>
                        <option>Noida</option>
                        <option>Kolkata</option>
                        <option>Mumbai</option>

                    </select>
                </p>

                <p>
                    <label>Gender:</label>
                    <label htmlFor="male">
                        <input type="radio" id="male" name="gender" value="Male" checked={member.gender === "Male"} onChange={handleChange} />Male
                    </label>
                    &nbsp; &nbsp;
                    <label htmlFor="female">
                        <input type="radio" id="female" name="gender" value="Female" checked={member.gender === "Female"} onChange={handleChange} />Female
                    </label>
                </p>

                <button>{editId == null ? "Save" : "Update"}</button>


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
                    {members.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.city}</td>
                                <td>{item.gender}</td>
                                <td>
                                    <button onClick={() => getSingleMember(item.id)}>Edit</button>
                                    &nbsp;
                                    <button onClick={() => deleteMember(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>

            </table>

        </div>
    )

}

export default MemberForm;