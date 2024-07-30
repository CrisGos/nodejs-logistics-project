import { findAll, findById, save, updateVehicle, deleteVehicle} from "../models/vehicleModel.js"

export const getAll = async (_, res) => {
    try {
        const vehicles = await findAll(); 
        if (vehicles) {
            res.status(200).send({
                message: "Vehicles successfully fetched",
                data: vehicles
            })
        } else {
            res.status(404).send({
                message: "Vehicles not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "There was an error processing the request",
            error: error.message
        })
    }
}


export const getOne = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const vehicle = await findById(vehicleId);
        if (vehicle.length > 0) {
            res.status(200).send({
                message: "Vehicle successfully found",
                data: vehicle
            })
        } else {
            res.status(404).send({
                message: "Vehicle not found"
            })
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
        const {model, year} = req.body;
        const vehicleCreated = await save({model, year});
        if (vehicleCreated) {
            res.status(201).send({
                message: 'Vehicle created successfully',
                data: vehicleCreated
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
}


export const update = async (req, res) => {
    try {
        const {model, year} = req.body;
        const vehicleId = req.params.id;
        const updatedVehicle = await updateVehicle(vehicleId, {model, year});
        if (updatedVehicle[0].affectedRows > 0) {
            res.status(200).send({
                message: 'Vehicle updated successfully',
                data: updatedVehicle[1]
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
}


export const remove = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const deletedVehicle = await deleteVehicle(vehicleId);
        if (deletedVehicle.affectedRows > 0) {
            res.status(202).send({
                message: 'Warehouse deleted successfully'
            })
        } else {
            res.status(404).json({
                message: "Vehicle not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error processing the request",
            error: error.message
        });
    }
}