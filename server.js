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


application.get('/', async (request, response) => {
         var result = await models.Todolist.all();
         response.render("todos", {todolists: result});
});

application.post('/', async (request, response) => {
    var todolist = {
        todo: request.body.todo
    }

    models.Todolist.create(todolist);
    var result = await models.Todolist.all();
    response.redirect('/')
});

application.post('/:id', async (request, response) => {
    await models.Todolist.destroy({ where: {id: request.params.id}});
     response.redirect('/');
});
application.get('/edit/:id', async (request, response) => {
    var todolist = await models.Todolist.findOne({
        where: {
            id: request.params.id
        }
    });
    var model = {
        id: todolist.id,
        todo: todolist.todo
    }
    console.log('model', model);
    response.render('edit-todo', model);
});

application.post('/edit/:id', async (request, response) => {
    var id = request.params.id
    await models.Todolist.update({todo: request.body.todo}, { where: {id: id } })
        response.redirect('/');
});

application.listen(3000);