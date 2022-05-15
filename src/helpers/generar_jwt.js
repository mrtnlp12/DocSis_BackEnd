const jwt = require("jsonwebtoken");

const generarJwt = (payload) => {
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      "aldo",
      {
        expiresIn: "4h",
      },
      (err, encoded) => {
        if (err) {
          rej(err);
        }
        res(encoded);
      }
    );
  });
};

module.exports = { generarJwt };
