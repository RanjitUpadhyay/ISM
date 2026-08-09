import { useEffect, useState } from "react";
import axios from "axios";

function HotelForm() {

    const [hotel, setHotel] = useState({
       //booking table 
        name: "",
        gender: "",
        email: "",
        phone: "",
        room_no: "",
        room_type: "",
        check_in: "",
        check_out: "",
        booking_status: "",
        //payment table
        payment_mode: "",
        payment_status: "",
        total_amount: ""

    });

    const [hotels, setHotels] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const URL = "http://127.0.0.1:8000/api/hotel-bookings";

    const handleChange = (e) => {

        setHotel({
            ...hotel,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: null
        });

    };

    const getAllBookings = async () => {

        const response = await axios.get(URL);
        setHotels(response.data);

    };

    const getSingleBooking = async (booking_id) => {

        const response = await axios.get(`${URL}/${booking_id}`);

        const data = response.data;

        setHotel({                      //Left side (gender) → Property name in your React state object.
            name: data.name,            //Right side (data.gender) → Value coming from the API response.
            gender: data.gender,   //Take the value of gender from the data object and store it in the gender property of the hotel state.
            email: data.email,      //hotel.gender = data.gender means Copy the gender value from the API into the hotel state.
            phone: data.phone,
            room_no: data.room_no,
            room_type: data.room_type,
            check_in: data.check_in,
            check_out: data.check_out,
            booking_status: data.booking_status,     //'?.' means Optional Chaining
            // payment is the relationship method in the HotelBooking model. Get payment details from that related object; if no payment exists, use "".
            //data.payment?.payment_mode || ""  means If payment_mode has a value → use it Otherwise → use an empty string ""(|| means OR)
            payment_mode: data.payment?.payment_mode || "",  //payment_mode:Set the payment_mode property.
            payment_status: data.payment?.payment_status || "",   //"data.payment?.payment_mode" means If payment exists, get payment_mode. Otherwise, return undefined instead of throwing an error.
            total_amount: data.payment?.total_amount || ""        ////the 'payment' comes from the payment() relationship method in your HotelBooking model.
        });                                           

        setEditId(booking_id);
    };

    const addBooking = async () => {

        await axios.post(URL, hotel);
        alert("Booking Added");

    };

    const updateBooking = async () => {

        await axios.put(`${URL}/${editId}`, hotel);
        alert("Booking Updated");

    };

    const deleteBooking = async (booking_id) => {

        const confirmDelete = window.confirm("Delete Booking ?");

        if (!confirmDelete) {
            return;
        }

        await axios.delete(`${URL}/${booking_id}`);

        getAllBookings();

    };

    const clearForm = () => {

        setHotel({

            name: "",
            gender: "",
            email: "",
            phone: "",
            room_no: "",
            room_type: "",
            check_in: "",
            check_out: "",
            booking_status: "",
            payment_mode: "",
            payment_status: "",
            total_amount: ""

        });

        setEditId(null);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editId == null) {

                await addBooking();

            }

            else {

                await updateBooking();
                setEditId(null);

            }

            getAllBookings();
            clearForm();
            setErrors({});

        }

        catch (error) {

            if (error.response && error.response.status == 422) {

                setErrors(error.response.data.errors);

            }

            else {

                alert("Something Went Wrong");

            }

        }

    };

    useEffect(() => {

        getAllBookings();

    }, []);

    return (

        <div style={{ width: "700px", margin: "30px auto" }}>

            <form onSubmit={handleSubmit}>

                <h1>Hotel Booking Form</h1>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Guest Name:</label>
                    <input type="text" name="name" value={hotel.name} onChange={handleChange} />
                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.name?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{width:"120px", display:"inline-block"}}>Gender:</label>

                        <label htmlFor="male">
                            <input type="radio" id="male" value="male" checked={hotel.gender === "male"} name="gender" onChange={handleChange} />Male</label>
                        &nbsp;&nbsp;

                        <label htmlFor="female">
                            <input type="radio" name="gender" id="female" value="female" checked={hotel.gender === "female"} onChange={handleChange} /> Female</label>

                        <div style={{ color: "red", marginLeft: "110px" }}>{errors.gender?.[0]}</div>

                    </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Email:</label>
                    <input type="email" name="email" value={hotel.email} onChange={handleChange} />
                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.email?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Phone:</label>
                    <input type="text" name="phone" value={hotel.phone} onChange={handleChange} />
                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.phone?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Room No:</label>
                    <input type="number" name="room_no" value={hotel.room_no} onChange={handleChange} />
                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.room_no?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Room Type:</label>

                    <select name="room_type" value={hotel.room_type} onChange={handleChange}>
                        <option value="">Select Room Type</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="delux">Deluxe</option>
                        <option value="suit">Suite</option>
                    </select>

                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.room_type?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Check In:</label>
                    <input type="date" name="check_in" value={hotel.check_in} onChange={handleChange} />
                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.check_in?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Check Out:</label>
                    <input type="date" name="check_out" value={hotel.check_out} onChange={handleChange} />
                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.check_out?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Booking Status:</label>

                    <select name="booking_status" value={hotel.booking_status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="booked">Booked</option>
                        <option value="checked_in">Checked In</option>
                        <option value="checked_out">Checked Out</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.booking_status?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Payment Mode:</label>

                    <select name="payment_mode" value={hotel.payment_mode} onChange={handleChange}>
                        <option value="">Select Payment Mode</option>
                        <option value="cash">Cash</option>
                        <option value="upi">UPI</option>
                        <option value="card">Card</option>
                        <option value="net_banking">Net Banking</option>
                    </select>

                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.payment_mode?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Payment Status:</label>

                    <select name="payment_status" value={hotel.payment_status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="refunded">Refunded</option>
                    </select>

                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.payment_status?.[0]}</div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ width: "120px", display: "inline-block" }}>Total Amount:</label>
                    <input type="number" name="total_amount" value={hotel.total_amount} onChange={handleChange} />
                    <div style={{ color: "red", marginLeft: "120px" }}>{errors.total_amount?.[0]}</div>
                </div>

                <p>
                    <button type="submit">
                        {editId == null ? "Save" : "Update"}
                    </button>
                </p>


            </form>

            <hr />

            <table border="1" cellPadding="8">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Guest Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Room No</th>
                        <th>Room Type</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Booking Status</th>
                        
                        <th>Payment Mode</th>
                        <th>Payment Status</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {hotels.map((item) => {

                        return (

                            <tr key={item.booking_id}>

                                <td>{item.booking_id}</td>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.room_no}</td>
                                <td>{item.room_type}</td>
                                <td>{item.check_in}</td>
                                <td>{item.check_out}</td>
                                <td>{item.booking_status}</td>

                                <td>{item.payment?.payment_mode}</td>
                                <td>{item.payment?.payment_status}</td>
                                <td>{item.payment?.total_amount}</td>

                                <td>

                                    <button
                                        type="button"
                                        onClick={() => getSingleBooking(item.booking_id)}
                                    >
                                        Edit
                                    </button>

                                    &nbsp;

                                    <button
                                        type="button"
                                        onClick={() => deleteBooking(item.booking_id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>

    );

}

export default HotelForm;