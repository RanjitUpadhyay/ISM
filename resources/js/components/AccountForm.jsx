import axios from "axios";
import { useState, useEffect } from "react";

function AccountForm() {
    const [account, setAccount] = useState({
        name: "",
        email: "",
        city: "",
        gender: ""
    })

    const [accounts, setAccounts] = useState([]);
    const [editId, setEditId] = useState(null);
    const URL = "http://127.0.0.1:8000/api/account";

    const getAllAccounts = async () => {
        const response = await axios.get(URL);
        setAccounts(response.data);
    }

    useEffect(() => {
        getAllAccounts();
    }, []);


    const handleChange = async (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
    }

    const addAccount = async () => {
        const response = await axios.post(URL, account);
        alert("Accound Added");
    }

    const updateAccount = async () => {
        const response = await axios.put(`${URL}/${editId}`, account);
        alert("Account Updated");
    }

    const getSingleAccount = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setAccount(response.data);
        setEditId(id);
    }

    const removeAccount = async (id) => {
        const confirmDele = window.confirm("Delete Account?");

        if (!confirmDele) {
            return;
        }
        else {
            const response = await axios.delete(`${URL}/${id}`);
            alert("Account Deleted")
            getAllAccounts();
        }

    }

    const clearForm = () => {
        setAccount({
            name: "",
            email: "",
            city: "",
            gender: ""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId == null) {
            await addAccount();
        }
        else {
            await updateAccount();
        }
        clearForm();
        getAllAccounts();
    }

    return (
        <div style={{ width: "600px", margin: "30px auto" }}>
            <h1>Account Form</h1>

            <form onSubmit={handleSubmit}>

                <p>
                    <input type="text" name="name" placeholder="Name" value={account.name} onChange={handleChange} />
                </p>

                <p>
                    <input type="text" name="email" placeholder="Email" value={account.email} onChange={handleChange} />
                </p>

                <p>
                    <select name="city" value={account.city} onChange={handleChange}>
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
                        <input type="radio" name="gender" id="male" value="Male" checked={account.gender === "Male"} onChange={handleChange} />Male
                    </label>

                    &nbsp;&nbsp;

                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="Female" checked={account.gender === "Female"} onChange={handleChange} />Female
                    </label>
                </p>

                <button type="submit">{editId == null ? "Save" : "Update"}</button>
            </form>

            <table border="1" cellPadding="8">
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Gender</th>
                    <th>Action</th>
                </thead>

                <tbody>
                    {accounts.map((item) => {
                        return (<tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.city}</td>
                            <td>{item.gender}</td>
                            <td>
                                <button onClick={() => getSingleAccount(item.id)}>Edit</button>
                                &nbsp;
                                <button onClick={() => removeAccount(item.id)}>Delete</button>


                            </td>
                        </tr>


                        )
                    })}

                </tbody>
            </table>

        </div>
    )
}

export default AccountForm;