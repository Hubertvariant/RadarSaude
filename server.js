const path = require('path');
const express = require('express');
const { createRequestHandler } = require('@expo/server/adapter/express');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const CLIENT_BUILD_DIR = path.join(__dirname, 'dist/client');
const SERVER_BUILD_DIR = path.join(__dirname, 'dist/server');

// 1. Serve arquivos estáticos
app.use(
  express.static(CLIENT_BUILD_DIR, {
    index: false,
  })
);

// 2. Encaminha todas as rotas para o adaptador SSR do Expo
// No Express 5, basta passar o middleware direto sem a string '*'
app.use(
  createRequestHandler({
    build: SERVER_BUILD_DIR,
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Servidor SSR rodando dinamicamente em http://${HOST}:${PORT}`);
});
