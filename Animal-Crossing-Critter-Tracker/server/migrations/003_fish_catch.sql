CREATE TABLE IF NOT EXISTS fish_catch (
    user_id INT,
    fish_num INT,
    PRIMARY KEY (user_id, fish_num),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);