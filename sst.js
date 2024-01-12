const axios = require('axios');
const dotenv = require('dotenv');

const numberOfRequests = 200;

dotenv.config({
    path: './config.env'
})

const serverURL = process.env.SERVER_IP;
console.log(serverURL);

async function sendRequests() {
    const responseTimes = [];

    for (let i = 0; i < numberOfRequests; i++) {
        const startTime = Date.now();

        try {
            await axios.get(serverURL+"debug"); // replace with your desired HTTP method and endpoint
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            responseTimes.push(responseTime);
            console.log(`Request ${i + 1}: ${responseTime}ms`);
        } catch (error) {
            console.error(`Error in request ${i + 1}: ${error.message}`);
        }
    }

    if (responseTimes.length > 0) {
        const meanResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
        console.log(`Mean Response Time: ${meanResponseTime}ms`);
    } else {
        console.error('No successful requests to calculate mean response time.');
    }
}

sendRequests();