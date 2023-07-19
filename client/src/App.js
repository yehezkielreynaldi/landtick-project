import React, { useState, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";


// import css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// import styles.css
import "./styles/styles.css";
import "./assets/css/index.css"
import "./assets/css/payment.css"




// import components here
import Navbar from "./components/navbar";
import Footer from "./components/footer";



// import halaman index
import IndexPage from "./pages/index"

// import halaman tiket pending
import TicketPage from "./pages/my-ticket";

// import halaman tiket approve
import TicketApprove from "./components/ticket-approve";

// import halaman pembayaran
import PaymentPage from "./pages/payment";

// import halaman index admin
import PageAdmin from "./pages/admin/index";

// import halaman add station
import AddStation from "./pages/add-station"

// import halamam add-ticket admin
import AddTicket from "./pages/add-ticket";
import {
  PrivateRouteAdmin,
  PrivateRouteLogin,
  PrivateRouteUser,
} from "./private-route/private-route";

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true);
  const checkUser = async () => {
    try {
      const response = await API.get("/check/auth");
      // Get user data
      let payload = response.data.data;
      console.log("check user success : ", response);

      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      console.log("Token berhasil ada");
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      console.log("Token tidak ada");
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading && !state.isLogin) {
      navigate("/");
    }
  }, [isLoading]);

  return (
    // Code Inside div
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route exact element={<PrivateRouteLogin />}>
          <Route exact element={<PrivateRouteUser />}>
            <Route path="/ticket" element={< TicketPage />} />
            <Route path="/payment/:id" element={< PaymentPage />} />
            <Route path="/ticketApprove" element={< TicketApprove />} />
          </Route>
          <Route exact element={<PrivateRouteAdmin />}>
            <Route path="/admin" element={<PageAdmin />} />
            <Route path="/add-ticket-admin" element={<AddTicket />} />
            <Route path="/add-station" element={<AddStation />} />
          </Route>
        </Route>




      </Routes>
      <Footer />

    </div>
  );
}

export default App;
