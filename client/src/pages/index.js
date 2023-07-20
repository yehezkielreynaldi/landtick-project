// import NavBar from "../components/navbar";
import Jumbotron from "../components/jumbotron";
import MainContent from "../components/main-content";
import ListTicket from "../components/list-ticket";
// import Footer from "../components/footer";
// import NavBarUser from "../components/user/navbar-user";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

function IndexPage() {
    const [_, dispatch] = useContext(UserContext);

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
    };
    return (
        <div style={{ height: "200vh" }}>
            {/* {< NavBar />} */}
            {/* {<NavBarUser />} */}
            {<Jumbotron />}
            {<MainContent />}
            {/* {<ListTicket />} */}
            {/* {<Footer />} */}
        </div>
    );
}

export default IndexPage;