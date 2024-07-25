import { Router } from 'express';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const routerWarehouses = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

const warehousesFilePath = path.join(_dirname, '../../data/warehouses.json');

const readWarehousesFs = async () => {
    try {
        const warehouses = await fs.readFile(warehousesFilePath)
        return JSON.parse(warehouses);
    } catch (err) {
        throw new Error(`Surgió un error en la promesa ${err}`)
    }
}

const writeWarehousesFs = async (warehouses) => {
    await fs.writeFile(warehousesFilePath, JSON.stringify(warehouses, null, 2));
};

const idGenerator = async () => {
    const warehouses = await readWarehousesFs()
    if (warehouses.length == 0) return 1
    return (warehouses[(warehouses.length - 1)].id + 1);
}



routerWarehouses.post("/postWarehouses", async (req, res) => {
    const warehouses = await readWarehousesFs();
    const newWarehouse = {
        id: await idGenerator(),
        name: req.body.name,
        location: req.body.location,
    };

    warehouses.push(newWarehouse);
    const response = {
        message: "Warehouse created successfully",
        warehouse: newWarehouse
      };
    await writeWarehousesFs(warehouses);
    res.status(201).send(response);
});


routerWarehouses.get("/", async (req, res) => {
    const warehouses = await readWarehousesFs();
    const response = {
        "warehouses": warehouses
      }
    res.status(200).json(response);
});


routerWarehouses.get("/:warehouseId", async (req, res) => {
    const warehouses = await readWarehousesFs();
    const animeToFind = warehouses.find(warehouse => warehouse.id === parseInt(req.params.warehouseId));
    if(!animeToFind) return res.status(404).send("Warehouse not found");
    const response = {
        "warehouse": animeToFind
      }
    res.status(200).json(response)
});


routerWarehouses.put("/:id", async (req, res) => {
    const warehouses = await readWarehousesFs();
    const indexWarehouse = warehouses.findIndex(warehouse => warehouse.id === parseInt(req.params.id));
    if (indexWarehouse === -1) return res.status(404).send('Warehouse not found');
    const updateWarehouse = {
        ...warehouses[indexWarehouse],
        name: req.body.name,
        location: req.body.location,
    }

    warehouses[indexWarehouse] = updateWarehouse;
    await writeWarehousesFs(warehouses);
    res.send(`Warehouse was updated successfully ${JSON.stringify(updateWarehouse)}`)
});


routerWarehouses.delete("/delete/:id", async (req, res) => {
    let warehouses = await readWarehousesFs();
    const warehouseToDelete = warehouses.find(warehouse => warehouse.id === parseInt(req.params.id));
    if (!warehouseToDelete) return res.status(404).send('Warehouse not found');
    warehouses = warehouses.filter(warehouse => warehouse.id !== warehouseToDelete.id);

    await writeWarehousesFs(warehouses);
    res.status(200).send("Warehouse deleted successfully")
})


export  default routerWarehouses;
export {Router, fs, fileURLToPath, path};