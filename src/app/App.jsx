import Header from "../widgets/Header/ui/Header";
import { Outlet } from "react-router-dom";
import { selectAuthUser, selectAuthToken } from "../features/auth/model/selectors.js";
import { fetchMe } from "../features/auth/model/thunks.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
	const dispatch = useDispatch();
	const token = useSelector(selectAuthToken);
	const user = useSelector(selectAuthUser);

	useEffect(() => {
	if (token && !user) dispatch(fetchMe());
	}, [token, user, dispatch]);

	return (
			<>
				<Header/>
				<Outlet/>   
			</>
	)
}

export default App