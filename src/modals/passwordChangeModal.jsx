import React, { useState } from "react";
import ModalWrapper from "../components/modalWrapper/ModalWrapper";
import { CHANGE_EMAIL_PASSWORD, CHANGE_PASSWORD } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { ApiHandle } from "../utils/ApiHandle";
import Toaster from "../utils/toaster/Toaster";
import { commonCloseModal } from "../redux/reducers/modalsReducer";
import Input from "../components/input";
import { useLocation } from "react-router-dom";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

function PasswordChangeModal() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.user);
  const { emailPasswordChangeModal, requestId, sendersEmail } = useSelector(
    (state) => state?.modal
  );

  const id = location.pathname.includes("edit_user")
    ? location.pathname.split("/").pop()
    : userData?.id;

  const handlePasswordChange = async () => {
    setLoader(true);

    // For `CHANGE_EMAIL_PASSWORD`
    if (emailPasswordChangeModal) {
      if (!currentPassword || !newPassword) {
        Toaster("", "Please fill in both current and new password fields");
        setLoader(false);
        return;
      }

      try {
        const res = await ApiHandle(
          `${CHANGE_EMAIL_PASSWORD}${requestId}/`,
          { old_password: currentPassword, new_password: newPassword },
          "PATCH"
        );

        if (res.statusCode === 200) {
          Toaster("success", "Email password changed successfully");
          dispatch(commonCloseModal());
        }
      } catch (err) {
        Toaster("error", "An error occurred while changing the password");
      } finally {
        setLoader(false);
      }
      return;
    }

    // For `CHANGE_PASSWORD`

    if (newPassword !== confirmPassword) {
      Toaster("", "Passwords do not match");
      setLoader(false);
      return;
    }
    if (!newPassword || !confirmPassword) {
      Toaster("", "Please fill Both New Password and Confirm Password");
      setLoader(false);
      return;
    }

    try {
      const res = await ApiHandle(
        `${CHANGE_PASSWORD}${id}/`,
        { password: newPassword },
        "PATCH"
      );

      if (res.statusCode === 200) {
        Toaster("success", "Password changed successfully");
        dispatch(commonCloseModal());
      }
    } catch (err) {
      Toaster("error", "An error occurred while changing the password");
    } finally {
      setLoader(false);
    }
  };

  return (
    <ModalWrapper
      handleClick={handlePasswordChange}
      loader={loader}
      btnName="Submit"
      heading={sendersEmail ? `Change Password for: ${sendersEmail}` : ""}
    >
      <div className="flex flex-col gap-3">
        {/* Current Password Input for `CHANGE_EMAIL_PASSWORD` */}
        {emailPasswordChangeModal && (
          <div className="relative">
            <label className="text-sm text-white">Current Password</label>
            <Input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Enter current password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeFill /> : <EyeSlashFill />}
            </button>
          </div>
        )}

        {/* New Password Input */}
        <div className="relative">
          <label className="text-sm text-white">New Password</label>
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Enter new password"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-600"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <EyeFill /> : <EyeSlashFill />}
          </button>
        </div>

        {/* Confirm Password Input for `CHANGE_PASSWORD` */}
        {!emailPasswordChangeModal && (
          <div className="relative">
            <label className="text-sm text-white">Confirm New Password</label>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeFill /> : <EyeSlashFill />}
            </button>
            {newPassword &&
              confirmPassword &&
              newPassword !== confirmPassword && (
                <span className="text-sm text-red-500">
                  Passwords do not match
                </span>
              )}
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

export default PasswordChangeModal;
