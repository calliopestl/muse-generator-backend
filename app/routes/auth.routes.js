const { verifyRegistration } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { verify } = require("jsonwebtoken");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"

        );
        next();
    });

    app.post(
        "/api/auth/register",
        [
            verifyRegistration.checkDuplicateUsernameOrEmail,
            verifyRegistration.checkRolesExisted
        ],
        controller.register
    );

    app.post("/api/auth/login", controller.login);
};