module.exports = function (app) {
    app.post('/:controller/:action/', (req, res) => {
        var controllerName = req.params.controller;
        var controller = require('../controllers/' + controllerName+"Controller");
        var controllerObj = new controller(req);
        controllerObj.doPostAction()
            .then(data => {
                console.log("######RESPONSE####")
                res.status(data.status);
                res.send(data);
            })
            .catch(err => {
                res.status(err.status);
                res.send(err);
            });
    }); 

    app.get('/:controller/:action/', (req, res) => {
        var controllerName = req.params.controller;
        var controller = require('../controllers/' + controllerName+"Controller");
        var controllerObj = new controller(req);
        controllerObj.doGetAction()
            .then(data => {
                console.log("######RESPONSE####")
                res.status(data.status);
                res.send(data);
            })
            .catch(err => {
                res.status(err.status);
                res.send(err);
            });
    });
};