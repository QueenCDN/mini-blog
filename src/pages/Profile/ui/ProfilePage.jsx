function ProfilePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="post-item p-6 mb-3">
        <h2>User Profile</h2>
        <p className="text-profile">Username: <b>Fonerge</b></p>
        <p className="text-profile">Email: <b>my_email@mail.com</b></p>
        <p className="text-profile">Member since: <b>26.11.2025</b></p>

        <hr />
        <div>
          <input type="text" className="input-field" style={{marginBottom: "10px", marginRight: "10px"}} placeholder="username"/>
          <button className="login-button">Edit</button>  
        </div>
        <div>
          <input type="text" className="input-field" style={{marginBottom: "10px", marginRight: "10px"}} placeholder="old password"/>
          <input type="text" className="input-field" style={{marginBottom: "10px", marginRight: "10px"}} placeholder="new password"/>
          <button className="login-button">Change</button> 
        </div>
      </div>
      <div className="post-item p-6 mb-3">
        <h2>Your posts</h2>
        <p>No posts yet...</p>
      </div>
    </main>
  )
}

export default ProfilePage