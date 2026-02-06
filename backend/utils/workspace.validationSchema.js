export const workspaceSchema = {
    workspaceName:{
        trim:true,
        notEmpty:{
            errorMsg:"Workspace name is required"
        },
        isString:{
            errorMsg:"Workspace name must be string"
        },
        isLength:{
            options:{
                min:2,
                max:32
            },
            errorMsg:"Workspace name should be 2-32 characters long."
        }
    },
    createdBy:{
        trim:true,
        notEmpty:{
            errorMsg:"admin name is required"
        },
        isString:{
            errorMsg:"admin name must be string"
        },
        isLength:{
            options:{
                min:3,
                max:32,
            },
            errorMsg:"Admin name should be 3-32 characters long."
        }
    },
    adminEmail:{
        trim:true,
        notEmpty:{
            errorMsg:"Admin Email is required"
        },
        isString:{
            errorMsg:"Admin Email must be string"
        },
        isLength:{
            options:{
                max:255,
                min:8
            },
            errorMsg:"Admin Email should be 8-255 characters long."
        },
        matches: {
            options: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
            errorMsg: "Admin email is not valid."
        }
    },
    description:{
        trim:true,
        notEmpty:{
            errorMsg:"Description is required"
        },
        isString:{
            errorMsg:"Description must be string"
        }
    },
    workspacePassword:{
        trim:true,
        notEmpty:{
            errorMsg:"workspacePassword is required"
        },
        isString:{
            errorMsg:"workspacePassword must be string"
        },
        matches:{
            options:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
            errorMsg: "Password must contain uppercase, lowercase, number & special character"
        }
    }
}

export const joinWorkspaceSchema = {
    workspaceName:{
        trim:true,
        notEmpty:{
            errorMsg:"Workspace name must be required",
        },
        isString:{
            errorMsg : "Workspace name must be string"
        },
        isLength:{
            options:{
                min:2,
                max:32
            },
            errorMsg:"Workspace name should be 2-32 characters long."
        }
    },
    workspacePassword:{
        trim:true,
        notEmpty:{
            errorMsg:"workspacePassword is required"
        },
        isString:{
            errorMsg:"workspacePassword must be string"
        },
        matches:{
            options:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
            errorMsg: "Password must contain uppercase, lowercase, number & special character"
        }
    }

}