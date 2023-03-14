CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  artist VARCHAR(30) NOT NULL,
  organization VARCHAR(80),
  event_date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  contact TEXT,
  contact_info TEXT,
  district TEXT,
  year INTEGER NOT NULL
);

CREATE TABLE user_events (
  username VARCHAR(25)
    REFERENCES users(username) ON DELETE CASCADE,
  event_id INTEGER
     REFERENCES events(id) ON DELETE CASCADE,
  PRIMARY KEY (username, event_id)
);
