import React, { useState } from "react";

const Security = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validationRules = [
        { id: 1, test: (pwd) => pwd.length >= 8, message: "At least 8 characters long" },
        { id: 2, test: (pwd) => /[A-Z]/.test(pwd), message: "Includes at least one uppercase letter" },
        { id: 3, test: (pwd) => /[a-z]/.test(pwd), message: "Includes at least one lowercase letter" },
        { id: 4, test: (pwd) => /\d/.test(pwd), message: "Includes at least one number" },
    ];

    const isPasswordValid = validationRules.every((rule) => rule.test(password));
    const doPasswordsMatch = confirmPassword && password === confirmPassword;

    const handlePasswordChange = () => {
        if (isPasswordValid && doPasswordsMatch) {
            alert("Password changed successfully.");
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 p-8 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-bold">Change Password</h4>

            {/* Current Password */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col w-1/2">
                    <label className="text-sm font-semibold text-secondary" htmlFor="current-password">
                        Current Password
                    </label>
                    <input
                        className="w-full p-2 rounded border border-gray-300"
                        type="password"
                        id="current-password"
                        placeholder="Enter your current password"
                    />
                </div>
            </div>

            {/* New Password and Confirmation */}
            <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                    <label className="text-sm font-semibold text-secondary" htmlFor="new-password">
                        New Password
                    </label>
                    <input
                        className="w-full p-2 rounded border border-gray-300"
                        type="password"
                        id="new-password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-1/2">
                    <label className="text-sm font-semibold text-secondary" htmlFor="confirm-password">
                        Confirm New Password
                    </label>
                    <input
                        className="w-full p-2 rounded border border-gray-300"
                        type="password"
                        id="confirm-password"
                        placeholder="Re-enter your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

            {/* Validation Feedback */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <p className="text-sm font-semibold text-secondary">Your password must:</p>
                <ul className="mt-2 space-y-1">
                    {validationRules.map((rule) => (
                        <li
                            key={rule.id}
                            className={`text-sm ${
                                rule.test(password) ? "text-green-600" : "text-gray-400"
                            }`}
                        >
                            {rule.message}
                        </li>
                    ))}
                </ul>
                {confirmPassword && (
                    <p
                        className={`mt-2 text-sm ${
                            doPasswordsMatch ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {doPasswordsMatch ? "Passwords match" : "Passwords do not match"}
                    </p>
                )}
            </div>

            {/* Change Password Button */}
            <button
                className={`self-end mt-4 py-2 px-4 rounded ${
                    isPasswordValid && doPasswordsMatch
                        ? "bg-blue-900 text-white hover:bg-blue-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handlePasswordChange}
                disabled={!isPasswordValid || !doPasswordsMatch}
            >
                Change Password
            </button>
        </div>
    );
};

export default Security;
