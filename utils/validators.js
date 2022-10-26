const validateName = (name) => {
    return name?.toString().length > 2;
}

const validateEmail = (email) => {
    return email?.toString().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validatePassword = (password) => {
    return password?.toString().length > 5;
}

const validateConfirmPassword = (password, confirm) => {
    return validatePassword(password) && password === confirm;
}

export {
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword
}