"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");
const express = require("express");

const {
  ensureLoggedIn,
  requireAdmin,
  ensureAdminOrCorrectUser
} = require("../middleware/auth");

const { BadRequestError } = require("../expressError");

const User = require('../models/user');
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json")
const userUpdateSchema = require("../schemas/userUpdate.json")

const router = express.Router()


/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: login and must be an Admin
 **/

router.post('/', requireAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);

    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);

      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);

    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});


/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: login (Admin only)
 **/

router.get('/', ensureLoggedIn, requireAdmin, async function (req, res, next) {
  try {
    const users = await User.getAll();

    return res.json({ users });
  } catch (err) {
    return next();
  }
});


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin }
 *
 * Authorization required: login (Must be admin or user's own)
 **/

router.get('/:username', ensureAdminOrCorrectUser, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);

    return res.json({ user });
  } catch (err) {
    return next();
  }
});


module.exports = router;