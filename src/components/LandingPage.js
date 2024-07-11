import React, { useState } from 'react';
import { Container, Typography, Box, TextField, FormControlLabel, Checkbox, Button, Paper, Grid, Alert } from '@mui/material';
import TrafficViolationList from './TrafficViolationList';

const LandingPage = () => {
    const [searchByVehicle, setSearchByVehicle] = useState(false);
    const [searchByChallan, setSearchByChallan] = useState(false);
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [chassisNumber, setChassisNumber] = useState('');
    const [challanNumber, setChallanNumber] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearchByVehicleChange = (event) => {
        setSearchByVehicle(event.target.checked);
        if (event.target.checked) {
            setSearchByChallan(false);
            setChallanNumber('');
        }
        setShowResults(false); // Reset the results
        console.log('Search by Vehicle: ', event.target.checked); // Logging
    };

    const handleSearchByChallanChange = (event) => {
        setSearchByChallan(event.target.checked);
        if (event.target.checked) {
            setSearchByVehicle(false);
            setVehicleNumber('');
            setChassisNumber('');
        }
        setShowResults(false); // Reset the results
        console.log('Search by Challan: ', event.target.checked); // Logging
    };

    const handleSearch = () => {
        if (searchByVehicle) {
            if (!vehicleNumber || !chassisNumber) {
                setErrorMessage('Vehicle number and chassis number are mandatory.');
                return;
            }
        } else if (searchByChallan) {
            if (!challanNumber) {
                setErrorMessage('Challan number is mandatory.');
                return;
            }
        } else {
            setErrorMessage('Please select an option to search.');
            return;
        }

        setErrorMessage('');
        setShowResults(true);
        console.log('Search Initiated'); // Logging
    };

    return (
        <Container>
            <Box mt={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Challan Details
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={searchByVehicle} onChange={handleSearchByVehicleChange} />}
                                    label="Fetch tickets based on vehicle and chassis number"
                                />
                            </Grid>
                            {searchByVehicle && (
                                <>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Vehicle Number"
                                            variant="outlined"
                                            value={vehicleNumber}
                                            onChange={(e) => setVehicleNumber(e.target.value)}
                                            fullWidth
                                            style={{ marginBottom: '20px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Chassis Number"
                                            variant="outlined"
                                            value={chassisNumber}
                                            onChange={(e) => setChassisNumber(e.target.value)}
                                            fullWidth
                                            style={{ marginBottom: '20px' }}
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={searchByChallan} onChange={handleSearchByChallanChange} />}
                                    label="Fetch records based on challan number"
                                />
                            </Grid>
                            {searchByChallan && (
                                <Grid item xs={12}>
                                    <TextField
                                        label="Challan Number"
                                        variant="outlined"
                                        value={challanNumber}
                                        onChange={(e) => setChallanNumber(e.target.value)}
                                        fullWidth
                                        style={{ marginBottom: '20px' }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} container justifyContent="center">
                                <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: '10px' }}>
                                    Fetch Records
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    {errorMessage && (
                        <Box mt={2}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Box>
                    )}
                </Paper>
            </Box>
            {showResults && (
                <Box mt={4}>
                    <TrafficViolationList 
                        vehicleNumber={searchByVehicle ? vehicleNumber : ''}
                        chassisNumber={searchByVehicle ? chassisNumber : ''}
                        challanNumber={searchByChallan ? challanNumber : ''}
                    />
                </Box>
            )}
        </Container>
    );
};

export default LandingPage;
