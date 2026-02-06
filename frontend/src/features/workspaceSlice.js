import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dummyWorkspaces } from "../assets/assets";

export const createWorkspace = createAsyncThunk('workspace/create', async (workspaceData, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/workspace/create-workspace', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(workspaceData),
            credentials: 'include'
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "workspace creation failed");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const joinWorkspace = createAsyncThunk('workspace/join', async (joinWorkspaceData, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/workspace/join-workspace', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(joinWorkspaceData),
            credentials: 'include'
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "workspace creation failed");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    workspaces: dummyWorkspaces || [],
    currentWorkspace: dummyWorkspaces[1],
    loading: false,
    response: {
        createWorkspaceResponse: {},
        joinWorkspaceResponse: {}
    },
    error: {
        createWorkspaceError: '',
        joinWorkspaceError: ''
    }
};

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setWorkspaces: (state, action) => {
            state.workspaces = action.payload;
        },
        setCurrentWorkspace: (state, action) => {
            localStorage.setItem("currentWorkspaceId", action.payload);
            state.currentWorkspace = state.workspaces.find((w) => w.id === action.payload);
        },
        addWorkspace: (state, action) => {
            state.workspaces.push(action.payload);

            // set current workspace to the new workspace
            if (state.currentWorkspace?.id !== action.payload.id) {
                state.currentWorkspace = action.payload;
            }
        },
        updateWorkspace: (state, action) => {
            state.workspaces = state.workspaces.map((w) =>
                w.id === action.payload.id ? action.payload : w
            );

            // if current workspace is updated, set it to the updated workspace
            if (state.currentWorkspace?.id === action.payload.id) {
                state.currentWorkspace = action.payload;
            }
        },
        deleteWorkspace: (state, action) => {
            state.workspaces = state.workspaces.filter((w) => w._id !== action.payload);
        },
        addProject: (state, action) => {
            state.currentWorkspace.projects.push(action.payload);
            // find workspace by id and add project to it
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id ? { ...w, projects: w.projects.concat(action.payload) } : w
            );
        },
        addTask: (state, action) => {

            state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) => {
                console.log(p.id, action.payload.projectId, p.id === action.payload.projectId);
                if (p.id === action.payload.projectId) {
                    p.tasks.push(action.payload);
                }
                return p;
            });

            // find workspace and project by id and add task to it
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id ? {
                    ...w, projects: w.projects.map((p) =>
                        p.id === action.payload.projectId ? { ...p, tasks: p.tasks.concat(action.payload) } : p
                    )
                } : w
            );
        },
        updateTask: (state, action) => {
            state.currentWorkspace.projects.map((p) => {
                if (p.id === action.payload.projectId) {
                    p.tasks = p.tasks.map((t) =>
                        t.id === action.payload.id ? action.payload : t
                    );
                }
            });
            // find workspace and project by id and update task in it
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id ? {
                    ...w, projects: w.projects.map((p) =>
                        p.id === action.payload.projectId ? {
                            ...p, tasks: p.tasks.map((t) =>
                                t.id === action.payload.id ? action.payload : t
                            )
                        } : p
                    )
                } : w
            );
        },
        deleteTask: (state, action) => {
            state.currentWorkspace.projects.map((p) => {
                p.tasks = p.tasks.filter((t) => !action.payload.includes(t.id));
                return p;
            });
            // find workspace and project by id and delete task from it
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id ? {
                    ...w, projects: w.projects.map((p) =>
                        p.id === action.payload.projectId ? {
                            ...p, tasks: p.tasks.filter((t) => !action.payload.includes(t.id))
                        } : p
                    )
                } : w
            );
        },
        updateCreateWorkspaceResponse: (state) => {
            state.response.createWorkspaceResponse = {};
        },
        updateJoinWorkspaceResponse: (state) => {
            state.response.joinWorkspaceResponse = {};
        }

    },
    extraReducers: (builder => {
            builder.addCase(createWorkspace.pending, (state) => {
                state.loading = true;
            })
            .addCase(createWorkspace.fulfilled, (state, action) => {
                state.loading = false;
                state.error.createWorkspaceError = '';
                state.response.createWorkspaceResponse = action.payload

            })
            .addCase(createWorkspace.rejected, (state, action) => {
                state.loading = false;
                state.error.createWorkspaceError = action.payload || action.error.message || "Something went wrong.";

            })
            .addCase(joinWorkspace.pending, (state) => {
                state.loading = true;
            })
            .addCase(joinWorkspace.fulfilled, (state, action) => {
                state.loading = false;
                state.error.joinWorkspaceError = '';
                state.response.joinWorkspaceResponse = action.payload
                state.currentWorkspace=action.payload

            })
            .addCase(joinWorkspace.rejected, (state, action) => {
                state.loading = false;
                state.error.joinWorkspaceError = action.payload || action.error.message || "Something went wrong.";

            })

    })
});

export const { setWorkspaces, setCurrentWorkspace, addWorkspace, updateWorkspace, deleteWorkspace, addProject, addTask, updateTask, deleteTask, updateCreateWorkspaceResponse, updateJoinWorkspaceResponse } = workspaceSlice.actions;
export default workspaceSlice.reducer;