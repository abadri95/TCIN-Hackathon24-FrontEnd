import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const PaymentOptions = () => {
    const navigate = useNavigate();

    const handlePaymentSuccess = () => {
        navigate('/payment-success');
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Box textAlign="center">
                <Typography variant="h5" component="h2" gutterBottom>
                    Payment Options
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
                    <Button variant="contained" color="primary" onClick={handlePaymentSuccess}>
                        Pay with Credit Card
                    </Button>
                    <Button variant="contained" color="primary" onClick={handlePaymentSuccess}>
                        Pay with Debit Card
                    </Button>
                    <Button variant="contained" color="primary" onClick={handlePaymentSuccess}>
                        Pay with Bank Transfer
                    </Button>
                    <Button variant="contained" color="primary" onClick={handlePaymentSuccess}>
                        Pay with UPI
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default PaymentOptions;
