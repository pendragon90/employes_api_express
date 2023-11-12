const IsAdmin = (req,res,next) => {
    if(req.session.user_role.name !== 'admin') {
        res.status(400).json({
            message:'You are\'nt admin'
        })
    }
    next()
}

export default IsAdmin