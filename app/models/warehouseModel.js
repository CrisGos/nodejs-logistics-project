import { pool } from "../../config/db.js";


export async function findAll(){
    try{
        const [warehouses] = await pool.query("SELECT * FROM warehouses");
        return warehouses;
        
    }catch(error){
        console.log(error);
    }

}

export const findById = async (id) => {
    try {
        const [warehouseFound] = await pool.query("SELECT * FROM warehouses WHERE id = ?", [id]);
        return warehouseFound;
    }       
    catch (error) {
        throw new Error("Warehouse not found", error)
    }
}


export const save = async (warehouse) => {
    try {
        const [ resolve ] = await pool.query("INSERT INTO warehouses ( name, location ) VALUES ( ?, ? )", [ warehouse.name, warehouse.location ]);
        const warehouseCreated = findById(resolve.insertId);
        // const [[warehouseCreated]] = await pool.query("SELECT * FROM warehouses WHERE id = ?", [resolve.insertId])
        return warehouseCreated

    } catch (error) {
        throw new Error("An error occurred", error)
    }
}


export const updateWarehouse = async (id, newWarehouse) => {
    try{
        const [ resolve ] = await pool.query("UPDATE warehouses SET name = ?, location = ? WHERE id = ?", [newWarehouse.name, newWarehouse.location, id]);
        const warehouseUpdated = await findById(id);
        return [resolve, warehouseUpdated];

    }catch(err){
        throw new Error("Warehouse has not been updated", err )
    }
};


export const deleteWarehouse = async (id) => {
    try {
        const deleted = await pool.query("DELETE FROM warehouses WHERE id = ? LIMIT 1", [id])
        return deleted[0]
    } catch (error) {
        throw new Error("Warehouse has not been deleted", error)
    }
}


