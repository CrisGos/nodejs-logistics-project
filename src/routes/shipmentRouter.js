import { Router } from 'express';
import { pool } from '../../config/db.js';

export const warehouseRouter = Router();

warehouseRouter.get('/', async (req, res) => {
    try {
        const [shipments] = await pool.query('SELECT * FROM shipments');
        res.status(200).json({
            message: "Shipments sucessfully fetched",
            data: shipments
        })
    } catch (error) {
        res.status(500).json({
            error: error.sqlMessage,
            errno: error.errno
        });
    }
});


warehouseRouter.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const [warehouse] = await pool.query('SELECT * FROM shipments WHERE id = ?', [id]);
        res.status(200).json({
            message: "Warehouse sucessfully fetched",
            data: warehouse
        })
    } catch (error) {
        res.status(500).json({
            error: error.sqlMessage,
            errno: error.errno
        });
    }
});


const createRequestFunction = async (req, res) => {
    const {name, location} = req.body;
    console.log({ name, location });
    try {
        const warehouseCreated = await pool.query('INSERT INTO shipments (name, location) VALUES (?, ?)', [name, location]);
        console.log(warehouseCreated);
        res.status(201).json({
            meassage: 'Shipments created'
        })
    } catch (error) {
        res.status(500).json({
            error: error.sqlMessage,
            errno: error.errno
        })
    }
}

warehouseRouter.post('/',createRequestFunction)


warehouseRouter.put('/:id', async (req, res) => {
    // res.send(`This is teh ID that you are sendind: ${req.params.id} and the body is: ${req.body.name} and ${req.body.location}`)
    const {id} = req.params;
    const {name, location} = req.body;
    try {
        const warehouseUpdated = await pool.query('UPDATE shipments SET name = ?, location = ? WHERE id = ?', [name, location, id])
        console.log(warehouseUpdated);
        res.json({
            meassage: "Warehouse updated",
            
        })
    } catch (error) {
        res.status(500).json({
            error: error.sqlMessage,
            errno: error.errno
        })
    }
})


warehouseRouter.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const warehouseDeleted = await pool.query('DELETE FROM shipments WHERE id = ? LIMIT 1', [id])
        console.log(warehouseDeleted);
        res.json({
            message: "Warehouse deleted"
        })
    } catch (error) {
        res.status(500).json({
            error: error.sqlMessage,
            errno: error.errno
        })
    }
})