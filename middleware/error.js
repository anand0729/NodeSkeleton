
module.exports = function(router) {
    
    /* app.use((req, res, next) => {
        const err = new Error(`${req.method} ${req.url} Not Found`);
        err.status = 404;
        next(err);
    }); */
   

    /* app.use((err, req, res, next) => {
        //console.error(err);
        res.status(err.status || 500);
        res.json({
        error: {
            message: err.message,
        },
        });
    });  */

    router.all('*', function(req, res) {
        res.status(400).json({error: {msg: 'Bad request'}});
    })




}


 