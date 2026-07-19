CREATE TABLE IF NOT EXISTS bug_catch (
    user_id INT,
    bug_num INT,
    PRIMARY KEY (user_id, bug_num),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);