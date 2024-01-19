
 function validationError(message,SERVER_ERROR){
    return {
        error_code: SERVER_ERROR?SERVER_ERROR:'VALIDATION_ERROR',
        message: message?message:"Unknown error"
    }
}

 function validateCoordinates(latitude, longitude) {
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}
function validateString(value) {
    return typeof value === 'string' && value.length >= 1;
}

module.exports={validateCoordinates,validationError,validateString}