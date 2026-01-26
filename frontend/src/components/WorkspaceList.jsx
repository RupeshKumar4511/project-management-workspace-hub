export default function WorkspaceList() {
    const workspaces = [
        { id: 1, name: "Acme Corp", description: "Product development & marketing" },
        { id: 2, name: "Blue Ocean", description: "Client projects and delivery" },
        { id: 3, name: "Nova Team", description: "Internal tools & R&D" },
    ];
    return (
        <div className="bg-white rounded-3xl shadow-lg md:p-10 w-full">
            <h3 className="text-xl font-semibold text-gray-800 ">
                Existing Workspaces
            </h3>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workspaces.map((w) => (
                    <div
                        key={w.id}
                        className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 hover:bg-white hover:shadow-md transition"
                    >
                        <p className="font-medium text-gray-800">{w.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{w.description}</p>
                        <button className="mt-3 text-sm px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                            Join Workspace
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}