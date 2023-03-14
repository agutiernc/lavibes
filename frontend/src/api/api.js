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
    const res = await this.request(`users/${username}/events/${id}`, data, 'post');
    console.log(res)
    return res;
  }


  /** allow user to delete a saved event */

  static async deleteSavedEvent (username, id) {
    const res = await this.request(`users/${username}/events/${id}`, 'delete');
    console.log(res)
    return res;
  }
}

// remove this later
// ConcertsApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default ConcertsApi;


// const BASE_URL = "http://localhost:3001";

// export const getEvents = async () => {
//   const res = await axios.get(`${BASE_URL}/events/data`)

//   console.log(res)

//   return res.data.events
// }