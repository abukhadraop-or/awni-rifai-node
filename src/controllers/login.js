const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== process.env.ADMIN) {
      return res.status(404).send({ error: 'invalid credentials' });
    }

    if (password !== process.env.PASSWORD) {
      return res.status(404).send({ error: 'invalid credentials' });
    }

    const accessToken = jwt.sign(
      { username, password },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.send({ accessToken });

    // credentails are valid continue;
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = { adminLogin };
