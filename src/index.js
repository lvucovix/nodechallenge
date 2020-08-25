const express = require('express');
const { request, response } = require('express');
const cors = require('cors');
const {v4: uuid} = require('uuid');
const app = express();

app.use(cors());
app.use(express.json());

/* Métodos HTTP:

GET: Buscar informações do back-end
POST: Criar no back-end
PUT/PATCH: Alterar no back-end, PUT tudo, PATCH algo mais específico
DELETE: Deleta do back-end
*/


/* Tipos de parâmetro: 

Query Params: PRINCIPALMENTE para filtros e paginação, não necessariamente
ROute Params: Indentificar recursos (atualizar/deletar)
Request Body: Conteudo na hora de criar ou editar um recurso(JSON)
*/ 

const projects = [];

app.get('/projects', (request,response)=>{
    const {title} = request.query;

    const results = title 
        ? projects.filter(project => project.title.includes(title))
        : projects;
    return response.json(results);
});

app.post('/projects', (request,response)=>{
    const {title , owner} = request.body;

    const project = {id: uuid(),title, owner};

    projects.push(project)

    return response.json(project);
});

app.put('/projects/:id', (request,response)=>{
    const {id} = request.params;
    const {title , owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0 ) {
        return response.status(404).json({error: 'Not found '})
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request,response)=>{
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0 ) {
        return response.status(404).json({error: 'Not found '})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
    
});


app.listen(3333, ()=> {
    console.log('Back-end started, filha da puta')
});