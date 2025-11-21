import Header from "../widgets/Header/ui/Header";
import { Outlet } from "react-router-dom";

function App() {
	return (
			<>
				<Header/>
				<Outlet/>   
			</>
	)
}

export default App