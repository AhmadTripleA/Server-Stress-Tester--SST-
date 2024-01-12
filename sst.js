const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({
    path: './config.env'
})

const numberOfRequests = 150;
const serverURL = process.env.SERVER_IP;

async function sendRequests() {
    const responseTimes = [];
    const startTime = Date.now();

    for (let i = 0; i < numberOfRequests; i++) {
        const reqStartTime = Date.now();

        try {
            await axios.get(serverURL);
            const endTime = Date.now();
            const responseTime = endTime - reqStartTime;
            responseTimes.push(responseTime);
            console.log(`Request ${i + 1}: ${responseTime}ms`);
        } catch (error) {
            console.error(`Error in request ${i + 1}: ${error.message}`);
        }
    }

    if (responseTimes.length > 0) {
        const meanResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        console.log(`Server URL is: ${serverURL}`);
        console.log(`It took (${totalTime})ms to proccess (${numberOfRequests}) requests with an average of (${meanResponseTime})ms`);
    } else {
        console.error('No successful requests to calculate mean response time.');
    }
}

sendRequests();