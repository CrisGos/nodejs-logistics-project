import { findAll, findById, save, updateShipment, deleteShipment} from "../models/shipmentModel.js"

export const getAll = async (_, res) => {
    try {
        const shipments = await findAll(); 
        if (shipments) {
            res.status(200).send({
                message: "Shipments successfully fetched",
                data: shipments
            })
        } else {
            res.status(404).send({
                message: "Shipments not found"
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
        const shipmentId = req.params.id;
        const shipment = await findById(shipmentId);
        if (shipment.length > 0) {
            res.status(200).send({
                message: "Shipment successfully found",
                data: shipment
            })
        } else {
            res.status(404).send({
                message: "Shipment not found"
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
        const {item, quantity} = req.body;
        const shipmentCreated = await save({item, quantity});
        if (shipmentCreated) {
            res.status(201).send({
                message: 'Shipment created successfully',
                data: shipmentCreated
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
        const {item, quantity} = req.body;
        const shipmentId = req.params.id;
        const updatedShipment = await updateShipment(shipmentId, {item, quantity});
        if (updatedShipment[0].affectedRows > 0) {
            res.status(200).send({
                message: 'Shipment updated successfully',
                data: updatedShipment[1]
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
        const shipmentId = req.params.id;
        const deletedShipment = await deleteShipment(shipmentId);
        if (deletedShipment.affectedRows > 0) {
            res.status(202).send({
                message: 'Warehouse deleted successfully'
            })
        } else {
            res.status(404).json({
                message: "Shipment not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error processing the request",
            error: error.message
        });
    }
}