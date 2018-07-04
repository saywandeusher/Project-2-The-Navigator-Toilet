-- create Pokemon table in database
CREATE TABLE IF NOT EXISTS toilets (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  location varchar(255),
  time varchar(255),
  ratings varchar(255)
);

-- -- create User table in database
-- CREATE TABLE IF NOT EXISTS users (
--   id SERIAL PRIMARY KEY,
--   email varchar(255),
--   password varchar(255)
-- );