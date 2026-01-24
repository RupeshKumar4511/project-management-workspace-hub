export const loginSchema = {
    username: {
        notEmpty: {
            errorMsg: "Username is required."
        },
        isString: {
            errorMsg: "Username must be string."
        },
        isLength: {
            options: {
                min: 3,
                max: 255
            },
            errorMsg: "Username must be atleast 3-255 characters long."
        }
    },
    password: {
        notEmpty: {
            errorMsg: "Password is required."
        },
        isString: {
            errorMsg: "Password must be string."
        },
        isLength: {
            options: {
                min: 8,
                max: 32
            },
            errorMsg: "password must be atleast 8-32 characters long."
        },
        matches:{
            options:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMsg:"password is not valid"
        }
    }
}

export const signUpSchema = {
    otp:{
        notEmpty:{
            errorMsg:"OTP is required"
        },
        isString: {
            errorMsg: "OTP must be string."
        },
        isLength: {
            options: {
                min: 6,
                max: 6
            },
            errorMsg: "OTP must be 6 characters long."
        },
    },
    username: {
        notEmpty: {
            errorMsg: "Username is required."
        },
        isString: {
            errorMsg: "Username must be string."
        },
        isLength: {
            options: {
                min: 3,
                max: 32
            },
            errorMsg: "Username must be atleast 3-32 characters long."
        }
    },
    email: {
        notEmpty: {
            errorMsg: "email is required."
        },
        isString: {
            errorMsg: "email must be string."
        },
        isLength: {
            options: {
                min: 8,
                max: 255
            },
            errorMsg: "email must be atleast 8-255 characters long."
        },
        matches:{
            options:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
            errorMsg:"email is not valid."
        }
    },
    password: {
        notEmpty: {
            errorMsg: "Password is required."
        },
        isString: {
            errorMsg: "Password must be string."
        },
        isLength: {
            options: {
                min: 8,
                max: 32
            },
            errorMsg: "password must be atleast 8-32 characters long."
        }
    }
}

export const resetPasswordSchema = {
    otp:{
        notEmpty:{
            errorMsg:"OTP is required"
        },
        isString: {
            errorMsg: "OTP must be string."
        },
        isLength: {
            options: {
                min: 6,
                max: 6
            },
            errorMsg: "OTP must be 6 characters long."
        },
    },
    email:{
        notEmpty:{
            errorMsg:"email is required"
        },
        isString:{
            errorMsg:"email must be string"
        },
        isLength: {
            options: {
                min: 8,
                max: 255
            },
            errorMsg: "email must be atleast 8-32 characters long."
        }
    },
    password: {
        notEmpty: {
            errorMsg: "Password is required."
        },
        isString: {
            errorMsg: "Password must be string."
        },
        isLength: {
            options: {
                min: 8,
                max: 32
            },
            errorMsg: "password must be atleast 8-32 characters long."
        },
        matches:{
            options:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
            errorMsg:"email is not valid."
        }
    }
} 


export const verifyUserSchema = {
    email:{
        notEmpty:{
            errorMsg:"email is required"
        },
        isString:{
            errorMsg:"email must be string"
        },
        isLength: {
            options: {
                min: 8,
                max: 255
            },
            errorMsg: "email must be atleast 8-255 characters long."
        },
        matches:{
            options:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
            errorMsg:"email is not valid."
        }
    },
    otp:{
        notEmpty:{
            errorMsg:"OTP is required"
        },
        isString: {
            errorMsg: "OTP must be string."
        },
        isLength: {
            options: {
                min: 6,
                max: 6
            },
            errorMsg: "OTP must be 6 characters long."
        },
    }
}