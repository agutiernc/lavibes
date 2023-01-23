INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES (
  'testadmin',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDI3OTU2OX0.qO4J20NZRj_qy6faBiH1fCjQIbC60sHOs7-ZWSgnWbQ',
  'Admin',
  'Tester',
  'admin@tests.com',
  TRUE
);

INSERT INTO events (artist, organization, event_date, start_time, end_time,
                    location, address, contact, contact_info, district, year)
VALUES (
  'Yari More Latin Band',
  'Norwalk Senior Center',
  2209010400000,
  -2209010400000,
  -2208999600000,
  'Norwalk Senior Center',
  '14040 San Antonio Dr\nNorwalk, CA 90650\n(33.903928, -118.080644)',
  'Daniel Abrego',
  null,
  4,
  2019
);

-- TO CONVERT SEE HERE:
-- https://stackoverflow.com/questions/5485502/how-to-format-bigint-field-into-a-date-in-postgresql