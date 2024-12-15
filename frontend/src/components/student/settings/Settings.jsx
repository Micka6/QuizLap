import React, { useState } from "react";
import Personal from "./Personal";
import Security from "./Security";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("Personal"); // Default to "Personal"

    return (
        <div className="w-full h-full p-8 bg-gray-100">
            {/* Tab Navigation */}
            <div className="flex gap-4 border-b border-gray-300 pb-2">
                <button
                    className={`text-sm font-semibold ${
                        activeTab === "Personal" ? "text-blue-900 underline" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("Personal")}
                >
                    Personal
                </button>
                <button
                    className={`text-sm font-semibold ${
                        activeTab === "Security" ? "text-blue-900 underline" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("Security")}
                >
                    Security
                </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === "Personal" && <Personal />}
                {activeTab === "Security" && <Security />}
            </div>
        </div>
    );
};

export default Settings;
