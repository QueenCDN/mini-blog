import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../../../features/auth/model/thunks.js";
import {selectAuthError, selectAuthStatus} from "../../../features/auth/model/selectors.js"

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const status = useSelector(selectAuthStatus);
	const error = useSelector(selectAuthError);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await dispatch(loginUser({email, password}));
		if (res.meta.requestStatus === "fulfilled") {
			navigate("/profile")
		}
	}

	return (
	<main className="container mx-auto px-4 py-8">
		<form className="max-w-md mx-auto login-form" onSubmit={handleSubmit}>
			<h2 className="text-xl font-bold mb-6 text-center">Login to Your Account✨</h2>
			<div className="mb-2">
				<Input 
				type="email" 
				className="w-full" 
				ph="Email Address" 
				style={{marginBottom: "15px"}}
				value={email}
				onChange={(event) => setEmail(event.target.value)}
				/>
			</div>
			<div className="mb-4">
				<Input 
				type="password" 
				className="w-full" 
				ph="Password" 
				style={{marginBottom: "15px"}}
				value={password}
				onChange={(event) => setPassword(event.target.value)}
				/>
			</div>

			{error && <p style={{color: "red"}}>{error}</p>}

			<Button 
			type="submit"
			text={status === "loading" ? "Loading..." : "Login"} 
			variant={"fillBtn"} 
			className="w-full"/>
		</form>
	</main>   
	)
}

export default LoginPage