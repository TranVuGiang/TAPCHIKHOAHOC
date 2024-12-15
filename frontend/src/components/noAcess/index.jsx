const NoAccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">
                    Access Denied
                </h1>
                <p className="text-gray-600 mb-4">
                    You don't have permission to access this page.
                </p>
                <button
                    onClick={() => window.location.href="/"}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NoAccess;