import { findAll, findById, save, updateDriver, deleteDriver} from "../models/driverModel.js"

export const getAll = async (_, res) => {
    try {
        const drivers = await findAll(); 
        if (drivers) {
            res.status(200).send({
                message: "Drivers successfully fetched",
                data: drivers
            })
        } else {
            res.status(404).send({
                message: "Drivers not found"
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
        const driverId = req.params.id;
        const driver = await findById(driverId);
        if (driver.length > 0) {
            res.status(200).send({
                message: "Driver successfully found",
                data: driver
            })
        } else {
            res.status(404).send({
                message: "Driver not found"
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
        const name = req.body;
        const driverCreated = await save(name);
        if (driverCreated) {
            res.status(201).send({
                message: 'Driver created successfully',
                data: driverCreated
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
        const driverId = await req.params.id;
        const newDriver = await req.body.name;
        const updatedDriver = await updateDriver(driverId, newDriver);
        if (updatedDriver[0].affectedRows > 0) {
            res.status(200).send({
                message: 'Driver updated successfully',
                data: updatedDriver[1]
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
        const driverId = req.params.id;
        const deletedDriver = await deleteDriver(driverId);
        if (deletedDriver.affectedRows > 0) {
            res.status(202).send({
                message: 'Warehouse deleted successfully'
            })
        } else {
            res.status(404).json({
                message: "Driver not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error processing the request",
            error: error.message
        });
    }
}