const nodeService = require('~services/node.service');
const errorResponse = require('~models/error-response.model');

const save = (req, res) => {
  // eslint-disable-next-line camelcase
  const { device_id } = req.body;

  nodeService
    .find({ device_id })
    .then((nodeList) => {
      if (nodeList && nodeList.length) {
        return res.status(200).send(nodeList[0]);
      }
      return nodeService
        .save(device_id)
        .then((savedNode) => res.status(200).send(savedNode))
        .catch((err) => res.status(500).send(errorResponse(500, err.message)));
    })
    .catch((err) => res.status(500).send(errorResponse(500, err.message)));
};

const find = (req, res) => {
  nodeService
    .find(req.query)
    .then((nodeList) => {
      const status = nodeList && nodeList.length ? 200 : 204;
      res.status(status).send(nodeList);
    })
    .catch((err) => res.status(500).send(errorResponse(500, err.message)));
};

module.exports = {
  save,
  find,
};
