export const workspaceSchema = {
    workspaceName: {
        trim: true,
        notEmpty: {
            errorMessage: "Workspace name is required"
        },
        isString: {
            errorMessage: "Workspace name must be string"
        },
        isLength: {
            options: {
                min: 2,
                max: 32
            },
            errorMessage: "Workspace name should be 2-32 characters long."
        }
    },
    createdBy: {
        trim: true,
        notEmpty: {
            errorMessage: "admin name is required"
        },
        isString: {
            errorMessage: "admin name must be string"
        },
        isLength: {
            options: {
                min: 3,
                max: 32,
            },
            errorMessage: "Admin name should be 3-32 characters long."
        }
    },
    adminEmail: {
        trim: true,
        notEmpty: {
            errorMessage: "Admin Email is required"
        },
        isString: {
            errorMessage: "Admin Email must be string"
        },
        isLength: {
            options: {
                max: 255,
                min: 8
            },
            errorMessage: "Admin Email should be 8-255 characters long."
        },
        matches: {
            options: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
            errorMessage: "Admin email is not valid."
        }
    },
    description: {
        trim: true,
        notEmpty: {
            errorMessage: "Description is required"
        },
        isString: {
            errorMessage: "Description must be string"
        }
    },
    workspacePassword: {
        trim: true,
        notEmpty: {
            errorMessage: "workspacePassword is required"
        },
        isString: {
            errorMessage: "workspacePassword must be string"
        },
        matches: {
            options: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
            errorMessage: "Password must contain uppercase, lowercase, number & special character"
        }
    }
}

export const joinWorkspaceSchema = {
    workspaceName: {
        trim: true,
        notEmpty: {
            errorMessage: "Workspace name must be required",
        },
        isString: {
            errorMessage: "Workspace name must be string"
        },
        isLength: {
            options: {
                min: 2,
                max: 32
            },
            errorMessage: "Workspace name should be 2-32 characters long."
        }
    },
    workspacePassword: {
        trim: true,
        notEmpty: {
            errorMessage: "workspacePassword is required"
        },
        isString: {
            errorMessage: "workspacePassword must be string"
        },
        matches: {
            options: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
            errorMessage: "Password must contain uppercase, lowercase, number & special character"
        }
    }

}


export const createProjectSchema = {
    projectName: {
        trim: true,
        notEmpty: {
            errorMessage: "project name is required"
        },
        isString: {
            errorMessage: "project name must be string"
        },
        isLength: {
            options: {
                min: 5,
                max: 255
            },
            errorMessage: "project name should be 5-255 characters long."
        }
    },
    workspaceName: {
        trim: true,
        notEmpty: {
            errorMessage: "workspace name is required"
        },
        isString: {
            errorMessage: "workspace name must be string"
        },
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "workspace name should be 5-32 characters long."
        }
    },
    projectLink: {
        trim: true,
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: "project link must be string"
        },
        isLength: {
            options: {
                min: 8,
                max: 255,
            },
            errorMessage: "project link should be 8-255 characters long."
        }
    },
    description: {
        trim: true,
        notEmpty: {
            errorMessage: "description is required"
        },
        isString: {
            errorMessage: "description must be string"
        },
        isLength: {
            options: {
                max: 1000,
                min: 8
            },
            errorMessage: "Admin Email should be 8-1000 characters long."
        }
    },
    status: {
        trim: true,
        notEmpty: {
            errorMessage: "status is required"
        },
        isIn: {
            options: [['Planning','Active','Completed','On Hold','Cancelled']], 
            errorMessage: 'Invalid status provided'
        }
    },
    priority: {
        trim: true,
        notEmpty: {
            errorMessage: "priority is required"
        },
        isIn: {
            options: [['Medium','Low','High']], 
            errorMessage: 'Invalid priority provided'
        }
    },
    projectLead: {
        trim: true,
        notEmpty: {
            errorMessage: "project_leader name is required"
        },
        isString: {
            errorMessage: "project_leader name must be string"
        },
        isLength: {
            options: {
                min: 3,
                max: 32
            },
            errorMessage: "project_leader name should be 3-32 characters long."
        }
    },
    startDate: {
        trim: true,
        isDate: {
            options: {
                format: 'DD-MM-YYYY',
                strictMode: true,
                delimiters: ['-']
            },
            errorMessage: "start date must be in DD-MM-YYYY"
        }
    },
    endDate: {
        trim: true,
        notEmpty: {
            errorMessage: "project_leader name is required"
        },
        isDate: {
            options: {
                format: 'DD-MM-YYYY',
                strictMode: true,
                delimiters: ['-']
            },
            errorMessage: "end date must be in DD-MM-YYYY"
        }
    }
}