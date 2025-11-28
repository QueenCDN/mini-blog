import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";

function LoginPage() {
return (
	<main className="container mx-auto px-4 py-8">
		<form className="max-w-md mx-auto login-form">
			<h2 className="text-xl font-bold mb-6 text-center">Login to Your Account✨</h2>
			<div className="mb-2">
				<Input type="email" className="w-full" ph="Email Address" style={{marginBottom: "15px"}}/>
			</div>
			<div className="mb-4">
				<Input type="password" className="w-full" ph="Password" style={{marginBottom: "15px"}}/>
			</div>
			<Button text={"Login"} variant={"fillBtn"} className="w-full"/>
		</form>
	</main>   
	)
}

export default LoginPage