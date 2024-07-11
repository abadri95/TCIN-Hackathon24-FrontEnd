import React from 'react';
import { Box, Typography } from '@mui/material';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    return (
        <Box mt={4} className="payment-success-container">
            <Typography variant="h5" component="h2" gutterBottom className="payment-success-title">
                Payment Successful
            </Typography>
            <Typography variant="body1" className="payment-success-message">
                Thank you for your payment. Your transaction has been completed successfully.
            </Typography>
        </Box>
    );
};

export default PaymentSuccess;
