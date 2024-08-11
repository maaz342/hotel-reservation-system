import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend, 
    Chart 
} from 'chart.js';
import { 
    Home as HomeIcon, 
    Inventory as InventoryIcon, 
    People as PeopleIcon, 
    AttachMoney as AttachMoneyIcon 
} from '@mui/icons-material';
import Carousel from '../layout/Carousel';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Dataset 2',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: 'rgba(153,102,255,0.2)',
                borderColor: 'rgba(153,102,255,1)',
            },
        ],
    };

    return (
        <>
    <div style={{ width: '100%', overflow: 'hidden' }}>
                <Carousel/>
            </div>         
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Orders</h5>
                                <h2>12,345</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Inventory</h5>
                                <h2>12,345</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Customer</h5>
                                <h2>12,345</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Revenue</h5>
                                <h2>12,345</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Recent Orders</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Spring and summershoes</td>
                                            <td>3</td>
                                            <td>55</td>
                                        </tr>
                                        <tr>
                                            <td>TC Reusable Silicone Magic Washing Gloves</td>
                                            <td>2</td>
                                            <td>56</td>
                                        </tr>
                                        <tr>
                                            <td>Oil Free Moisturizer 100ml</td>
                                            <td>2</td>
                                            <td>70</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Order Revenue</h5>
                                <Line data={chartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
