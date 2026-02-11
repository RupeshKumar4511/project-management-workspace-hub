export const loginSchema = {
    username: {
        trim:true,
        notEmpty: {
            errorMessage: "Username is required."
        },
        isString: {
            errorMessage: "Username must be string."
        },
        isLength: {
            options: {
                min: 3,
                max: 255
            },
            errorMessage: "Username must be atleast 3-255 characters long."
        }
    },
    password: {
        trim:true,
        notEmpty: {
            errorMessage: "Password is required."
        },
        isString: {
            errorMessage: "Password must be string."
        },
        isLength: {
            options: {
                min: 8,
                max: 32
            },
            errorMessage: "password must be atleast 8-32 characters long."
        },
        matches: {
            options: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
            errorMessage: "Password must contain uppercase, lowercase, number & special character"
        }

    }
}

export const signUpSchema = {
    otp: {
        trim:true,
        notEmpty: {
            errorMessage: "OTP is required"
        },
        isString: {
            errorMessage: "OTP must be string."
        },
        isLength: {
            options: {
                min: 6,
                max: 6
            },
            errorMessage: "OTP must be 6 characters long."
        },
    },
    username: {
        trim:true,
        notEmpty: {
            errorMessage: "Username is required."
        },
        isString: {
            errorMessage: "Username must be string."
        },
        isLength: {
            options: {
                min: 3,
                max: 32
            },
            errorMessage: "Username must be atleast 3-32 characters long."
        }
    },
    email: {
        trim:true,
        notEmpty: {
            errorMessage: "email is required."
        },
        isString: {
            errorMessage: "email must be string."
        },
        isLength: {
            options: {
                min: 8,
                max: 255
            },
            errorMessage: "email must be atleast 8-255 characters long."
        },
        matches: {
            options: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
            errorMessage: "email is not valid."
        }
    },
    password: {
        trim:true,
        notEmpty: {
            errorMessage: "Password is required."
        },
        isString: {
            errorMessage: "Password must be string."
        },
        isLength: {
            options: {
                min: 8,
                max: 32
            },
            errorMessage: "password must be atleast 8-32 characters long."
        },
        matches: {
            options: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
            errorMessage: "Password must contain uppercase, lowercase, number & special character"
        }

    }
}

export const resetPasswordSchema = {
    otp: {
        trim:true,
        notEmpty: {
            errorMessage: "OTP is required"
        },
        isString: {
            errorMessage: "OTP must be string."
        },
        isLength: {
            options: {
                min: 6,
                max: 6
            },
            errorMessage: "OTP must be 6 characters long."
        },
    },
    email: {
        trim:true,
        notEmpty: {
            errorMessage: "email is required"
        },
        isString: {
            errorMessage: "email must be string"
        },
        isLength: {
            options: {
                min: 8,
                max: 255
            },
            errorMessage: "email must be atleast 8-32 characters long."
        }
    },
    password: {
        trim:true,
        notEmpty: {
            errorMessage: "Password is required."
        },
        isString: {
            errorMessage: "Password must be string."
        },
        isLength: {
            options: {
                min: 8,
                max: 32
            },
            errorMessage: "password must be atleast 8-32 characters long."
        },
        matches: {
            options: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
            errorMessage: "Password must contain uppercase, lowercase, number & special character"
        }

    }
}


export const verifyUserSchema = {
    email: {
        trim:true,
        notEmpty: {
            errorMessage: "email is required"
        },
        isString: {
            errorMessage: "email must be string"
        },
        isLength: {
            options: {
                min: 8,
                max: 255
            },
            errorMessage: "email must be atleast 8-255 characters long."
        },
        matches: {
            options: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
            errorMessage: "email is not valid."
        }
    },
    otp: {
        trim:true,
        notEmpty: {
            errorMessage: "OTP is required"
        },
        isString: {
            errorMessage: "OTP must be string."
        },
        isLength: {
            options: {
                min: 6,
                max: 6
            },
            errorMessage: "OTP must be 6 characters long."
        },
    }
}