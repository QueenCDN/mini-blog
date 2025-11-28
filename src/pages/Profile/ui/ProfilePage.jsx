import Input from "../../../shared/ui/Input"
import Button from "../../../shared/ui/Button";

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
          <Input type="text" style={{marginBottom: "10px", marginRight: "10px"}} ph="username"/>
          <Button text={"Edit"} variant={"fillBtn"}/> 
        </div>
        <div>
          <Input type="text" ph="old password" style={{marginBottom: "10px", marginRight: "10px"}} />
          <Input type="text" ph="new password" style={{marginBottom: "10px", marginRight: "10px"}} />
          <Button text={"Change"} variant={"fillBtn"}/>
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