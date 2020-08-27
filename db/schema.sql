CREATE TABLE teams (
  id BIGSERIAL,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE championships (
  id BIGSERIAL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE seasons (
  id BIGSERIAL,
  championship BIGINT NOT NULL,
  period VARCHAR(9) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE season_teams (
  id BIGSERIAL,
  team BIGINT NOT NULL,
  season BIGINT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_team
      FOREIGN KEY(team) 
	  REFERENCES teams(id),
    CONSTRAINT fk_season
      FOREIGN KEY(season) 
	  REFERENCES seasons(id)
);

CREATE TABLE matches (
  id BIGSERIAL,
  season BIGINT NOT NULL,
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
  CONSTRAINT fk_season
      FOREIGN KEY(season) 
	  REFERENCES seasons(id),
    CONSTRAINT fk_home
      FOREIGN KEY(home) 
	  REFERENCES teams(id),
    CONSTRAINT fk_away
      FOREIGN KEY(away) 
	  REFERENCES teams(id)
);
