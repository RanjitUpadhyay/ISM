import { useEffect, useState } from "react";
import axios from "axios";

function HouseForm() {
    const [house, setHouse] = useState({
        'name': "",
        'email': "",
        'phone': "",
        'city': "",
        'gender': ""
    })

    const [houses, setHouses] = useState([]);
    const [editId, setEditId] = useState(null);

    const URL = "http://127.0.0.1:8000/api/house";

    const [errors, setErrors] = useState({});

    const getAllHouses = async () => {
        const response = await axios.get(URL);
        setHouses(response.data);
    }

    useEffect(() => {
        getAllHouses();
    }, []);

    const addHouse = async () => {
        await axios.post(URL, house);
        alert("House Added");
    }

    const getSingleHouse = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        setHouse(response.data);
        setEditId(id)

    }

    const updateHouse = async () => {
        await axios.put(`${URL}/${editId}`, house);
        alert("House Updated");

    }

    const deleteHouse = async (id) => {
        const confirmDelete = window.confirm("Delete House?");
        if (!confirmDelete) {
            return;
        }
        else {
            const response = await axios.delete(`${URL}/${id}`);
            alert("House Deleted");
             await getAllHouses();
        }
    }

    const clearForm = () => {
        setHouse({
            'name': "",
            'email': "",
            'phone': "",
            'city': "",
            'gender': ""

        });
        setEditId(null);
    }

    const handleChange = (e) => {

        setHouse({
            ...house,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId === null) {
                await addHouse();
            }
            else {
                await updateHouse();
                setEditId(null);
            }

            setErrors({});
            clearForm();
            await getAllHouses();
        }

        catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            }
            else {
                alert("Something went Wrong");
            }

        }
    }

    return (
        <div style={{ width: "600px", margin: "30px auto" }}>

            <h1>House Form</h1>

            <form onSubmit={handleSubmit}>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "inline-block", width: "115px" }}>Name*:</label>
                    <input type="text" name="name" value={house.name} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.name?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "inline-block", width: "115px" }}>Email*:</label>
                    <input type="text" name="email" value={house.email} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "115px" }}>{errors.email?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "inline-block", width: "115px" }}>Phone*:</label>
                    <input type="text" name="phone" value={house.phone} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "115px" }}>{errors.phone?.[0]}</div>

                </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "inline-block", width: "115px" }}>City*:</label>
                        <select name="city" value={house.city} onChange={handleChange}>
                            <option value="">Select City</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Noida">Noida</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                        </select>
                        <div style={{ color : "red", marginLeft : "115px" }}>{errors.city?.[0]}</div>
                    </div>


                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "inline-block", width: "115px" }}>Gender*:</label>
                    <label htmlFor="male">
                        <input type="radio" value="Male" name="gender" id="male" checked={house.gender === "Male"} onChange={handleChange} />Male
                    </label>

                    &nbsp;&nbsp;

                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="Female" checked={house.gender === "Female"} onChange={handleChange} />Female
                    </label>

                    <div style={{ color : "red", marginLeft : "115px" }}>{errors.gender?.[0]}</div>
                </div>

                <p>
                    <button type="submit">{editId == null ? "Save" : "Update"}</button>
                </p>

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
                        {houses.map((item) => {
                            return (<tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.city}</td>
                                <td>{item.gender}</td>

                                <td>
                                    <button onClick={() => getSingleHouse(item.id)}>Edit</button>
                                    &nbsp;
                                    <button onClick={() => deleteHouse(item.id)}>Delete</button>
                                </td>
                            </tr>

                            )

                        })}

                    </tbody>
                </table>




            </form>

        </div>
    )


}

export default HouseForm;
