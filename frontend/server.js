const path = require('path');
const express = require('express');

module.exports = {
    app: function() {
        const app = express();
        const indexPath = path.join(__dirname,'../Public/index.html');
        const publicPath = express.static(path.join(__dirname,'../Public'));
        const scriptPath = express.static(path.join(__dirname,'../node_modules'));
        app.use('/scripts', scriptPath);
        app.use('/public',publicPath);
        app.get('/',function(_,res){res.sendFile(indexPath)});
        app.set('json spaces', 2);
        return app
    }
};