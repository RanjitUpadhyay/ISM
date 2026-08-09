import { useState, useEffect } from "react";
import axios from "axios";

function LodgeBooking() {
    const [booking, setBooking] = useState({
        name: "",
        gender: "",
        phone: "",
        check_in: "",
        check_out: "",
        room_no: "",

        payment_mode: "",
        payment_status: "",
        total_bill: ""
    });

    const [bookings, setBookings] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/lodgebooking";

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });
    };

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
            gender: data.gender,
            phone: data.phone,
            check_in: data.check_in,
            check_out: data.check_out,
            room_no: data.room_no,

            payment_mode: data.payment?.payment_mode || "",
            payment_status: data.payment?.payment_status || "",
            total_bill: data.payment?.total_bill || ""
        });
        setEditId(booking_id);
    };

    const addBooking = async () => {
        await axios.post(URL, booking);
        alert("Booking Added");
    };

    const updateBooking = async () => {
        await axios.put(`${URL}/${editId}`, booking);
        alert("Booking Updated");
    };

    const deleteBooking = async (booking_id) => {
        const confirmDelete = window.confirm("Booking Delete?");

        if (!confirmDelete) {
            return;
        }
        else {
            await axios.delete(`${URL}/${booking_id}`);
            getAllBookings();
            alert("Booking Deleted");
        }

    }

    const clearForm = () => {
        setBooking({
            name: "",
            gender: "",
            phone: "",
            check_in: "",
            check_out: "",
            room_no: "",

            payment_mode: "",
            payment_status: "",
            total_bill: ""
        });
        setEditId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

       try{
        if (editId === null) {
            await addBooking();
        }
        else {
            await updateBooking();
            setEditId(null);
        }
        await getAllBookings();
        setErrors({});
        clearForm();
       }

       catch(error){
        if(error.response && error.response.status===422)
        {
            setErrors(error.response.data.errors)
        }
        else{
            alert("Something went wrong...")
        }
       }
    };

    return (
        <div style={{ width: "600px", margin: "30px auto" }}>

            <form onSubmit={handleSubmit}>
                <h1>Lodge Form</h1>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Name:</label>
                    <input type="text" name="name" value={booking.name} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.name?.[0]}</div>

                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Gender:</label>

                    <label htmlFor="male">
                        <input type="radio" name="gender" id="male" value="male" checked={booking.gender === "male"} onChange={handleChange} />Male</label>
                    &nbsp;&nbsp;

                    <label htmlFor="female">
                        <input type="radio" name="gender" id="female" value="female" checked={booking.gender === "female"} onChange={handleChange} />Female</label>

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.gender?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Phone:</label>
                    <input type="text" name="phone" value={booking.phone} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.phone?.[0]}</div>

                </div>

                <div style={{marginBottom:"15px"}}>
                    <label style={{width:"110px", display:"inline-block"}}>Check In Date:</label>
                    <input type="date" name="check_in" value={booking.check_in} onChange={handleChange} />

                    <div style={{color:"red",marginLeft:"110px"}}>{errors.check_in?.[0]}</div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <label style={{width:"110px", display:"inline-block"}}>Check Out Date:</label>
                    <input type="date" name="check_out" value={booking.check_out} onChange={handleChange} />

                    <div style={{color:"red",marginLeft:"110px"}}>{errors.check_out?.[0]}</div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <label style={{width:"110px", display:"inline-block"}}>Room No:</label>
                    <input type="number" name="room_no" value={booking.room_no} onChange={handleChange} />

                    <div style={{color:"red",marginLeft:"110px"}}>{errors.room_no?.[0]}</div>
                </div>
                <div style={{marginBottom:"15px"}}>
                    <label style={{width:"110px", display:"inline-block"}}>Payment Mode:</label>
                    <select name="payment_mode" value={booking.payment_mode} onChange={handleChange}>
                        <option value="">select payment mode</option>
                        <option value="cash">Cash</option>
                        <option value="upi">UPI</option>
                        <option value="card">Card</option>
                        <option value="net_banking">Net Banking</option>
                    </select>

                    <div style={{color:"red" , marginLeft:"110px"}}>{errors.payment_mode?.[0]}</div>
                </div>

                <div style={{marginBottom:"15px"}}>
                    <label style={{width:"110px", display:"inline-block"}}>Payment Status:</label>
                    <select name="payment_status" value={booking.payment_status} onChange={handleChange}>
                        <option value="">select payment status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                    
                    </select>

                    <div style={{color:"red" , marginLeft:"110px"}}>{errors.payment_status?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "110px", display: "inline-block" }}>Total Bill:</label>
                    <input type="number" name="total_bill" value={booking.total_bill} onChange={handleChange} />

                    <div style={{ color: "red", marginLeft: "110px" }}>{errors.total_bill?.[0]}</div>

                </div>

                <p>
                    <button type="submit">{editId===null?"Save":"Update"}</button>
                </p>



            </form>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Check In Date</th>
                        <th>Check Out Date</th>
                        <th>Room No</th>

                        <th>Payment ID</th>
                        <th>Payment Mode</th>
                        <th>Payment Status</th>
                        <th>Total Bill</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((item)=>{
                       return(
                        <tr key={item.booking_id}>
                        <td>{item.booking_id}</td>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.phone}</td>
                        <td>{item.check_in}</td>
                        <td>{item.check_out}</td>
                        <td>{item.room_no}</td>

                        <td>{item.payment?.payment_id}</td>
                        <td>{item.payment?.payment_mode}</td>
                        <td>{item.payment?.payment_status}</td>
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

export default LodgeBooking;