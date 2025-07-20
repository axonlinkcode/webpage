import { useState, useEffect } from 'react';
import axios from 'axios';


const Admin = () => {
    const [clinicians, setClinicians] = useState([]);
    const [patients, setPatients] = useState([]);
    const [cros, setCros] = useState([]);
    const [waitingList, setWaitingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('clinician');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseURL = import.meta.env.VITE_API_BASE_URL;
                const [resClinicians, resPatients, resCros, resWaitingList] = await Promise.all([
                    axios.get(`${baseURL}/clinician`),
                    axios.get(`${baseURL}/patient`),
                    axios.get(`${baseURL}/cro`),
                    axios.get(`${baseURL}/waitinglist`)
                ])
                setClinicians(resClinicians.data);
                setPatients(resPatients.data);
                setCros(resCros.data);
                setWaitingList(resWaitingList.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [])

    // Render Data
    const renderTable = (data) => {
        if (!data.length) return <p>No records found....</p>;

        // Exclude _id, id, __v, createdAt, and updatedAt
        const headers = Object.keys(data[0]).filter(
            (key) =>
                key !== '_id' &&
                key !== 'id' &&
                key !== '__v' &&
                key !== 'createdAt' &&
                key !== 'updatedAt'
        );


        return (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th
                            style={{
                                textAlign: 'left',
                                padding: '8px',
                                borderBottom: '2px solid #333',
                            }}
                        >
                            S/N
                        </th>
                        {headers.map((key, index) => (
                            <th
                                key={index}
                                style={{
                                    textAlign: 'left',
                                    padding: '8px',
                                    borderBottom: '2px solid #333',
                                }}
                            >
                                {key.toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, i) => (
                        <tr
                            key={i}
                            style={{
                                backgroundColor: i % 2 === 0 ? '#d3d1d1ff' : '#fff',
                            }}
                        >
                            <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                                {i + 1}
                            </td>
                            {headers.map((key, idx) => (
                                <td
                                    key={idx}
                                    style={{ padding: '8px', borderBottom: '1px solid #ccc' }}
                                >
                                    {entry[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    if (loading) return <h2 style={{ padding: '5rem' }}>Loading data...</h2>;

    return (
        <div style={{ padding: '2rem', marginTop: '5rem', height: '100vh', overflowY: 'scroll' }}>
            <h1>Admin Dashboard</h1>

            {/* Tabs */}
            <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
                {['clinician', 'patient', 'cro', 'waitinglist'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: activeTab === tab ? '#222' : '#ddd',
                            color: activeTab === tab ? '#fff' : '#000',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div style={{ marginTop: '20px' }}>
                {activeTab === 'clinician' && renderTable(clinicians)}
                {activeTab === 'patient' && renderTable(patients)}
                {activeTab === 'cro' && renderTable(cros)}
                {activeTab === 'waitinglist' && renderTable(waitingList)}
            </div>
        </div>
    );
}

export default Admin
