import React, { useState, useRef } from "react";
import api from "../../../api";
import { Toast } from "primereact/toast"; // Import Toast component

const Security = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const toast = useRef(null); // Reference for Toast component

    const validationRules = [
        { id: 1, test: (pwd) => pwd.length >= 8, message: "At least 8 characters long" },
        { id: 2, test: (pwd) => /[A-Z]/.test(pwd), message: "Includes at least one uppercase letter" },
        { id: 3, test: (pwd) => /[a-z]/.test(pwd), message: "Includes at least one lowercase letter" },
        { id: 4, test: (pwd) => /\d/.test(pwd), message: "Includes at least one number" },
    ];

    const isPasswordValid = validationRules.every((rule) => rule.test(newPassword));
    const doPasswordsMatch = newPassword === confirmPassword;

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
    
        if (!isPasswordValid) {
            toast.current.show({
                severity: "error",
                summary: "Password Error",
                detail: "New password does not meet all requirements.",
                life: 3000,
            });
            return;
        }
    
        if (!doPasswordsMatch) {
            toast.current.show({
                severity: "error",
                summary: "Password Error",
                detail: "New passwords do not match.",
                life: 3000,
            });
            return;
        }
    
        try {
            const response = await api.put('/api/user/update-password/', {
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            });

            setSuccessMessage("Password updated successfully!");
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Password updated successfully!",
                life: 3000,
            });

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                if (errorData.detail) {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: errorData.detail,
                        life: 3000,
                    });
                } else if (errorData.current_password) {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: errorData.current_password[0],
                        life: 3000,
                    });
                } else if (errorData.new_password) {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: errorData.new_password[0],
                        life: 3000,
                    });
                } else if (errorData.confirm_password) {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: errorData.confirm_password[0],
                        life: 3000,
                    });
                } else {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "An error occurred. Please try again.",
                        life: 3000,
                    });
                }
            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Connection Error",
                    detail: "Unable to connect to the server.",
                    life: 3000,
                });
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 p-8 bg-white rounded-lg shadow-md">
            <Toast ref={toast} /> {/* Toast component */}

            <h4 className="text-lg font-bold">Change Password</h4>

            <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="current-password" className="font-semibold">Current Password</label>
                    <input
                        type="password"
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label htmlFor="new-password" className="font-semibold">New Password</label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="confirm-password" className="font-semibold">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full p-2 border rounded ${confirmPassword.length > 0 && (doPasswordsMatch ? "border-green-500" : "border-red-500")}`}
                            required
                        />
                    </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    <p>Password must:</p>
                    <ul>
                        {validationRules.map((rule) => (
                            <li key={rule.id} className={rule.test(newPassword) ? "text-green-500" : "text-gray-400"}>
                                {rule.message}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Only show match/mismatch message when user starts typing in confirm password */}
                {confirmPassword.length > 0 && (
                    <div className={`text-sm mt-2 ${doPasswordsMatch ? "text-green-500" : "text-red-500"}`}>
                        {doPasswordsMatch ? "Passwords match!" : "Passwords do not match!"}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={!isPasswordValid || !doPasswordsMatch || !currentPassword}
                    className={`py-2 px-4 rounded ${
                        isPasswordValid && doPasswordsMatch && currentPassword
                            ? "bg-blue-500 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default Security;
