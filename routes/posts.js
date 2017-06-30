const express  = require('express'),
      router   = express.Router(),
      Post     = require("../models/post"),
      passport = require("passport");

/**
 * @swagger
 * /post:
 *  post:
 *      tags:
 *       - Posts
 *      summary: Create a new post
 *      produces:
 *       - application/json
 *      responses:
 *        200:
 *          description: The created post
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: access_token
 *          required: true
 *          in: query
 *          type: string
 *        - name: text
 *          description: The Post text
 *          in: body
 *          required: true
 *          schema:
 *              properties:
 *                  content:
 *                    type: string
 */
router.post('/', passport.authenticate('bearer', { session: false }), function(req, res, next) {
    Post.create({
        userid:   req.user.dataValues.id,
        content:  req.body.content,
        created:  Date.now(),
        updated:  Date.now()
    }).then(post =>
        res.json(post.dataValues)
    )
});

module.exports = router;