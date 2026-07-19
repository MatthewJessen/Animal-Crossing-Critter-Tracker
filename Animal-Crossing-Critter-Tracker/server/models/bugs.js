import pool from "../db/connection.js";

export async function getCatchList(user_id) {
    const result = await pool.query(
        "SELECT bug_num FROM bug_catch WHERE user_id = $1",
        [user_id]
    );
    return result.rows;
}

export async function getDonatedList(user_id) {
    const result = await pool.query(
        "SELECT bug_num FROM bug_donated WHERE user_id = $1",
        [user_id]
    );
    return result.rows;
}

export async function logCatch(user_id, bug_num) {
    const result = await pool.query(
        "INSERT INTO bug_catch (user_id, bug_num) VALUES ($1, $2) RETURNING *",
        [user_id, bug_num]
    );
    return result.rows[0];
}

export async function deleteCatch(user_id, bug_num) {
    await pool.query("DELETE FROM bug_catch WHERE user_id = $1 AND bug_num = $2", [user_id, bug_num]);
}

export async function logDonation(user_id, bug_num) {
    const result = await pool.query(
        "INSERT INTO bug_donated (user_id, bug_num) VALUES ($1, $2) RETURNING *",
        [user_id, bug_num]
    );
    return result.rows[0];
}

export async function deleteDonation(user_id, bug_num) {
    await pool.query("DELETE FROM bug_donated WHERE user_id = $1 AND bug_num = $2", [user_id, bug_num]);
}