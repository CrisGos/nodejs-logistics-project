import { pool } from "../../config/db.js";

export const findAll = async () => {
    try {
        const [ shipments ] = await pool.query('SELECT * FROM shipments');
        return shipments;
    } catch (error) {
        throw new Error("An error occurred", error);
    }
}

export const findById = async (id) => {
    try {
        const [ shipment ] = await pool.query('SELECT * FROM shipments WHERE id = ?', [id]);
        return shipment;
    } catch (error) {
        throw new Error("Shipment not found", error)
    }
}


export const save = async (shipment) => {
    try {
        const [ resolve ] = await pool.query('INSERT INTO shipments (item, quantity) VALUES (?, ?)', [shipment.item, shipment.quantity]);
        const shipmentCreated = await findById(resolve.insertId);
        return shipmentCreated;

    } catch (error) {
        throw new Error("An error occurred", error);
    }
}


export const updateShipment = async (id, shipment) => {
    try {
        const [ resolve ] = await pool.query('UPDATE shipments SET item = ?, quantity = ? WHERE id = ?', [shipment.item, shipment.quantity, id]);
        const shipmentUpdated = await findById(id);
        return [resolve, shipmentUpdated];
    } catch (error) {
        throw new Error("Shipment has not been updated", error )
    }
}


export const deleteShipment = async (id) => {
    try {
        const deleted = await pool.query('DELETE FROM shipments WHERE id = ?', [id]);
        return deleted[0];
    } catch (error) {
        throw new Error("Shipment has not been deleted", error)
    }
}