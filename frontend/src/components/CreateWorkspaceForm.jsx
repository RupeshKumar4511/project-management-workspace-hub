export default function CreateWorkspaceForm() {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-800">
                Create Your Workspace
            </h2>
            <p className="text-gray-500 mt-2">
                Set up a new organizational space for your team and start managing
                projects instantly.
            </p>


            <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm text-gray-600">Workspace Name</label>
                    <input
                        type="text"
                        placeholder="e.g. My Company"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>


                <div>
                    <label className="text-sm text-gray-600">Admin Name</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>


                <div className="md:col-span-2">
                    <label className="text-sm text-gray-600">Description</label>
                    <textarea
                        rows={3}
                        placeholder="Short description about your organization"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>


                <div className="md:col-span-2">
                    <label className="text-sm text-gray-600">Admin Password</label>
                    <input
                        type="password"
                        placeholder="Set a secure password for admin"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
            </form>


            <button className="w-full mt-6 rounded-xl bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-700 transition">
                Create Workspace
            </button>
        </div>
    );
}