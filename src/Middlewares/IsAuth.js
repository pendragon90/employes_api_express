const IsAuth = (req,res,next) => {
    if(!req.session.user_id) {
        res.status(400).json({
            message:'You must login'
        })
    }
    next()
}

export default IsAuth