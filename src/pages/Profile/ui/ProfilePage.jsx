import Input from "../../../shared/ui/Input"
import Button from "../../../shared/ui/Button";
import { useEffect, useState } from "react";
import { changeUserPassword, fetchUserProfile, updateUserName } from "../../../entities/user/model/slice"
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, selectUserStatus } from "../../../entities/user/model/selectors";

import { formatDate } from '../../../shared/lib/formatDate.js';

function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const status = useSelector(selectUserStatus);

  const [newName, setNewName] = useState(profile?.username || "");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!profile && status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile, status]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10">Failed to load profile.</p>;
  }

  function handleUpdateName() {dispatch(updateUserName(newName))}
  async function handleChangePassword() {
    try {
      await dispatch(
        changeUserPassword({ oldPassword: oldPass, newPassword: newPass })
      ).unwrap();

      setSuccessMessage("Пароль успешно изменён!");
      setErrorMessage("");
      setOldPass("");
      setNewPass("");
    } catch (err) {
      setErrorMessage(err);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="post-item p-6 mb-3">
        <h2>User Profile</h2>
        <p className="text-profile">Username: <b>{profile.username}</b></p>
        <p className="text-profile">Email: <b>{profile.email}</b></p>
        <p className="text-profile">Member since: <b>{formatDate(profile.createdAt)}</b></p>

        <hr />
        <div>
          <Input 
            type="text" 
            style={{marginBottom: "10px", marginRight: "10px"}} 
            ph="username"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <Button 
            text={"Edit"} 
            variant={"fillBtn"}
            onClick={handleUpdateName}
          /> 
        </div>
        <div>
          <Input 
            type="password" 
            ph="old password" 
            style={{marginBottom: "10px", marginRight: "10px"}}
            value={oldPass}
            onChange={(event) => setOldPass(event.target.value)} 
          />
          <Input 
            type="password" 
            ph="new password" 
            style={{marginBottom: "10px", marginRight: "10px"}}
            value={newPass}
            onChange={(event) => setNewPass(event.target.value)} 
          />
          <Button 
            text={"Change"} 
            variant={"fillBtn"}
            onClick={handleChangePassword}
          />
          {successMessage && (
            <p style={{ color: "green", marginBottom: "10px" }}>{successMessage}</p>
          )}
          {errorMessage && (
            <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>
          )}
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