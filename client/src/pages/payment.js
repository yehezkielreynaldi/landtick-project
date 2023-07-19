// import NavBar from "../components/navbar";
import Attention from "../components/attention-payment";
import PricePayment from "../components/price-payment";
import ScanPayment from "../components/scan-payment";
import UserPayment from "../components/user-payment";
// import NavBarUser from "../components/user/navbar-user";

function PaymentPage() {
    return (
        <div style={{ height: '90vh' }}>
            {/* {< NavBar />} */}
            {/* {<NavBarUser />} */}
            {<Attention />}
            {<UserPayment />}
            {<PricePayment />}
            {<ScanPayment />}
        </div>
    );
}

export default PaymentPage;