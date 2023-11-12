const IsOwner = (req,res,next) => {
    if(req.session.user_id == req.params.id || req.session.user_role.name === 'admin') {
        next()
    }

    res.status(400).json({
        message:'You are\'nt owner'
    })
}

export default IsOwner