import { useState, useEffect } from "react";
import axios from "axios";

function ProfileForm() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        city: "",
        gender: ""
    });

    const [profiles, setProfiles] = useState([]);
    const [editId, setEditId] = useState(null);
    const API_URL = "http://127.0.0.1:8000/api/profile";

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    }

    const getAllProfiles = async () => {
        const response = await axios.get(API_URL);
        setProfiles(response.data);
    };

    useEffect(() => {
        getAllProfiles();
    }, []);

    const addProfile = async () => {
        const response = await axios.post(API_URL, profile);
        alert("Profile Added");
    };

    const updateProfile = async () => {
        const response = await axios.put(`${API_URL}/${editId}`, profile);
        alert("Profile Updated");
    };

    const getSingleProfile = async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        setProfile(response.data);
        setEditId(id);
    };

    const removeProfile = async (id) => {
        const confirmDele = window.confirm("Delete Profile?");
        if (!confirmDele) {
            return;
        }
        else {
            const response = await axios.delete(`${API_URL}/${id}`);
            alert("Profile Deleted");
            getAllProfiles();
        }
    };

    const clearForm = () => {
        setProfile({
            name: "",
            email: "",
            city: "",
            gender: ""
        });
        setEditId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editId === null) {
            await addProfile();
        }
        else {
            await updateProfile();
        }
        clearForm();
        getAllProfiles();
    }
    return (
        <div style={{ width: "600px", margin: "30px auto" }}>

            <h1>Profile Form</h1>

            <form onSubmit={handleSubmit}>
                <p>
                    <input type="text" name="name" placeholder="Name" value={profile.name} onChange={handleChange} />
                </p>

                <p>
                    <input type="text" name="email" placeholder="Email" value={profile.email} onChange={handleChange} />
                </p>
                <p>
                    <select name="city" value={profile.city} onChange={handleChange}>
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

                    <input type="radio" id="male" name="gender" value="Male" checked={profile.gender === "Male"} onChange={handleChange} />Male
                    </label>
                    &nbsp; &nbsp;

                    <label htmlFor="female">
                    <input type="radio" id="female" name="gender" value="Female" checked={profile.gender === "Female"} onChange={handleChange} />Female

                    </label>
                </p>

                <button type="submit">{editId == null ? "Save" : "Update"}</button>
            </form>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {profiles.map((item) => {
                        return (<tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.city}</td>
                            <td>{item.gender}</td>
                            <td>
                                <button onClick={() => getSingleProfile(item.id)}>Edit </button>
                                &nbsp;
                                <button onClick={() => removeProfile(item.id)}> Delete</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>

            </table>

        </div>
    )

}

export default ProfileForm;