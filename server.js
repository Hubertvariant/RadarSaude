const path = require('path');
const express = require('express');
const { createRequestHandler } = require('@expo/server/adapter/express');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Garante que o Render consiga se conectar ao container

const CLIENT_BUILD_DIR = path.join(__dirname, 'dist/client');
const SERVER_BUILD_DIR = path.join(__dirname, 'dist/server');

// Serve arquivos estáticos
app.use(express.static(CLIENT_BUILD_DIR));

// Trata as requisições dinâmicas
app.all(
  '*',
  createRequestHandler({
    build: SERVER_BUILD_DIR,
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Servidor dinâmico rodando em http://${HOST}:${PORT}`);
});
