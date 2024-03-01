// const createError = require("./createError")


// const verifyToken = (req,res,next)=>{
//     const tokenFromHeader = req.headers.cookie
//     if(!tokenFromHeader) return  res.json(createError('token is not here',401))

//     const token = tokenFromHeader.split("=")[1]
//     // res.json({Token:token})
//     next()
// }

// module.exports = verifyToken