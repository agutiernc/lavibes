import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// API Class
class ConcertsApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
  
    const url = `${BASE_URL}/${endpoint}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const params = method === "get" ? data : {};
  
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
  
      let message = err.response.data.error.message;
  
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** sign up */

  static async signup(data) {
    const res = await this.request('auth/register', data, 'post');

    return res.token;
  }

  
  /** login */

  static async login(data) {
    const res = await this.request("auth/token", data, "post");

    return res.token;
  }


  /** Get current user */

  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);

    return res.user;
  }


  /** save user profile */

  static async saveProfile(username, data) {
    const res = await this.request(`users/${username}`, data, 'patch');

    return res.user;
  }


  /** Get all events - not related to saved user events
   * 
   *  Optional filter: Gets an event by id
   */

  static async getAllEvents(id) {
    let res;
    
    if (id) {
      res = await this.request(`events/data/${id}`);

      return res.event;
    } else {
      res = await this.request('events/data');

      return res.events;
    }
  }


  /** allow user to save an event */

  static async saveEvent (username, id, data) {
    await this.request(`users/${username}/events/${id}`, data, 'post');
  }


  /** allow user to delete a saved event */

  static async deleteSavedEvent (username, id) {
    await this.request(`users/${username}/events/${id}`, {}, 'delete');
  }
}

export default ConcertsApi;