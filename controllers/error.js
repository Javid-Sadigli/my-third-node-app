function SEND_ERROR(req, res, next)
{
    res.status(404).render('error');
}

module.exports = {
    SEND_ERROR : SEND_ERROR
}