"use strict";

/** Routes for jobs */
const { readFile } =  require('fs/promises');

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { requireAdmin } = require("../middleware/auth");

const Event = require('../models/event');

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
 *  Gets events saved by user:
 *  
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


/** GET / { event data } => { event data }
 *  
 * Gets existing events' data: Read Only
 * 
 *   { events: [ { artist, organization, event_date, start_time, end_time,
 *                location, address, contact, contact_info, district, year },
 *            ...] }
 *
 *  Can also get an event by its ObjectId
 * 
 * Authorization required: none
 */

router.get('/data/:id?', async function (req, res, next) {
  try {
    const events = JSON.parse(await readFile("./events_data.json", "utf8"));
    const eventId = req.params.id;

    // If there's no event ID, return all events
    if (!eventId) {
      return res.json({ events });
    }

    // If an event ID is provided
    const event = events.find(event => event["ObjectId"] === +eventId);

    // return error if event ID is not found
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.json({ event });
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


/** PATCH /[id] { fld1, fld2, ... } => { event }
 *
 * Patches event data.
 *
 * data can be: { artist, organization, event_date, start_time, end_time,
 *                 location, address, contact, contact_info, district, year }
 *
 * Returns { id, artist, organization, event_date, start_time, end_time,
 *            location, address, contact, contact_info, district, year }
 *
 * Authorization required: Admin only
 */

router.patch('/:id', requireAdmin, async function (req, res, next) {
  try {
    const event = await Event.update(req.params.id, req.body);

    return res.json({ event });
  } catch (err) {
    return next(err);
  }
});


/** Delete given event from database; returns undefined.
*
* Throws NotFoundError if company not found.
**/

router.delete('/:id', requireAdmin, async function (req, res, next) {
  try {
    await Event.delete(req.params.id);

    return res.json({ deleted: `Event id ${req.params.id}` })
  } catch (err) {
    return next(err);
  }
})

module.exports = router;