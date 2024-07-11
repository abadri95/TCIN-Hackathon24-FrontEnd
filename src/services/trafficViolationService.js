import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const getAllViolations = () => {
    const response=axios.get(API_URL);
    console.log('All Violations Response:', response.data); // Debugging log
    return response;
};

const getViolationsByVehicle = (vehicleNumber, chassisNumber) => {
    const response=axios.get(`${API_URL}/fetch-violation?vehicleNumber=${vehicleNumber}&chassisNumber=${chassisNumber}`);
    console.log('Violations by Vehicle Response:', response.data); // Debugging log
    return response;
};

// const getViolationsByChallan = (challanNumber) => {
//     const response=  axios.get(`${API_URL}/fetch-violation-challan?challanNumber=${challanNumber}`);
//     console.log('Violations by Challan Response:', response.data); // Debugging log
//     return response;
// };

const getViolationsByChallan = async (challanNumber) => {
    try {
        console.log('Request to get violations by challan:', { challanNumber }); // Debugging log
        const response = await axios.get(`${API_URL}/fetch-violation-challan?challanId=${challanNumber}`, {
            params: { challanNumber },
        });
        console.log('Violations by Challan Response:', response.data); // Debugging log
        return response;
    } catch (error) {
        console.error('Error fetching violations by challan:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const createViolation = (violation) => {
    return axios.post(API_URL, violation);
};

const updateViolation = (id, violation) => {
    return axios.put(`${API_URL}/${id}`, violation);
};

const deleteViolation = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllViolations,
    getViolationsByVehicle,
    getViolationsByChallan,
    createViolation,
    updateViolation,
    deleteViolation,
};
