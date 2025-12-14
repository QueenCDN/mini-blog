import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";

import { changeUserPassword,fetchUserProfile,updateUserName } from "../../../entities/user/model/slice";
import { selectUserProfile, selectUserStatus } from "../../../entities/user/model/selectors";

import { formatDate } from "../../../shared/lib/formatDate";

function ProfileCard() {
  const dispatch = useDispatch();

  const profile = useSelector(selectUserProfile);
  const status = useSelector(selectUserStatus);

  const [draftName, setDraftName] = useState(null);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!profile && status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile, status]);

  const username = profile?.username ?? "";
  const nameValue = draftName ?? username;

  const handleUpdateName = () => {
    const nextName = nameValue.trim();
    if (!nextName || nextName === username) return;

    dispatch(updateUserName(nextName));
    setDraftName(null);
  };

  const handleChangePassword = async () => {
    try {
      await dispatch(
        changeUserPassword({ oldPassword: oldPass, newPassword: newPass })
      ).unwrap();

      setSuccessMessage("Пароль успешно изменён!");
      setErrorMessage("");
      setOldPass("");
      setNewPass("");
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage(err?.message ?? String(err));
    }
  };

  if (status === "loading") return <p className="text-center mt-10">Loading profile...</p>;
  if (!profile) return <p className="text-center mt-10">Failed to load profile.</p>;

  return (
    <div className="post-item p-6 mb-3">
      <h2>User Profile</h2>

      <p className="text-profile">Username: <b>{profile.username}</b></p>
      <p className="text-profile">Email: <b>{profile.email}</b></p>
      <p className="text-profile">Member since: <b>{formatDate(profile.createdAt)}</b></p>

      <hr />

      <div>
        <Input
          type="text"
          style={{ marginBottom: "10px", marginRight: "10px" }}
          ph="username"
          value={nameValue}
          onChange={(e) => setDraftName(e.target.value)}
        />
        <Button text="Edit" variant="fillBtn" onClick={handleUpdateName} />
      </div>

      <div>
        <Input
          type="password"
          ph="old password"
          style={{ marginBottom: "10px", marginRight: "10px" }}
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />
        <Input
          type="password"
          ph="new password"
          style={{ marginBottom: "10px", marginRight: "10px" }}
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <Button text="Change" variant="fillBtn" onClick={handleChangePassword} />

        {successMessage && <p style={{ color: "green", marginBottom: "10px" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default ProfileCard;