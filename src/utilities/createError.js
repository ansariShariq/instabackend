const createError = (message,statusCode)=>{
    const err = new Error()
    err.message = message || "Something Went Wrong "
    err.statusCode = statusCode || 500

    return err
}
module.exports = createError