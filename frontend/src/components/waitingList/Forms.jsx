import './form.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        state: '',
        phone: '',
    });

    const handleChange = (e) => [
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${API}/waitinglist`, formData);
            if (response.status === 200 || response.status === 201) {
                alert('Successfully joined the waiting list!');
            }
        } catch (error) {
            alert('Error joining the waiting list. Please try again later.');
        }
    }
        return (
            <div className="waiting-list-container">
                <div className="waiting-list">
                    <div className="waiting-header">
                        <Link to='/' className="back-link">← Back Home</Link>
                        <h3>Join our waiting list</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="waiting-list-fields">
                            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                            <input type="text" name="state" placeholder="State" onChange={handleChange} />
                            <input type="tel" name="phone" placeholder="Phone number" onChange={handleChange} />
                        </div>
                        <button type="submit" className="join-button">
                            Join Waiting List
                        </button>
                    </form >
                </div>
            </div>
        )
    }

export default form
