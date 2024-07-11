import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const MinimalPaymentOptions = () => {
    const navigate = useNavigate();

    const handlePaymentSuccess = () => {
        navigate('/payment-success');
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" component="h2" gutterBottom>
                Payment Options
            </Typography>
            <Box>
                <Button variant="contained" color="primary" onClick={handlePaymentSuccess}>
                    Pay with Credit Card
                </Button>
                <Button variant="contained" color="secondary" onClick={handlePaymentSuccess}>
                    Pay with PayPal
                </Button>
                <Button variant="contained" color="default" onClick={handlePaymentSuccess}>
                    Pay with Bank Transfer
                </Button>
            </Box>
        </Box>
    );
};

export default MinimalPaymentOptions;
