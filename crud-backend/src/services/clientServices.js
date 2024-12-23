import { query } from "../db.js";

export const getClients = async() => {
    const {rows} = await query(`SELECT * FROM clients_tb`);
    return rows;
}

export const createClients = async(clientData) => {
    const {name, email, job, rate, isactive} = clientData;
    const {rows} = await query(
            `INSERT INTO clients_tb (name,email,job,rate, isactive)
             VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, email, job, rate, isactive])
    return rows[0];
}

export const updateClients = async(clientData, clientId) => {
    const {name, email, job, rate, isactive} = clientData;
    const {rows} = await query(
        `UPDATE clients_tb SET name = $1, email = $2, job = $3, rate = $4, isactive = $5
         WHERE id = $6 RETURNING *`,
         [name,email,job,rate,isactive, clientId]
    );
    return rows[0]
}

export const deleteClients = async (clientId) => {
    const res = await query(`DELETE FROM clients_tb WHERE id=$1`, [clientId]);
    return res.rowCount > 0;  // Sử dụng rowCount thay vì rowsCount
}

export const searchClients = async(searchTerm) => {
    const {rows} = await query(
        `SELECT * FROM clients_tb WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1`,
        [`%${searchTerm}`]
    );
    return rows;
}