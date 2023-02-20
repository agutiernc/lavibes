import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// API Class
class ConcertsApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ConcertsApi.token}` };
    const params = (method === "get") ? data : {};

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
    const res = await this.request('auth/token', data, 'post');

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

  /** Get all events - not related to saved user events */

  static async getAllEvents() {
    const res = await this.request('events/data');

    return res.events;
  }

  /** Get all events saved by user */

  static async getUserEvents() {
    const res = await this.request('events');

    return res.events;
  }
}

// remove this later
ConcertsApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default ConcertsApi;


// const BASE_URL = "http://localhost:3001";

// export const getEvents = async () => {
//   const res = await axios.get(`${BASE_URL}/events/data`)

//   console.log(res)

//   return res.data.events
// }