const debug = require('debug')('debug');
module.exports = (app) => {
    app.post('/:controller/:action/', (req, res) => {
        let controllerName = req.params.controller;
        let controller = require('../controllers/' + controllerName+"Controller");
        let controllerObj = new controller(req);
        debug('START');
        controllerObj.doPostAction()
            .then(data => {
                debug("######RESPONSE####");
                res.status(data.status);
                res.send(data);
            })
            .catch(err => {
                debug("######POST API ERROR####")
                res.status(err.status);
                res.send(err);
            });
    }); 

    app.get('/:controller/:action/', (req, res) => {
        let controllerName = req.params.controller;
        let controller = require('../controllers/' + controllerName+"Controller");
        let controllerObj = new controller(req);
        debug('START');
        controllerObj.doGetAction()
            .then(data => {
                debug("######RESPONSE####");
                res.status(data.status);
                res.send(data);
            })
            .catch(err => {
                debug("######POST API ERROR####")
                res.status(err.status);
                res.send(err);
            });
    }); 


    return app;
};