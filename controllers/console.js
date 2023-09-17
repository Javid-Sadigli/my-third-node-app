const Colors = {
    RED : "\u001b[31m",
    GREEN : "\u001b[32m",
    BLUE : "\u001b[34m",
    WHITE : "\u001b[37m"
}

module.exports.LOG_Request = (req,res,next) => {
    
    if(req.url.startsWith('/admin', 0))
    {
        console.log(Colors.GREEN + `${req.method.toUpperCase()} request to ${req.url}`);
    }
    else
    {
        console.log(Colors.WHITE + `${req.method.toUpperCase()} request to ${req.url}`);
    }
    next();
};
module.exports.LOG_Not_Found = (req, res, next) => {
    console.log(Colors.RED + `NOT FOUND ${req.url}`);
    next();
};

module.exports.LOG_Created_Model = (model_name, model) => {
    console.log(Colors.WHITE + `CREATED ${model_name} : ${model}`);
};