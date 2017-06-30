CREATE TABLE "Users" (
     id         SERIAL PRIMARY KEY,
     username   varchar(32) NOT NULL UNIQUE,
     name       varchar(64),
     email      varchar(64),
     password   varchar(64) NOT NULL,
     token      varchar(64),
     created    timestamp DEFAULT now()
);

CREATE INDEX User_credentials_idx ON "Users" (username, password);
CREATE INDEX User_token_idx ON "Users" (token);