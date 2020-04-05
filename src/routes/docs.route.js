const express = require('express');
const docsController = require('~controllers/docs.controller');

const router = express.Router();

router.get('/', docsController.serveHtml);
router.get('/openapi.yaml', docsController.serveOpenApiYaml);

module.exports = router;
