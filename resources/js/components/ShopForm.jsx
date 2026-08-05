import { useState, useEffect } from "react";
import axios from "axios";

function ShopForm() {
    const [shop, setShop] = useState({
        'name': "",
        'email': "",
        'phone': "",
        'city': "",
        'gender': ""
    });

    const [shops, setShops] = useState([]);
    const [editId, setEditId] = useState(null);

    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/shop";

    const getAllShops = async () => {
        const response = await axios.get(URL)
        setShops(response.data);

       
    }

    useEffect(() => {
        getAllShops();
    }, []);

    const handleChange = (e) => {
        setShop({
            ...shop,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    };

    const getSingleShop = async (id) => {
        const response = await axios.get(`${URL}/${id}`)
        setShop(response.data);
        setEditId(id);
    }

    const addShop = async () => {
        await axios.post(URL, shop);
        alert("Shop Added");

       
    }

    const updateShop = async () => {
        await axios.put(`${URL}/${editId}`, shop);
        alert("Shop Updated");
    }

    const deleteShop = async (id) => {

        const confirmDelete = window.confirm("Delete?");
        if (!confirmDelete) {
            return;
        }
        else {
            await axios.delete(`${URL}/${id}`)
            alert("Shop Deleted");
            getAllShops();
        }
    }

    const clearForm = () => {
        setShop({
            'name': "",
            'email': "",
            'phone': "",
            'city': "",
            'gender': ""
        })

        setEditId(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId === null) {
                await addShop();
            }

            else {
                await updateShop();
                setEditId(null);
            }
            setErrors({});
            clearForm();
            
            await getAllShops();

        }

        catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            else {
                alert("Something went wrong");
            }

        }
    }

    return (
        <div style={{ margin: "30px auto", width: "600px" }}>

            <h1>Shop Form</h1>

            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:"15px"}}>
                    <input type="text" value={shop.name} placeholder="Name" name="name" onChange={handleChange} />
                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.name?.[0]}</div>

                    </div>

                <div style={{ marginBottom:"15px"}}>
                    <input type="text" name="email" placeholder="Email" value={shop.email} onChange={handleChange} />
                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.email?.[0]}</div>
                </div>

                <div style={{ marginBottom:"15px"}}>
                    <input type="text" name="phone" value={shop.phone} placeholder="Phone" onChange={handleChange} />
                    <div style={{color:"red", marginLeft:"110px"}}>{errors.phone?.[0]}</div>
                </div>

                <div style={{ marginBottom:"15px"}}>
                    <label>City:</label>
                    <select name="city" value={shop.city} onChange={handleChange} >
                        <option value="">Select City</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>
                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.city?.[0]}</div>
                </div>

                

                <div style={{ marginBottom:"15px"}}>
                    <label>Gender:</label>
                    <label htmlFor="male">
                        <input type="radio" name="gender" value="Male" id="male" checked={shop.gender === "Male"} onChange={handleChange} />Male
                    </label>

                    &nbsp; &nbsp;

                    <label htmlFor="female">
                        <input type="radio" id="female" value="Female" name="gender" checked={shop.gender === "Female"} onChange={handleChange} />Female
                    </label>

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.gender?.[0]}</div>

                </div>

                <div style={{ marginBottom:"15px"}}>
                    <button type="submit">{editId === null ? "Save" : "Upadate"}</button>
                </div>

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

                    {shops.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.city}</td>
                                <td>{item.gender}</td>

                                <td>
                                    <button type="button" onClick={() => getSingleShop(item.id)}>Edit</button>
                                    &nbsp;
                                    <button type="button" onClick={() => deleteShop(item.id)}>Delete</button>
                                </td>

                            </tr>
                        )
                    })}

                </tbody>

            </table>

        </div>
    )



}

export default ShopForm;