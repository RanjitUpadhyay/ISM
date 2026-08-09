import { useEffect, useState } from "react";
import axios from "axios";

function RestaurantForm() {
    const [restaurant, setRestaurant] = useState({

        "name": "",
        "email": "",
        "phone": "",
        "booking_date": "",
        "table_no": "",
        "table_status": "available",
        "booking_status": "",
        "payment_mode": "",
        "payment_status": "",
        "total_bill": ""


    });

    const [restaurants, setRestaurants] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/restaurant";

    const handleChange = (e) => {
        setRestaurant({
            ...restaurant,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });

    }

    const getAllCustomers = async () => {

        const response = await axios.get(URL);
        setRestaurants(response.data);
    }

    const getSingleCustomer = async (booking_id) => {
        const response = await axios.get(`${URL}/${booking_id}`);
        setRestaurant(response.data);
        setEditId(booking_id);
    }

    const addCustomer = async () => {
        await axios.post(URL, restaurant);
        alert("Customer Added");
    }

    const upadateCustomer = async () => {
        await axios.put(`${URL}/${editId}`, restaurant);
        alert("Customer Updated")
    }

    const deleteCustomer = async (booking_id) => {
        const confirmDelete = window.confirm("Delete Customer ?");

        if (!confirmDelete) {
            return;
        }
        else {
            await axios.delete(`${URL}/${booking_id}`)
        }
        getAllCustomers()
    }

    const clearForm = () => {
        setRestaurant({
            "name": "",
            "email": "",
            "phone": "",
            "booking_date": "",
            "table_no": "",
            "table_status": "available",
            "booking_status": "",
            "payment_mode": "",
            "payment_status": "",
            "total_bill": ""
        });

        setEditId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId === null) {
                await addCustomer();
            }

            else {
                await upadateCustomer()
                setEditId(null);
            }

            await getAllCustomers();
            setErrors({});
            clearForm();
        }

        catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            else {
                alert("Something went Wrong");
            }
        }
    }

    return (
        <div style={{ width: "600px", margin: "30px auto" }}>

            <form onSubmit={handleSubmit}>

                <h1>Restaurant Form</h1>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Name:</label>
                    <input type="text" name="name" value={restaurant.name} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.name?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Email:</label>
                    <input type="text" name="email" value={restaurant.email} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.email?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Phone:</label>
                    <input type="text" name="phone" value={restaurant.phone} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.phone?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Booking Date:</label>
                    <input type="datetime-local" name="booking_date" value={restaurant.booking_date} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.booking_date?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Table No:</label>

                    <input type="number" name="table_no" value={restaurant.table_no} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.table_no?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Table Status:</label>
                    <label htmlFor="available">
                        <input type="radio" name="table_status" id="available" value="available" checked={restaurant.table_status === 'available'} onChange={handleChange} />Available
                    </label>  &nbsp; &nbsp;
                    <label htmlFor="occupied">
                        <input type="radio" name="table_status" id="occupied" value="occupied" checked={restaurant.table_status === "occupied"} onChange={handleChange} />Occupied
                    </label>

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.table_status?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Booking Status:</label>
                    <select name="booking_status" value={restaurant.booking_status} onChange={handleChange}>
                        <option value="">Select Booking Status</option>
                        <option value="booked">Booked</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                    </select>

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.booking_status?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Payment Mode:</label>

                    <select name="payment_mode" value={restaurant.payment_mode} onChange={handleChange}>
                        <option value="">Select Payment Mode</option>
                        <option value="cash">Cash</option>
                        <option value="upi">UPI</option>
                        <option value="card">Card</option>
                        <option value="net_banking">Net Banking</option>
                    </select>


                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.payment_mode?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Payment Status:</label>

                    <select name="payment_status" value={restaurant.payment_status} onChange={handleChange}>
                        <option value="">Select Payment Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="refunded">Refunded</option>

                    </select>


                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.payment_status?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Total Bill:</label>
                    <input type="number" name="total_bill" value={restaurant.total_bill} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.total_bill?.[0]}</div>
                </div>

                <p>
                    <button type="submit">{editId === null ? "Save" : "Update"}</button>
                </p>
            </form>

            <hr />

            <table border="1" cellPadding="8">

                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Booking Date</th>
                        <th>Table No</th>
                        <th>Table Status</th>
                        <th>Booking Status</th>
                        <th>Payment Mode</th>
                        <th>Payment Status</th>
                        <th>Total Bill</th>
                        <th>Action</th>

                    </tr>
                </thead>

                <tbody>
                    {restaurants.map((item) => {
                        return (<tr key={item.booking_id}>
                            <td>{item.booking_id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.booking_date}</td>
                            <td>{item.table_no}</td>
                            <td>{item.table_status}</td>
                            <td>{item.booking_status}</td>
                            <td>{item.payment_mode}</td>
                            <td>{item.payment_status}</td>
                            <td>{item.total_bill}</td>

                            <td>
                                <button type="button" onClick={() => getSingleCustomer(item.booking_id)}>Edit</button>
                                &nbsp;
                                <button type="button" onClick={()=>deleteCustomer(item.booking_id)}>Delete</button>
                            </td>
                        </tr>)
                    })}
                </tbody>


            </table>

        </div>
    )

}

export default RestaurantForm;