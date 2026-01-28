export const workspaceSchema = {
    workspaceName:{
        notEmpty:{
            errorMsg:"Workspace name is required"
        },
        isString:{
            errorMsg:"Workspace name must be string"
        }
    },
    createdBy:{
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
        notEmpty:{
            errorMsg:"Description is required"
        },
        isString:{
            errorMsg:"Description must be string"
        }
    },
    workspacePassword:{
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
    },
    adminPassword:{
        notEmpty:{
            errorMsg:"workspacePassword is required"
        },
        isString:{
            errorMsg:"workspacePassword must be string"
        },
        isLength: {
            options: {
                min: 8,
                max: 32
            },
            errorMsg: "Workspace password must be atleast 8-32 characters long."
        },
        matches:{
            options:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
            errorMsg: "Workspace password must contain uppercase, lowercase, number & special character"
        }
    }
}