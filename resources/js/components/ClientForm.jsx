import { useState, useEffect } from "react";
import axios from "axios";

function ClientForm() {
    const [client, setClient] = useState({
        name: "",
        email: "",
        city: "",
        gender: ""
    });

    const [clients, setClients] = useState([]);

    const [editId, setEditId] = useState(null);

    const API_URL = "http://127.0.0.1:8000/api/client";

    const handleChange = async (e) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value
        });
    };

    const getAllClients = async () => {
        const response = await axios.get(API_URL);
        setClients(response.data);
    };

    useEffect(() => {
        getAllClients();
    }, [])

    const addClient = async () => {
        const response = await axios.post(API_URL, client);
        alert("Client Added Successfully");
    };

    const updateClient = async () => {
        const response = await axios.put(`${API_URL}/${editId}`, client);
        alert("Client Updated Successfully");
    };

    const getSingleClient = async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        setClient(response.data);
        setEditId(id);
    };

    const removeClient = async (id) => {
        const confirmDele = window.confirm("Delete this client?");

        if (!confirmDele) {
            return;
        }
        else {
            const response = await axios.delete(`${API_URL}/${id}`);
            alert("Client Deleted.");
            getAllClients();
        };
    }
    const clearForm = () => {
        setClient({
            name: "",
            email: "",
            city: "",
            gender: ""
        });

        setEditId(null);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId === null) {
            await addClient();
        }
        else {
            await updateClient();

        }
        clearForm();
        getAllClients();
    }

    return (
        <div style={{ width: "600px", margin: "30px auto" }}>

            <h1>Client Form</h1>

            <form onSubmit={handleSubmit}>

                <p>
                    <input type="text" name="name" placeholder="Name" value={client.name} onChange={handleChange} />
                </p>

                <p>
                    <input type="text" name="email" placeholder="Email" value={client.email} onChange={handleChange} />
                </p>

                <p>
                    <select name="city" value={client.city} onChange={handleChange}>
                        <option value="">select city</option>
                        <option>Delhi</option>
                        <option>Mumbai</option>
                        <option>Dhanbad</option>
                        <option>Chennai</option>
                        <option>Kolkata</option>
                    </select>
                </p>
                <p>
                    <label>Gender:</label>
                    <label htmlFor="male">
                        <input type="radio" id="male" name="gender" value="Male" checked={client.gender === "Male"} onChange={handleChange} />Male
                    </label>
                    &nbsp; &nbsp;

                    <label htmlFor="female">
                        <input type="radio" id="female" name="gender" value="Female" checked={client.gender === "Female"} onChange={handleChange} />Female
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
                        <th>City</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {clients.map((item) => (

                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.city}</td>
                            <td>{item.gender}</td>

                            <td>
                                <button onClick={() => getSingleClient(item.id)}>Edit</button>
                                &nbsp;
                                <button onClick={() => removeClient(item.id)}>Delete</button>
                            </td>
                        </tr>

                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default ClientForm;