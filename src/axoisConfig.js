import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`, // Your API base URL
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error("Error status:", error.response.status);
      console.error("Error message:", error.response.data);
      // Handle the error globally, for example, redirect to an error page
      // You can also throw an error here to stop the promise chain and handle it in the component
      // throw new Error('Network error');
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error:", error.message);
    }
    // Return a rejected promise to propagate the error
    return Promise.reject(error);
  }
);

export default instance;
