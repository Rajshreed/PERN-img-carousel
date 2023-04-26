CREATE TABLE animal_categories (
    id SERIAL PRIMARY KEY,
    category character varying(255)
);

CREATE TABLE animal_photos (
    id SERIAL PRIMARY KEY,
    category_id SERIAL REFERENCES animal_categories(id),
    photo_url text
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username character varying(255),
    user_password character varying(255),
    email character varying(255)
);