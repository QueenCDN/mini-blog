import Header from "../widgets/Header/ui/Header";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div>
            <Header/>
            <div className="container">
                <Outlet/>   
            </div>
        </div>
    )
}

export default App