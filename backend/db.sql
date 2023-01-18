\echo 'Delete and recreate concerts db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE concerts;
CREATE DATABASE concerts;
\connect concerts

\i schema.sql

DROP DATABASE concerts_test;
CREATE DATABASE concerts_test;
\connect concerts_test

\i schema.sql