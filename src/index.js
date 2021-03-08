const express = require('express');
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());


const projects = [];

function logRequests(request, response, next)
{

   const { method, url } = request;

   const logLabel = `[${method.toUpperCase()}] ${url}`;
   console.time(logLabel)//Console.time conta o tempo de um console.log para outro
    
   next();
    console.timeEnd(logLabel);

}

function validateProjectId(request, response, next)
{
    const { id } = request.params;
    if(!isUuid(id))
    {
      return response.status(400).json({ error: 'Invalid project ID.'})
    }
    
    return next()

}
//criando um Middleware para todas as rotas, para rotas individuais fazer igual no comentario a baixo
app.use(logRequests);
app.use('/projects/:id', validateProjectId)// Uma maneria de passar um Middleware so para uma rota

//app.get("/projects", logRequests, Middleware1, Middleware2 (request, response) => {
//Podemos colocar Middleware diretamente nas rotas e quantos Middleware quisermos
app.get("/projects", (request, response) => {

  const {title } = request.query;

  const results = title
  ? projects.filter(project => project.title.includes(title))
  : projects

  return response.json(results)
})

app.post("/projects", (request, response) => {
  const {title , owner} = request.body;
  
  const project = { id: uuid(),  title, owner };

  projects.push(project);

  return response.json(project)
})

app.put("/projects/:id", (request, response) => {
  const { id } = request.params; // PEGA todos os parametros passados
  const {title , owner} = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0)
  {
    return response.status(400).json( { error: 'Project not found' } )
  }

  const project = {
    id,
    title,
    owner,
  };
  
  projects[projectIndex] = project;

  return response.json(project)
})

app.delete("/projects/:id", (request, response) => {

  const { id } = request.params; // PEGA todos os parametros passados

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0)
  {
    return response.status(400).json( { error: 'Project not found' } )
  }

  projects.splice(projectIndex, 1);


  return response.status(204).send()
})

app.listen(3330, () => console.log("🧛‍♀️ > Server is running! 🧡Eu amo a Lili💖"));
 