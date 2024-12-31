import React, { useState, useEffect, useRef } from "react";
import api from "../../../api";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog"; // Importing the ConfirmDialog component

const Personal = () => {
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const toast = useRef(null); // Reference for Toast

    // Fetch the user's profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/api/user/profile/");
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Function to accept update and display a success toast
    const acceptUpdate = async () => {
        try {
            const response = await api.put("/api/user/profile/", profile);
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Profile updated successfully!",
                life: 3000,
            });
            setProfile(response.data); // Update the state with the latest profile
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to update profile.",
                life: 3000,
            });
        }
    };

    // Function to trigger update confirmation dialog
    const handleSaveChanges = () => {
        confirmDialog({
            message: "Are you sure you want to save these changes?",
            header: "Confirm Update",
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "custom-accept-button custom-yes-button",
            accept: acceptUpdate, // Call the accept function when confirmed
            reject: () => {
                toast.current.show({
                    severity: "warn",
                    summary: "Cancelled",
                    detail: "Update cancelled",
                    life: 3000,
                });
            },
        });
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        try {
            await api.delete("/api/user/profile/");
            alert("Account deleted successfully.");
            localStorage.clear();
            window.location.href = "/login";
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Failed to delete account.");
        }
    };

    return (
        <>
            <div className="w-full h-full flex flex-col gap-6 p-8 bg-white rounded-lg shadow-md">
                <Toast ref={toast} /> {/* Toast component */}
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
                                name="first_name"
                                value={profile.first_name}
                                onChange={handleChange}
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
                                name="last_name"
                                value={profile.last_name}
                                onChange={handleChange}
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
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-sm font-semibold text-secondary" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="w-full p-2 rounded border border-gray-300"
                                type="user"
                                id="username"
                                name="username"
                                value={profile.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>

                    <button
                        className="self-end mt-4 py-2 px-4 text-sm bg-blue-900 text-white rounded hover:bg-blue-800"
                        onClick={handleSaveChanges}
                    >
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
