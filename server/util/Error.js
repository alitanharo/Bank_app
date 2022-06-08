const exeption = {
    BadRequest: {
        message: 'wrong argument',
        httpStatusCode: 400,
    },
    Unauthorized: {
        message: 'unauthorized',
        httpStatusCode: 401,
    },
    UserNotFound: {
        message: 'user not found',
        httpStatusCode: 404,
    },
    UserAlreadyExist: {
        message: 'User Already Exist',
        httpStatusCode: 409,
    },
    UserForbidden: {
        message: 'User Does Not Access',
        httpStatusCode: 403,
    },
}



const createError = (er) => {
    try {
        let error = new Error()
        error.isApplicationException = true
        error.message = er.message
        error.httpStatusCode = er.httpStatusCode
        return error;
    } catch (ex) {
        console.log(ex)
    }
};


module.exports = {
    createError,
    exeption
}