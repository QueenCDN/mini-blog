import Input from "../../../shared/ui/Input"
import Button from "../../../shared/ui/Button";
import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    if (profile?.username) {
      setNewName(profile.username);
    }
  }, [profile?.username]);

  const userPosts = useMemo(() => profile?.posts ?? [], [profile?.posts]);

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
        {userPosts.length > 0 ? (
          <div className="space-y-4 mt-4">
            {userPosts.map((post) => (
              <article key={post.id || post._id || post.title} className="p-4 border border-gray-200 rounded-lg">
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-xl font-semibold break-words">{post.title}</h3>
                  {post.createdAt && (
                    <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                  )}
                </header>
                {post.content && (
                  <p className="text-gray-700 mt-2 break-words">{post.content}</p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-2">No posts yet...</p>
        )}
      </div>
    </main>
  )
}

export default ProfilePage