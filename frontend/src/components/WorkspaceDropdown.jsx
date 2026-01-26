import { useSelector } from "react-redux";

function WorkspaceDropdown() {

    const currentWorkspace = useSelector((state) => state.workspace?.currentWorkspace || null);

    return (
        <div className="relative m-4" >
            <button  className="w-full flex items-center justify-between p-3 h-auto text-left rounded hover:bg-gray-100 dark:hover:bg-zinc-800" >
                <div className="flex items-center gap-3">
                    <img src={currentWorkspace?.image_url} alt={currentWorkspace?.name} className="w-8 h-8 rounded shadow" />
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                            {currentWorkspace?.name || "Select Workspace"}
                        </p>
                    </div>
                </div>
            </button>
        </div>
    );
}

export default WorkspaceDropdown;
