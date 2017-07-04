const express  = require('express'),
      router   = express.Router(),
      Score    = require("../models/score"),
      Post     = require("../models/post"),
      Follower = require("../models/followwr"),
      passport = require("passport");

const PAGE_SIZE_MAX     = 100;
const PAGE_SIZE_DEFAULT = 10;

/**
 * @swagger
 * /post:
 *  get:
 *      tags:
 *       - Posts
 *      summary: Get a sorted Posts view
 *      produces:
 *       - application/json
 *      responses:
 *        200:
 *          description: The posts
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: limit
 *          required: false
 *          in: query
 *          type: integer
 *        - name: offset
 *          required: false
 *          in: query
 *          type: integer
 */
router.get('/', function(req, res, next) {
    const limit  = Math.min(PAGE_SIZE_MAX, req.query.limit || PAGE_SIZE_DEFAULT);
    const offset = req.query.offset || 0;

    Score.findAll({
        offset,
        limit,
        order: [
            ['adjusted', 'DESC'],
        ]
    }).then(posts =>
        res.json(posts.map(post => post.dataValues))
    )
});


/**
 * @swagger
 * /follow/{id}:
 *  post:
 *      tags:
 *       - Posts
 *      summary: Follow a post
 *      produces:
 *       - application/json
 *      responses:
 *        200:
 *          description: The created follow object
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: access_token
 *          required: true
 *          in: query
 *          type: string
 *        - name: id
 *          description: The Post ID to follow
 *          in: query
 *          required: true
 */
router.post('/follow/:post_id', passport.authenticate('bearer', { session: false }), function(req, res, next) {
    Follower.create({
        userid:   req.user.dataValues.id,
        postid:  req.params.post_id,
        created:  Date.now(),
        updated:  Date.now()
    }).then(follower =>
        res.json(follower.dataValues)
    )
});


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