DROP DATABASE IF EXISTS instaBd;

CREATE DATABASE instaBd;

USE instaBd;
CREATE TABLE users (
    id  VARCHAR(255) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    profile_picture VARCHAR(255)
)Engine=InnoDB;

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)Engine=InnoDB;

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)Engine=InnoDB;

CREATE TABLE likes (
    post_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id,post_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ,
    FOREIGN KEY (user_id) REFERENCES users(id) ,
    UNIQUE (post_id, user_id)
)Engine=InnoDB;

CREATE TABLE followers (
    user_id VARCHAR(255) NOT NULL,
    follower_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id,follower_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ,
    FOREIGN KEY (follower_id) REFERENCES users(id) ,
    UNIQUE (user_id, follower_id)
)Engine=InnoDB;

DELIMITER $$

CREATE PROCEDURE CreateAccount (
    IN p_user_id VARCHAR(255),
    IN p_username VARCHAR(50),
    IN p_image_profile VARCHAR(255)
)
BEGIN
    DECLARE v_user_count INT;
    SELECT COUNT(*) INTO v_user_count FROM users WHERE username = p_username;
    IF v_user_count > 0 THEN
        SELECT true as error, "Username already exists" as message;
    ELSE
        INSERT INTO users (id, username, profile_picture)
        VALUES (p_user_id,p_username ,p_image_profile);
        SELECT id,username, profile_picture FROM users WHERE id = p_user_id;
    END IF;
END $$

CREATE PROCEDURE AddPost (
    IN p_user_id VARCHAR(255),
    IN p_image_url VARCHAR(255)
)
BEGIN
    INSERT INTO posts (user_id, image_url)
    VALUES (p_user_id, p_image_url);
END $$

CREATE PROCEDURE AddComment (
    IN p_post_id INT,
    IN p_user_id VARCHAR(255),
    IN p_message TEXT
)
BEGIN
    INSERT INTO comments (post_id, user_id, message)
    VALUES (p_post_id, p_user_id, p_message);
END $$

CREATE PROCEDURE AddOrRemoveLike (
    IN p_post_id INT,
    IN p_user_id VARCHAR(255)
)
BEGIN
    DECLARE v_like_count INT;
    DECLARE v_liked BOOLEAN DEFAULT FALSE;
    SELECT COUNT(*) INTO v_like_count FROM likes WHERE post_id = p_post_id AND user_id = p_user_id;
    IF v_like_count > 0 THEN
        DELETE FROM likes WHERE post_id = p_post_id AND user_id = p_user_id;
        SET v_liked = FALSE;
    ELSE
        INSERT INTO likes (post_id, user_id)
        VALUES (p_post_id, p_user_id);
        SET v_liked = TRUE;
    END IF;
    SELECT v_liked AS is_liked;
END $$

CREATE PROCEDURE FollowOrUnfollowUser (
    IN p_user_id VARCHAR(255),
    IN p_follower_id VARCHAR(255)
)
BEGIN
    DECLARE v_follow_count INT;
    DECLARE v_follow BOOL;
    SELECT COUNT(*) INTO v_follow_count FROM followers WHERE user_id = p_user_id AND follower_id = p_follower_id;
    IF v_follow_count > 0 THEN
        DELETE FROM followers WHERE user_id = p_user_id AND follower_id = p_follower_id;
        SET v_follow = FALSE;
    ELSE
        INSERT INTO followers (user_id, follower_id)
        VALUES (p_user_id, p_follower_id);
        SET v_follow = TRUE;
    END IF;
    SELECT v_follow as is_following;
END $$

CREATE PROCEDURE GetFollowers (
    IN p_userId VARCHAR(255),
    IN p_username varchar(50)
)
BEGIN
    DECLARE v_userID VARCHAR(255);
    DECLARE userFind INT;

    SELECT count(*) into userFind FROM users where username = p_username;
    IF userFind > 0 THEN
        SELECT id into v_userId FROM users where username = p_username;
        SELECT u.id, u.username, u.profile_picture,IFNULL(fol.nbFollower, 0) AS nbFollower,
        CASE
            WHEN f2.user_id IS NOT NULL THEN 1
            ELSE 0
        END AS follow
        FROM users u
        JOIN followers f ON u.id = f.user_id
        LEFT JOIN followers f2 ON p_userId = f2.user_id AND u.id = f2.follower_id
        LEFT JOIN (
            SELECT follower_id, COUNT(*) AS nbFollower
            FROM followers
            GROUP BY follower_id
        ) fol ON u.id = fol.follower_id
        WHERE f.follower_id = v_userID;
    ELSE
        SELECT TRUE as error, "user does not exist" as message;
    END IF;
END $$

CREATE PROCEDURE GetFollowed (
    IN p_userId VARCHAR(255),
    IN p_username varchar(50)
)
BEGIN
    DECLARE v_userID VARCHAR(255);
    DECLARE userFind INT;
    SELECT count(*) into userFind FROM users where username = p_username;

    IF userFind > 0 THEN
        SELECT id into v_userId FROM users where username = p_username;
        SELECT u.id, u.username, u.profile_picture,IFNULL(fol.nbFollower, 0) AS nbFollower,
        CASE
            WHEN f2.user_id IS NOT NULL THEN 1
            ELSE 0
        END AS follow
        FROM users u
        JOIN followers f ON u.id = f.follower_id
        LEFT JOIN followers f2 ON p_userId = f2.user_id AND u.id = f2.follower_id
        LEFT JOIN (
            SELECT follower_id, COUNT(*) AS nbFollower
            FROM followers
            GROUP BY follower_id
        ) fol ON u.id = fol.follower_id
        where f.user_id = v_userID;
    ELSE
        SELECT TRUE as error, "user does not exist" as message;
    END IF;
END $$


CREATE PROCEDURE Login(
    IN p_userId VARCHAR(255)
)
BEGIN
    DECLARE v_nbUser INT;
    SELECT count(*) INTO  v_nbUser from users where id = p_userId;
    IF v_nbUser = 1 THEN
         SELECT id, username, profile_picture FROM users WHERE id = p_userId;
    ELSE
        SELECT true as notExist;
    END IF;
END $$

-- DROP PROCEDURE GetUserInfo --
CREATE PROCEDURE GetUserInfo(
    IN p_userId VARCHAR(255),
    IN p_username varchar(50)
)
BEGIN
    DECLARE nbFollower INT;
    DECLARE nbFollow INT;
    DECLARE nbPost INT;
    DECLARE v_userId VARCHAR(255);
    DECLARE userFind INT;

    SELECT count(*) into userFind FROM users where username = p_username;
    IF userFind > 0 THEN
        SELECT id into v_userId FROM users where username = p_username;
        SELECT count(*) into nbFollower FROM followers WHERE follower_id = v_userId;
        SELECT count(*) into nbFollow FROM followers WHERE user_id = v_userId;
        SELECT count(*) into nbPost FROM posts where user_id = v_userId;
        SELECT nbFollower, nbFollow, nbPost, users.username as username, users.profile_picture as profile_picture, users.id as id,CASE WHEN followers.user_id IS NOT NULL THEN 1 ELSE 0 END AS follow FROM users LEFT JOIN followers ON users.id = followers.follower_id AND p_userId = followers.user_id where id = v_userId;
    ELSE
        SELECT TRUE as error, "user does not exist" as message;
    END IF;
END $$

CREATE PROCEDURE GetUserPost(
    IN p_username varchar(50)
)
BEGIN
    SELECT posts.id, posts.image_url FROM users JOIN posts ON users.id = posts.user_id WHERE users.username = p_username ORDER BY posts.created_at desc ;
END $$

CREATE PROCEDURE GetFeed(
    IN p_dejaVuIds TEXT,
    IN p_lastIndex INT,
    IN p_userId VARCHAR(255)
)
BEGIN
        IF p_lastIndex = 0 THEN
        SELECT
            p.id,
            p.image_url,
            u.username,
            u.profile_picture,
            IFNULL(l.nbLike, 0) AS nbLike,
            IFNULL(c.nbComment, 0) AS nbComment,
            CASE
                WHEN ul.user_id IS NOT NULL THEN 1
                ELSE 0
            END AS hasLiked
        FROM posts p
        JOIN users u ON p.user_id = u.id
        LEFT JOIN (
            SELECT post_id, COUNT(*) AS nbLike
            FROM likes
            GROUP BY post_id
        ) l ON p.id = l.post_id
        LEFT JOIN (
            SELECT post_id, COUNT(*) AS nbComment
            FROM comments
            GROUP BY post_id
        ) c ON p.id = c.post_id
        LEFT JOIN likes ul
            ON ul.post_id = p.id
            AND ul.user_id = p_userId
        ORDER BY p.created_at desc
        LIMIT 5;
    ELSE
        SELECT
        p.id,
        p.image_url,
        u.username,
        u.profile_picture,
        IFNULL(l.nbLike, 0) AS nbLike,
        IFNULL(c.nbComment, 0) AS nbComment,
        CASE
            WHEN ul.user_id IS NOT NULL THEN 1
            ELSE 0
        END AS hasLiked
        FROM posts p
        JOIN users u ON p.user_id = u.id
        LEFT JOIN (
            SELECT post_id, COUNT(*) AS nbLike
            FROM likes
            GROUP BY post_id
        ) l ON p.id = l.post_id
        LEFT JOIN (
            SELECT post_id, COUNT(*) AS nbComment
            FROM comments
            GROUP BY post_id
        ) c ON p.id = c.post_id
         LEFT JOIN likes ul
            ON ul.post_id = p.id
            AND ul.user_id = p_userId
        WHERE FIND_IN_SET(p.id, p_dejaVuIds) = 0
        AND p.id < p_lastIndex
        ORDER BY p.created_at desc
        LIMIT 5;
    END IF;
end $$

CREATE PROCEDURE GetPost(
    IN p_postId INT,
    IN p_userId VARCHAR(255)
)
begin
    SELECT
            p.id,
            p.image_url,
            u.username,
            u.profile_picture,
            IFNULL(l.nbLike, 0) AS nbLike,
            IFNULL(c.nbComment, 0) AS nbComment,
            CASE
                WHEN ul.user_id IS NOT NULL THEN 1
                ELSE 0
            END AS hasLiked
        FROM posts p
        JOIN users u ON p.user_id = u.id
        LEFT JOIN (
            SELECT post_id, COUNT(*) AS nbLike
            FROM likes
            GROUP BY post_id
        ) l ON p.id = l.post_id
        LEFT JOIN (
            SELECT post_id, COUNT(*) AS nbComment
            FROM comments
            GROUP BY post_id
        ) c ON p.id = c.post_id
        LEFT JOIN likes ul
            ON ul.post_id = p.id
            AND ul.user_id = p_userId
    WHERE p.id = p_postId;
end $$


Create PROCEDURE  GetComment(
    IN p_postId INT
)
begin
    Select comments.message, users.username, users.profile_picture from comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = p_postId ORDER BY comments.created_at;
end $$

CREATE PROCEDURE ExploreUser(
    IN p_userId VARCHAR(255)
)
BEGIN
    SELECT users.id as id, users.username as username, users.profile_picture as profile_picture, IFNULL(f.nbFollower, 0) AS nbFollower,
        CASE
            WHEN followers.user_id IS NOT NULL THEN 1
            ELSE 0
        END AS follow
    FROM users
        LEFT JOIN (
            SELECT follower_id, COUNT(*) AS nbFollower
            FROM followers
            GROUP BY follower_id
        ) f ON users.id = f.follower_id
        LEFT JOIN followers ON users.id = followers.follower_id AND p_userId = followers.user_id ORDER BY nbFollower desc
        LIMIT 10;
end $$

CREATE PROCEDURE SearchUser(
    IN p_userId VARCHAR(255),
    IN p_username varchar(50)
)
BEGIN
    SELECT users.id as id, users.username as username, users.profile_picture as profile_picture, IFNULL(f.nbFollower, 0) AS nbFollower,
        CASE
            WHEN followers.user_id IS NOT NULL THEN 1
            ELSE 0
        END AS follow
    FROM users
        LEFT JOIN (
            SELECT follower_id, COUNT(*) AS nbFollower
            FROM followers
            GROUP BY follower_id
        ) f ON users.id = f.follower_id
        LEFT JOIN followers ON users.id = followers.follower_id AND p_userId = followers.user_id WHERE users.username like CONCAT('%',p_username,'%') ORDER BY nbFollower desc
        LIMIT 10;
end $$

DELIMITER ;