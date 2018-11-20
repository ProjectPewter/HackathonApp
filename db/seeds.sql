USE users_db;

INSERT INTO ideas (name, details, tech, difficulty)
VALUES ("FriendFinder", "Helps you to find a friend using a multiple choice survey to find compatibility.", "HTML, CSS, JavaScript", 2);

INSERT INTO ideas (name, details, tech, difficulty)
VALUES ("Find a Pet!", "Look through pictures of different pets to find what kind of pet you want!", "HTML, CSS, JavaScript", 1);

INSERT INTO ideas (name, details, tech, difficulty)
VALUES ("Dog Adoption Matcher", "Dating app between owner and potential dog. Pull dogs from local shelters and match to owners profile.", "API, SQL, Node.js, Express", 3);


INSERT INTO pinned (id, pin)
VALUES (42, 10);
INSERT INTO pinned (id, pin)
VALUES (42, 12);
INSERT INTO pinned (id, pin)
VALUES (42, 15);
INSERT INTO pinned (id, pin)
VALUES (42, 12);
INSERT INTO pinned (id, pin)
VALUES (42, 10);
