DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

GRANT ALL ON SCHEMA public to groupouser;

SET search_path TO public;

CREATE
    OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$
    LANGUAGE plpgsql;


CREATE TABLE "user"
(
    user_id       SERIAL             NOT NULL PRIMARY KEY,
    username      VARCHAR(15) UNIQUE NOT NULL,
    password_hash CHAR(60)           NOT NULL,
    created_at    TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ
);

CREATE TABLE "post"
(
    post_id    SERIAL                                            NOT NULL PRIMARY KEY,
    user_id    INT REFERENCES "user" (user_id) ON DELETE CASCADE NOT NULL,
    title      VARCHAR(100)                                      NOT NULL,
    content    TEXT,
    image_url  TEXT,
    created_at TIMESTAMPTZ                                       NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE "comment"
(
    comment_id SERIAL                                            NOT NULL PRIMARY KEY,
    post_id    INT REFERENCES "post" (post_id) ON DELETE CASCADE NOT NULL,
    user_id    INT REFERENCES "user" (user_id) ON DELETE CASCADE NOT NULL,
    text       TEXT,
    created_at TIMESTAMPTZ                                       NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE "read_post"
(
    user_id INTEGER REFERENCES "user" (user_id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES post (post_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, post_id)
);


DO
$$
    DECLARE
        t text;
    BEGIN
        FOR t IN
            SELECT table_name FROM information_schema.columns WHERE column_name = 'updated_at'
            LOOP
                EXECUTE format(
                        'CREATE TRIGGER set_timestamp BEFORE UPDATE ON %I FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();',
                        t, t);
            END LOOP;
    END;
$$ language 'plpgsql';
