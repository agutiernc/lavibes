"user strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();

      res.locals.user = jwt.verify(token, SECRET_KEY);
    }

    return next();
  } catch (err) {
    return next(err);
  }
}


/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) {
      throw new UnauthorizedError();
    }

    return next();
  } catch (err) {
    return next(err);
  }
}

// add requireAdmin and ensureAdminOrCorrectUser

/** Middleware for admin only actions
 * 
 * Admin can create, update, and delete
 */

function requireAdmin(req, res, next) {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }

    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware for admin or correct user only actions
 *  
 *  if not user, throw an unauthorized error
 */

function ensureAdminOrCorrectUser(req, res, next) {
  const user = res.locals.user;
  const validUsername = user.username === req.params.username;

  try {
    if (!(user && (user.isAdmin || validUsername))) {
      throw new UnauthorizedError;
    }

    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  requireAdmin,
  ensureAdminOrCorrectUser,
  authenticateJWT,
  ensureLoggedIn
};