CREATE TABLE teams (
  id BIGSERIAL,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE championships (
  id BIGSERIAL,
  name VARCHAR(100) NOT NULL,
  season VARCHAR(9) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE matches (
  id BIGSERIAL,
  championship BIGINT NOT NULL,
  home BIGINT NOT NULL,
  away BIGINT NOT NULL,
  match_number_home INTEGER,
  match_number_away INTEGER,
  match_date VARCHAR(8) NOT NULL,
  win VARCHAR(1) NOT NULL,
  home_score INTEGER,
  away_score INTEGER,
  home_odd REAL NOT NULL,
  away_odd REAL NOT NULL,
  draw_odd REAL NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_championship
      FOREIGN KEY(championship) 
	  REFERENCES championships(id),
    CONSTRAINT fk_home
      FOREIGN KEY(home) 
	  REFERENCES teams(id),
    CONSTRAINT fk_away
      FOREIGN KEY(away) 
	  REFERENCES teams(id)
);
