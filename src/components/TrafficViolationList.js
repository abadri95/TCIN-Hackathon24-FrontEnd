import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import trafficViolationService from '../services/trafficViolationService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Button } from '@mui/material';
import './TrafficViolationList.css';

const TrafficViolationList = ({ vehicleNumber, chassisNumber, challanNumber }) => {
    const [violations, setViolations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchViolations = useCallback(async () => {
        console.log('fetchViolations called with:', { vehicleNumber, chassisNumber, challanNumber });
        setLoading(true);
        try {
            let response;
            if (vehicleNumber && chassisNumber) {
                console.log('Fetching by vehicle and chassis number');
                response = await trafficViolationService.getViolationsByVehicle(vehicleNumber, chassisNumber);
            } else if (challanNumber) {
                console.log('Fetching by challan number');
                response = await trafficViolationService.getViolationsByChallan(challanNumber);
            }
            const responseData = response.data;
            const violationsData = Array.isArray(responseData) ? responseData : [responseData];
            setViolations(violationsData);
            console.log('API Response:', Array.isArray(response.data), response.data);
        } catch (error) {
            console.error('Error fetching violations:', error);
            setError(error);
        }
        setLoading(false);
    }, [vehicleNumber, chassisNumber, challanNumber]);

    useEffect(() => {
        fetchViolations();
    }, [fetchViolations]);

    const handlePayNow = () => {
        navigate('/payment-options');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching violations: {error.message}</div>;
    }

    if (!violations.length) {
        return <div>No violations found.</div>;
    }

    return (
        <Box mt={4} className="violation-list-container">
            <Typography variant="h5" component="h2" gutterBottom className="violation-list-title">
                Traffic Violations List
            </Typography>
            <TableContainer component={Paper}>
                <Table className="styled-table">
                    <TableHead>
                        <TableRow className="table-header-row">
                            <TableCell>ID</TableCell>
                            <TableCell>Vehicle Number</TableCell>
                            <TableCell>Chassis Number</TableCell>
                            <TableCell>Violator Name</TableCell>
                            <TableCell>DL/RC Number</TableCell>
                            <TableCell>Challan No</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Challan Date</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Payment Source</TableCell>
                            <TableCell>Challan Print</TableCell>
                            <TableCell>Receipt</TableCell>
                            <TableCell>Payment</TableCell>
                            <TableCell>Payment Verify</TableCell>
                            <TableCell>Violations</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {violations.map((violation) => (
                            <TableRow key={violation.id} className="table-body-row">
                                <TableCell>{violation.id}</TableCell>
                                <TableCell>{violation.vehicleNumber}</TableCell>
                                <TableCell>{violation.chassisNumber}</TableCell>
                                <TableCell>{violation.violatorName}</TableCell>
                                <TableCell>{violation.dlRcNumber}</TableCell>
                                <TableCell>{violation.challanNo}</TableCell>
                                <TableCell>{violation.txnId}</TableCell>
                                <TableCell>{violation.state}</TableCell>
                                <TableCell>{new Date(violation.challanDate).toLocaleString()}</TableCell>
                                <TableCell>{violation.amount !== undefined ? violation.amount.toFixed(2) : 'N/A'}</TableCell>
                                <TableCell>{violation.status}</TableCell>
                                <TableCell>{violation.paymentSource}</TableCell>
                                <TableCell>{violation.challanPrint ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{violation.receipt ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{violation.payment ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{violation.paymentVerify ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    {Array.isArray(violation.violations) 
                                        ? violation.violations.join(', ') 
                                        : violation.violations}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={handlePayNow}>
                                        Pay Now
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TrafficViolationList;
