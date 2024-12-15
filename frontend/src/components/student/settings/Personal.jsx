import React, { useState } from "react";

const Personal = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteAccount = () => {
        setShowDeleteModal(false);
        // Call delete account API or handle deletion logic
        alert("Account deleted successfully.");
    };

    return (
        <>
            <div className="w-full h-full flex flex-col gap-6 p-8 bg-white rounded-lg shadow-md">
                {/* Personal Details */}
                <div className="w-full flex flex-col gap-4">
                    <h4 className="text-lg font-bold text-secondary">Personal Details</h4>
                    <div className="flex gap-4">
                        <div className="flex flex-col w-1/2">
                            <label className="text-sm font-semibold text-secondary" htmlFor="first-name">
                                First Name
                            </label>
                            <input
                                className="w-full p-2 rounded border border-gray-300"
                                type="text"
                                id="first-name"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-sm font-semibold text-secondary" htmlFor="last-name">
                                Last Name
                            </label>
                            <input
                                className="w-full p-2 rounded border border-gray-300"
                                type="text"
                                id="last-name"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col w-1/2">
                            <label className="text-sm font-semibold text-secondary" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full p-2 rounded border border-gray-300"
                                type="email"
                                id="email"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-sm font-semibold text-secondary" htmlFor="phone">
                                Mobile Number
                            </label>
                            <input
                                className="w-full p-2 rounded border border-gray-300"
                                type="text"
                                id="phone"
                                placeholder="Enter your mobile number"
                            />
                        </div>
                    </div>
                    <button className="self-end mt-4 py-2 px-4 text-sm bg-blue-900 text-white rounded hover:bg-blue-800">
                        Save Changes
                    </button>
                </div>

                {/* Delete Account Section */}
                <div className="border-t border-gray-300 pt-4">
                    <h4 className="text-lg font-bold text-red-600">Delete Account</h4>
                    <p className="text-sm text-secondary">
                        Deleting your account is permanent and will remove all your data.
                    </p>
                    <button
                        className="mt-4 py-2 px-4 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete Account
                    </button>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                        <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                            <h4 className="text-lg font-bold text-red-600">Confirm Account Deletion</h4>
                            <p className="text-sm text-secondary my-4">
                                Are you sure you want to delete your account? This action cannot be undone.
                            </p>
                            <div className="flex gap-4 justify-end">
                                <button
                                    className="py-2 px-4 text-sm bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="py-2 px-4 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={handleDeleteAccount}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Personal;
