import axios from "axios";

const checkLogin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("No token, user not logged in");
        return;
    }

    try {
        const res = await axios.get("http://localhost:5000/api/login/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.data.loggedIn) {
            console.log("User is logged in:", res.data.user);
            // Set state or redirect accordingly
        }
    } catch (err) {
        console.log("User not logged in or token invalid");
        localStorage.removeItem("token");
    }
};
