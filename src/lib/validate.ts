interface FormValues {
    username: string;
    email: string;
    password: string;
    cpassword?: string; // Optional, as it's only used in the registerValidate function
}
export default function login_validate(values: FormValues){
    const errors = {};
    // validation for email
    if(!values.email){
        errors.email="Required";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email address';
    }
    

    // validation for password
    if(!values.password){
        errors.password = "Required";
    }
    else if(values.password.length < 8 || values.password.length >20){
        errors.password = "Must be greater than 8 and less then 20 characters long";
    }
    else if(values.password.includes(" ")){
        errors.password = "Invalid password don't include any white spaces";
    }
    return errors;
}
export function registerValidate(values:any){
    const errors = {};
    if(!values.username){
        errors.username="Required";
    }
    else if(values.username.includes(" ")){
        errors.username = "Username should not contain any white spaces";
    }
    // validation for email
    if(!values.email){
        errors.email="Required";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email address';
    }
    

    // validation for password
    if(!values.password){
        errors.password = "Required";
    }
    else if(values.password.length < 8 || values.password.length >20){
        errors.password = "Must be greater than 8 and less then 20 characters long";
    }
    else if(values.password.includes(" ")){
        errors.password = "Invalid password don't include any white spaces";
    }

    // validation for confirm password
    if(!values.cpassword){
        errors.cpassword = "Required"
    }
    else if(values.password !== values.cpassword){
        errors.cpassword = "Passwords should match "
    }
    else if(values.password.includes(" ")){
        errors.password = "Invalid confirm password, don't include any white spaces";
    }

    return errors
    
}