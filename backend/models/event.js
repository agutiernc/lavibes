"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for events. */

class Event {
  /** Create an event (from data), update db, return new event data.
   *
   * data should be:
   * { artist, organization, event_date, start_time, end_time, location,
   *   address, contact, contact_info, district, year
   * }
   *
   * Returns:
   * { id, artist, organization, event_date, start_time, end_time, location,
   *    adress, contact, contact_info, district, year
   * }
   * 
   * If event already saved, throw error.
   *
   * */

  static async create({
    id,
    artist,
    organization,
    event_date, 
    start_time, 
    end_time, 
    location,
    address,
    contact, 
    contact_info, 
    district,
    year
  }) {
    try {
      const result = await db.query(
        `INSERT INTO events (
          artist, organization, event_date, start_time, end_time,
          location, address, contact, contact_info, district, year, id)
         VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING artist, organization, event_date, start_time, end_time,
          location, address, contact, contact_info, district, year`,
         [artist, organization, event_date, start_time, end_time, location,
          address, contact, contact_info, district, year, id]
      );
  
      const event = result.rows[0];
  
      return event;
    } catch (err) {
      if (err.code === "23505") {
        throw new BadRequestError(`Event with id ${id} already exists`);
      }

      throw err;
    }
  }


  /** Get all events
   * 
   * Returns [{ id, artist, organization, event_date, start_time, end_time,
   *     address, location, contact, contact_info, district, year }, ...]
   */

  static async getAll() {
    let query = `SELECT *
                 FROM events
                 ORDER BY event_date`;
    
    const eventsRes = await db.query(query);

    return eventsRes.rows;
  }

  
  /** Given a event id, return data about that event.
   * 
   * Returns { id, artist, organization, event_date, start_time, end_time,
   *   location, address, contact, contact_info, district, year }
   * 
   * Throws NotFoundError if not found
   */

  static async get(id) {
    const eventResult = await db.query(`
        SELECT *
        FROM events
        WHERE id = $1
      `, [id]);

    const event = eventResult.rows[0];

    if (!event) {
      throw new NotFoundError(`Event id (${id}) not found`);
    }

    return event;
  }


  /** Update event data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: { id, artist, organization, event_date, start_time,
   *     end_time, location, address, contact, contact_info, district, year }
   *
   * Returns { id, artist, organization, event_date, start_time, end_time,
        location, address, contact, contact_info, district, year }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVaridx = '$' + (values.length + 1);

    const querySql = `UPDATE events
                      SET ${setCols}
                      WHERE id = ${idVaridx}
                      RETURNING
                        id, artist, organization, event_date, start_time,
                        end_time, location, address, contact, contact_info,
                        district, year`;
    
    const result = await db.query(querySql, [...values, id]);
    const event = result.rows[0];

    if (!event) {
      throw new NotFoundError(`No event of id (${id}) found`);
    }

    return event;
  }


  /** Delete given event from database; returns undefined.
   *
   * Throws NotFoundError if event not found.
   **/

  static async delete(id) {
    const result = await db.query(`
      DELETE
      FROM events
      WHERE id = $1
      RETURNING id
    `, [id]);

    const event = result.rows[0];

    if (!event) {
      throw new NotFoundError(`No event of id (${id}) found`);
    }
  }
}


module.exports = Event;