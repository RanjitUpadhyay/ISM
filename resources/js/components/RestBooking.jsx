import axios from "axios";
import { useState, useEffect } from "react";

function RestBooking() {
    const [booking, setBooking] = useState({
        name: "",
        phone: "",
        booking_date: "",
        table_no: "",

        payment_status: "",
        payment_mode: "",
        total_bill: ""
    });

    const [bookings, setBookings] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/restbooking";

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]: null
        })
    }

    const getAllBookings = async () => {
        const response = await axios.get(URL);
        setBookings(response.data);
    }

    useEffect(() => {
        getAllBookings();
    }, []);

    const getSingleBooking = async (booking_id) => {
        const response = await axios.get(`${URL}/${booking_id}`);
        const data = response.data;
        setBooking({
            name: data.name,
            phone: data.phone,
            booking_date: data.booking_date,
            table_no: data.table_no,

            payment_status: data.payment?.payment_status || "",
            payment_mode: data.payment?.payment_mode || "",
            total_bill: data.payment?.total_bill || ""

        })
        setEditId(booking_id);
    }

    const addBooking = async () => {
        await axios.post(URL, booking);
        alert("Booking Added");
    }

    const updateBooking = async () => {
        await axios.put(`${URL}/${editId}`, booking);
        alert("Booking Updated");

    }

    const deleteBooking = async (booking_id) => {
        const confirmDelete = window.confirm("Delete Booking?");

        if (!confirmDelete) {
            return;
        }
        else {
            await axios.delete(`${URL}/${booking_id}`);
            alert("Booking Deleted");
            getAllBookings();
        }

    }

    const clearForm = () => {
        setBooking({
            name: "",
            phone: "",
            booking_date: "",
            table_no: "",

            payment_status: "",
            payment_mode: "",
            total_bill: ""
        })

        setEditId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId === null) {
                await addBooking();
            }

            else {
                await updateBooking();
                setEditId(null);
            }

            await getAllBookings();
            clearForm();
            setErrors({});
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
        <div style={{ width: "600px", margin: "30px auto" }}>

            <form onSubmit={handleSubmit}>

                <h1>Booking Form</h1>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Name:</label>
                    <input type="text" name="name" value={booking.name} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.name?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Phone:</label>
                    <input type="text" name="phone" value={booking.phone} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.phone?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Booking Date:</label>
                    <input type="date" name="booking_date" value={booking.booking_date} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.booking_date?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Table No:</label>
                    <input type="number" name="table_no" value={booking.table_no} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.table_no?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Payment Status:</label>

                    <label htmlFor="pending">
                        <input type="radio" name="payment_status" id="pending" value="pending" checked={booking.payment_status === "pending"} onChange={handleChange} />Pending</label>
                    &nbsp; &nbsp;

                    <label htmlFor="paid">
                        <input type="radio" name="payment_status" id="paid" value="paid" checked={booking.payment_status === "paid"} onChange={handleChange} />Paid</label>
                    <div style={{color:"red", marginLeft:"110px"}}>{errors.payment_status?.[0]}</div>
                </div>

                <div  style={{marginBottom:"15px"}}>
                <label style={{ width: "110px", display: "inline-block" }}>Payment Mode:</label>
                    <select name="payment_mode" value={booking.payment_mode} onChange={handleChange}>
                        <option value="">Select Payment Mode</option>
                        <option value="cash">Cash</option>
                        <option value="upi">UPI</option>
                        <option value="card">Card</option>
                        <option value="net_banking">Net Banking</option>
                    </select>

                    <div style={{color:"red",marginLeft:"110px"}}>{errors.payment_mode?.[0]}</div>

                </div>

                <div style={{marginBottom:"15px"}}>
                    <label style={{width:"110px", display:"inline-block"}}>Total Bill:</label>
                    <input type="number" name="total_bill" value={booking.total_bill} onChange={handleChange} />
                    <div style={{color:"red", marginLeft:"110px"}}>{errors.total_bill?.[0]}</div>
                </div>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                </p>
            </form>

            <hr />

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Booking Date</th>
                        <th>Table No</th>
                        
                        <th>Payment ID</th>
                        <th>Payment Status</th>
                        <th>Payment Mode</th>
                        <th>Total Bill</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((item)=>{
                        return( <tr key={item.booking_id}>
                            <td>{item.booking_id}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.booking_date}</td>
                            <td>{item.table_no}</td>

                            <td>{item.payment?.payment_id}</td>
                            <td>{item.payment?.payment_status}</td>
                            <td>{item.payment?.payment_mode}</td>
                            <td>{item.payment?.total_bill}</td>

                            <td>
                                <button type="button" onClick={()=>getSingleBooking(item.booking_id)}>Edit</button>
                                &nbsp;
                                <button type="button" onClick={()=>deleteBooking(item.booking_id)}>Delete</button>
                            </td>
                        </tr>

                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default RestBooking;
