const validationName = (name: String) => {
    return name?.toString().length > 2;
}

const validationEmail = (email: String) => {
    const emailStr = email?.toString();
    return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
}

const validationPassword = (password: String) => {
    return password?.toString().length > 3;
}

const validationConfirmPassword = (password: String, confirmacao: String) => {
    return validationPassword(password) && password === confirmacao;
}

export {
    validationName,
    validationEmail,
    validationPassword,
    validationConfirmPassword
}