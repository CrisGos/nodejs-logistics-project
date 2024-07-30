import { pool } from "../../config/db.js";

export const findAll = async () => {
    try {
        const [ drivers ] = await pool.query('SELECT * FROM drivers');
        return drivers;
    } catch (error) {
        throw new Error("An error occurred", error);
    }
}

export const findById = async (id) => {
    try {
        const [ driver ] = await pool.query('SELECT * FROM drivers WHERE id = ?', [id]);
        return driver;
    } catch (error) {
        throw new Error("Driver not found", error)
    }
}


export const save = async (driver) => {
    try {
        const [ resolve ] = await pool.query('INSERT INTO drivers (name) VALUES (?)', [driver.name]);
        const driverCreated = await findById(resolve.insertId);
        return driverCreated;

    } catch (error) {
        throw new Error("An error occurred", error);
    }
}


export const updateDriver = async (id, name) => {
    try {
        const [ resolve ] = await pool.query('UPDATE drivers SET name = ? WHERE id = ?', [name, id]);
        const driverUpdated = await findById(id);
        return [resolve, driverUpdated];
    } catch (error) {
        throw new Error("Driver has not been updated", error )
    }
}


export const deleteDriver = async (id) => {
    try {
        const deleted = await pool.query('DELETE FROM drivers WHERE id = ?', [id]);
        return deleted[0];
    } catch (error) {
        throw new Error("Driver has not been deleted", error)
    }
}