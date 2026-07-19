import pool from "../db/connection.js";

export async function getCatchList(user_id) {
    const result = await pool.query(
        "SELECT fish_num FROM fish_catch WHERE user_id = $1",
        [user_id]
    );
    return result.rows;
}

export async function getDonatedList(user_id) {
    const result = await pool.query(
        "SELECT fish_num FROM fish_donated WHERE user_id = $1",
        [user_id]
    );
    return result.rows;
}

export async function logCatch(user_id, fish_num) {
    const result = await pool.query(
        "INSERT INTO fish_catch (user_id, fish_num) VALUES ($1, $2) RETURNING *",
        [user_id, fish_num]
    );
    return result.rows[0];
}

export async function deleteCatch(user_id, fish_num) {
    await pool.query("DELETE FROM fish_catch WHERE user_id = $1 AND fish_num = $2", [user_id, fish_num]);
}

export async function logDonation(user_id, fish_num) {
    const result = await pool.query(
        "INSERT INTO fish_donated (user_id, fish_num) VALUES ($1, $2) RETURNING *",
        [user_id, fish_num]
    );
    return result.rows[0];
}

export async function deleteDonation(user_id, fish_num) {
    await pool.query("DELETE FROM fish_donated WHERE user_id = $1 AND fish_num = $2", [user_id, fish_num]);
}