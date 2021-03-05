const express = require('express');

const app = express();

app.get("/", (request, response) => {
  return response.json({ filhaDaPuta: "GAY VIADO" })
})


app.listen(3330, () => console.log("🧛‍♀️> Server is running!"));
 