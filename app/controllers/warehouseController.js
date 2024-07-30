import { findAll, save, updateWarehouse, findById, deleteWarehouse} from "../models/warehouseModel.js"


export const getAll = async (_,res) => {
    try {
        const warehouses = await findAll();
        if (warehouses) {
            res.status(200).json({
                message: "Warehouses sucessfully fetched",
                data: warehouses
            })
        } else {
            res.status(404).json({
                message: "Warehouses not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error processing the request",
            error: error.message
        });
    }
}


export const getOne = async (req, res) => {
    try {
        const warehouseId = req.params.id;
        const warehouse = await findById(warehouseId);
        if (warehouse.length > 0) {
            res.status(201).send({
                message: "Warehouse sucessfully fetched",
                data: warehouse
            });
        } else {
            res.status(404).json({
                message: "Resource not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error processing the request",
            error: error.message
        });
    }
}


export const insert = async (req, res) => {
    try {
        const { name , location } = req.body;
        const warehouseCreated = await save({name, location});
        if (warehouseCreated) {
            res.status(201).send({
                message: "Successfully created",
                data: warehouseCreated
            });
        } else {
            res.status(501).json({
                message: "Not Implemented"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error processing the request",
            error: error.message
        });
    }
};


export const update = async (req, res) => {
    try {
        const warehouseId = req.params.id;
        const { name, location } = req.body;
        const updatedWarehouse = await updateWarehouse(warehouseId, {name, location});
        if (updatedWarehouse[0].affectedRows > 0) {
            res.status(202).send({
                message: 'Warehouse updated successfully',
                data: updatedWarehouse[1]
            })
        } else {
            res.status(501).json({
                message: "Not Implemented"
            });
        }
         
    } catch (error) {
        res.status(500).json({
            message: "There was an error processing the request",
            error: error.message
        });
    }
};


export const remove = async (req, res) => {
    try {
        const warehouseId = req.params.id;
        const deletedWarehouse = await deleteWarehouse(warehouseId);
        if (deletedWarehouse.affectedRows > 0) {
            res.status(202).send({
                message: 'Warehouse deleted successfully'
            })
        } else {
            res.status(404).json({
                message: "Warehouse not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error processing the request",
            error: error.message
        });
    }
}

