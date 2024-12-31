import React from "react";

const Header = ({ currentPage }) => {
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");
    const userName = `${firstName} ${lastName}`;

    const getInitials = (name) => {
        const nameParts = name.split(" ");
        const firstNameInitial = nameParts[0]?.[0] || "";
        const lastNameInitial = nameParts[nameParts.length - 1]?.[0] || "";
        return (firstNameInitial + lastNameInitial).toUpperCase();
    };

    return (
        <div className="flex justify-between items-center px-8 py-2 bg-white">
            <h2 className="font-bold text-2xl text-secondary">{currentPage}</h2>
            <div className="flex items-center space-x-3">
                <div className="flex flex-col text-right">
                    <span className="font-semibold text-secondary">{userName}</span>
                    <span className="text-sm text-secondary">Teacher</span>
                </div>
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                    {getInitials(userName)}
                </div>
            </div>
        </div>
    );
};

export default Header;
