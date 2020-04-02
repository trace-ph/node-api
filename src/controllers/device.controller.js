// TODO: Remove initial function
const greet = (request, response) => {
  response.status(201).json({ success: true });
};

module.exports = {
  greet,
};
