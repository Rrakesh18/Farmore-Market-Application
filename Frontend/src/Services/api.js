import axios from 'axios';

// To connect to your Spring Boot backend, make sure it is running.
// If it's on a different port (e.g., http://localhost:8080), you might
// encounter a CORS error. To fix this for development, add a "proxy"
// to your frontend's package.json file: "proxy": "http://localhost:8080"

// Or, you can set the base URL here:
// axios.defaults.baseURL = 'http://localhost:8080';

export default axios;

