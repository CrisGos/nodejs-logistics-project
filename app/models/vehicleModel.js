import { pool } from "../../config/db.js";

export const findAll = async () => {
    try {
        const [ vehicles ] = await pool.query('SELECT * FROM vehicles');
        return vehicles;
    } catch (error) {
        throw new Error("An error occurred", error);
    }
}

export const findById = async (id) => {
    try {
        const [ vehicle ] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
        return vehicle;
    } catch (error) {
        throw new Error("Vehicle not found", error)
    }
}


export const save = async (vehicle) => {
    try {
        const [ resolve ] = await pool.query('INSERT INTO vehicles (model, year) VALUES (?, ?)', [vehicle.model, vehicle.year]);
        const vehicleCreated = await findById(resolve.insertId);
        return vehicleCreated;

    } catch (error) {
        throw new Error("An error occurred", error);
    }
}


export const updateVehicle = async (id, vehicle) => {
    try {
        const [ resolve ] = await pool.query('UPDATE vehicles SET model = ?, year = ? WHERE id = ?', [vehicle.model, vehicle.year, id]);
        const vehicleUpdated = await findById(id);
        return [resolve, vehicleUpdated];
    } catch (error) {
        throw new Error("Vehicle has not been updated", error )
    }
}


export const deleteVehicle = async (id) => {
    try {
        const deleted = await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
        return deleted[0];
    } catch (error) {
        throw new Error("Vehicle has not been deleted", error)
    }
}