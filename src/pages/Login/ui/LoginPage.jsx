function LoginPage() {
return (
	<main className="container mx-auto px-4 py-8">
		<form className="max-w-md mx-auto login-form">
			<h2 className="text-xl font-bold mb-6 text-center">Login to Your Account✨</h2>
			<div className="mb-2">
				<input type="email" id="email" className="w-full" placeholder="Email Address" />
			</div>
			<div className="mb-4">
				<input type="password" id="password" className="w-full" placeholder="Password" />
			</div>
			<button type="submit" className="w-full login-button">Login</button>
		</form>
	</main>   
	)
}

export default LoginPage