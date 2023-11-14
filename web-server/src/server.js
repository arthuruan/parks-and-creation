const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


// Rotas
app.use('/api/vacancies', require('./routes/vacancy'));
app.use('/api/sectors', require('./routes/sector'));

async function initServer() {
  try {
    await sequelize.authenticate();
    console.log('DB Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // Sincronize o banco de dados e inicie o servidor
  sequelize.sync().then(() => {
    app.listen(8080, () => {
      console.log('Servidor em execução na porta 3000');
    });
  });
}

initServer()