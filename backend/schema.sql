/*
  Schema
*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create table users (
  id serial NOT null primary key,
  username varchar(35) UNIQUE NOT NULL,
  email varchar(255) UNIQUE NOT null,
  password varchar(255) NOT null,
  active boolean NOT NULL default false,
  accept boolean default false,
  info_seen boolean default false,
  scope text default 'normal'
);

create table user_event_activity(
  user_id int REFERENCES users(id) ON DELETE CASCADE,
  event_id text NOT null,
  created timestamp with time zone not null default now(),
  primary key (user_id, event_id)
);

create table account_activation (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id int not null REFERENCES users(id) ON DELETE CASCADE,
  expire_date timestamp with time zone not null default now() + INTERVAL '1 day'
);