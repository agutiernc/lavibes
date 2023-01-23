"use strict";

/** Routes for jobs */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { requireAdmin } = require("../middleware/auth");

const Event = require('../models/event')

const router = new express.Router();


/** POST / { event } =>  { event }
 *
 * event should be:
 *    { artist, organization, event_date, start_time, end_time, location,
 *       address, contact, contact_info, district, year }
 *
 * Returns:
 * { id, artist, organization, event_date, start_time, end_time, location,
 *    address, contact, contact_info, district, year }
 *
 * Authorization required: Admin only
 */

router.post('/', requireAdmin, async function (req, res, next) {
  try {
    const event = await Event.create(req.body);

    return res.status(201).json({ event });
  } catch (err) {
    return next(err);
  }
});


/** GET /  =>
 *   { events: [ { artist, organization, event_date, start_time, end_time,
 *                location, address, contact, contact_info, district, year },
 *            ...] }
 *
 * Authorization required: none
 */

router.get('/', async function (req, res, next) {
  try {
    const events = await Event.getAll();

    return res.json({ events });
  } catch (err) {
    return next(err);
  }
});


/** GET /[id]  =>  { event }
 *
 *  Event is { id, artist, organization, event_date, start_time, end_time,
 *              location, address, contact, contact_info, district, year }
 *
 * Authorization required: none
 */

router.get('/:id', async function (req, res, next) {
  try {
    const event = await Event.get(req.params.id);

    return res.json({ event });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;