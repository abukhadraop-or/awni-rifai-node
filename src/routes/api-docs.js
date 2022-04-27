const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const router = express.Router();

/**
 * Serve swaggerUi static files.
 */
router.use('/', swaggerUi.serve);
/**
 * Handle GET to /api-docs route.
 */
router.get('/', swaggerUi.setup(YAML.load('swagger.yml')));

module.exports = router;
