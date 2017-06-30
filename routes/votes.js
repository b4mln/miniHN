const express    = require('express'),
      router     = express.Router(),
      sequelize  = require("sequelize"),
      Vote       = require("../models/vote"),
      passport   = require("passport");

/**
 * @swagger
 * /vote/{id}:
 *  put:
 *   tags:
 *    - Vote
 *   summary: Up-Vote a post
 *   produces:
 *    - application/json
 *   responses:
 *      200:
 *        description: The created vote
 *   consumes:
 *     - application/json
 *   parameters:
 *        - name: access_token
 *          required: true
 *          in: query
 *          type: string
 *        - name: id
 *          description: The Identifier of the post to upvote
 *          in: path
 *          required: true
 *          type: integer
 */
router.put('/:post_id', passport.authenticate('bearer', { session: false }), function(req, res, next) {
    _upsertVote(req.params.post_id, req.user.dataValues.id)
        .then(vote => vote.increment('value', {by: 1}))
        .then(vote => res.json(vote.dataValues))
        .catch(err => {
            res.status(500);
            res.json({ message: "Could not complete operation" })
        })
});

/**
 * @swagger
 * /vote/{id}:
 *  delete:
 *   tags:
 *    - Vote
 *   summary: Down-Vote a post
 *   produces:
 *    - application/json
 *   responses:
 *      200:
 *        description: The created vote
 *   consumes:
 *     - application/json
 *   parameters:
 *        - name: access_token
 *          required: true
 *          in: query
 *          type: string
 *        - name: id
 *          description: The Identifier of the post to upvote
 *          in: path
 *          required: true
 *          type: integer
 */
router.delete('/:post_id', passport.authenticate('bearer', { session: false }), function(req, res, next) {
    _upsertVote(req.params.post_id, req.user.dataValues.id)
        .then(vote => vote.decrement('value', {by: 1}))
        .then(vote => res.json(vote.dataValues))
        .catch(err => {
            res.status(500);
            res.json({ message: "Could not complete operation" })
        })
});

/**
 * Return a vote if exists, or create a new one.
 * @param postId
 * @param userId
 * @return {Promise.<TResult>|*}
 * @private
 */
function _upsertVote(postId, userId) {
    return Vote.find({where: { userid: userId, postid: postId }})
        .then(vote => vote
            ? vote
            : Vote.create({
                userid: postId,
                postid: userId,
                value: 0
            })
        )
}

module.exports = router;
