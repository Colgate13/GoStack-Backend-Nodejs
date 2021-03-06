const express = require('express');

const app = express();

app.use(express.json());

app.get("/projects", (request, response) => {
  const {title , owner} = request.query;

  console.log(title);
  console.log(owner)
  return response.json({ Projeto: "Lili" })
})

app.post("/projects", (request, response) => {
  const body = request.body;

  const { title } = request.body;

  const owener_body = request.body.owner;
  console.log(body)

  return response.json({ body: body, "Title": `${title}`, 'Owner': `${owener_body}`  })
})

app.put("/projects/:id", (request, response) => {
  const params = request.params; // PEGA todos os parametros passados

  const params_id = request.params.id; // PEGA SO O PARAMETRO ID

  const { id } = request.params; // PEGA SO O PARAMETRO ID de um jeito diferente

  console.log(params_id)
  return response.json({ params: `${id}` })
})

app.delete("/projects/:id", (request, response) => {
  return response.json({ REMOVEEEEEE: "Projeto: Lili" })
})
app.listen(3330, () => console.log("🧛‍♀️ > Server is running! 🧡Eu amo a Lili💖"));
 