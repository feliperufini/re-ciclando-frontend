const validationName = (name) => {
    return name?.toString().length > 2;
}

const validationEmail = (email) => {
    return email?.toString().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validationPassword = (password) => {
    return password?.toString().length > 5;
}

const validationConfirmPassword = (password, confirm) => {
    return validationPassword(password) && password === confirm;
}

export {
    validationName,
    validationEmail,
    validationPassword,
    validationConfirmPassword
}