const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const application = express();
application.engine('mustache', mustache());
application.set('views', './views');
application.set('view engine', 'mustache');
application.use(express.static(__dirname + '/public'));
application.use(bodyParser.urlencoded());


application.get('/todos', async (request, response) => {
         var result = await models.Todolist.all();
         response.render("todos", {todolists: result});
});

application.post('/todos', (request, response) => {
    var todolist = request.body.todolists;

    models.Todolist.create(todolist)
        .then(result => response.json(result));
});

application.put('/todos/:id', async (request, response) => {
    var todolist = request.body.todolists;
    var result = await models.Todolist.update(todolist, { where: {id: request.params.id}});
    response.json(request.body.todolists);
});

application.delete('/todos/:id', async (request, response) => {
    models.Todolist.destroy({ where: {id: request.params.id}});
     response.json(request.body.todolists);
});


application.listen(3000);