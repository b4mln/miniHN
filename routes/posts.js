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

/**
 * @swagger
 * /post/{id}:
 *  post:
 *      tags:
 *       - Posts
 *      summary: Update an existing post
 *      produces:
 *       - application/json
 *      responses:
 *        200:
 *          description: The updated post
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: access_token
 *          required: true
 *          in: query
 *          type: string
 *        - name: body
 *          description: The Post text
 *          in: body
 *          required: true
 *          schema:
 *              properties:
 *                  content:
 *                    type: string
 *        - name: id
 *          description: The Identifier of the post to update
 *          in: path
 *          required: true
 *          type: integer
 */
router.post('/:post_id',  passport.authenticate('bearer', { session: false }), function(req, res, next) {
    Post.findById(req.params.post_id)
        .then(post => {
            if (post.dataValues.userid !== req.user.dataValues.userid) {
                throw new Error("Unautherized");
            }

            return post.update({
                content: req.body.content,
                updated: Date.now()
            });
        })
        .then(post =>
            res.json(post)
        )
        .catch(err => {
            res.status(400);
            res.json({ message: err.message });
        });
});

module.exports = router;