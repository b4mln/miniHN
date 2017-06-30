const express      = require('express'),
      router       = express.Router(),
      User         = require("../models/user"),
      passport     = require("passport");

/**
 * @swagger
 * /user/login:
 *  post:
 *   tags:
 *    - Users
 *   summary: Login to the system
 *   produces:
 *    - application/json
 *   responses:
 *      200:
 *        description: The access token to use througut the session
 *   consumes:
 *     - application/json
 *   parameters:
 *     - name: login
 *       description: Login details
 *       in: body
 *       required: true
 *       schema:
 *           properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 */
router.post('/login', passport.authenticate('local', { session: false }), function(req, res) {
    res.json({ token: req.user.dataValues.token })
});

/**
 * @swagger
 * /user/logout:
 *  get:
 *      tags:
 *       - Users
 *      summary: Logout from the system
 *      produces:
 *       - application/json
 *      responses:
 *        200:
 *          description: An empty response
 *      consumes:
 *        - application/json
 */
router.get('/logout', passport.authenticate('bearer', { session: false }), function(req, res) {
    User.findById(res.user.dataValues.id)
        .then(user => user.update({
            token: null
        }))
        .then(() => {
            req.logout();
            res.json({});
        });
});

/**
 * @swagger
 * /user/register:
 *  post:
 *      tags:
 *       - Users
 *      summary: Register a new user
 *      produces:
 *       - application/json
 *      responses:
 *        200:
 *          description: The created user
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          description: Login details
 *          in: body
 *          required: true
 *          schema:
 *              properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 */
router.post('/register', function(req, res) {
    User.create({
        username:   req.body.username,
        name:       req.body.name,
        email:      req.body.email,
        password:   User.hashPassword(req.body.password)
    }).then(user =>
        res.json({
            username: user.dataValues.username,
            name: user.dataValues.name,
            email: user.dataValues.email
        })
    );
});

module.exports = router;
