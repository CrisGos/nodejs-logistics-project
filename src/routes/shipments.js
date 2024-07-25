import {Router, fs, fileURLToPath, path} from './warehouses.js';

const routerShipments = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

const shipmentsFilePath = path.join(_dirname, '../../data/shipments.json');

const readShipmentsFs = async () => {
    try {
        const shipments = await fs.readFile(shipmentsFilePath)
        return JSON.parse(shipments);
    } catch (err) {
        throw new Error(`Surgió un error en la promesa ${err}`)
    }
}

const writeShipmentsFs = async (shipments) => {
    await fs.writeFile(shipmentsFilePath, JSON.stringify(shipments, null, 2));
};

const idGenerator = async () => {
    const shipments = await readShipmentsFs()
    if (shipments.length == 0) return 1
    return (shipments[(shipments.length - 1)].id + 1);
}



routerShipments.post("/postShipments", async (req, res) => {
    const shipments = await readShipmentsFs();
    const newShipment = {
        id: await idGenerator(),
        item: req.body.item,
        quantity: req.body.quantity,
        warehouseId: req.body.warehouseId,
    };

    shipments.push(newShipment);
    const response = {
        message: "Shipment created successfully",
        shipment: newShipment
      };
    await writeShipmentsFs(shipments);
    res.status(201).send(response);
});


routerShipments.get("/", async (req, res) => {
    const shipments = await readShipmentsFs();
    const response = {
        "shipments": shipments
      }
    res.status(200).json(response);
});


routerShipments.get("/:shipmentId", async (req, res) => {
    const shipments = await readShipmentsFs();
    const animeToFind = shipments.find(shipment => shipment.id === parseInt(req.params.shipmentId));
    if(!animeToFind) return res.status(404).send("Shipment not found");
    const response = {
        "shipment": animeToFind
      }
    res.status(200).json(response)
});


routerShipments.put("/:id", async (req, res) => {
    const shipments = await readShipmentsFs();
    const indexShipment = shipments.findIndex(shipment => shipment.id === parseInt(req.params.id));
    if (indexShipment === -1) return res.status(404).send('Shipment not found');
    const updateShipment = {
        ...shipments[indexShipment],
        item: req.body.item,
        quantity: req.body.quantity,
        warehouseId: req.body.warehouseId,
    }

    shipments[indexShipment] = updateShipment;
    await writeShipmentsFs(shipments);
    res.send(`Shipment was updated successfully ${JSON.stringify(updateShipment)}`)
});


routerShipments.delete("/delete/:id", async (req, res) => {
    let shipments = await readShipmentsFs();
    const shipmentToDelete = shipments.find(shipment => shipment.id === parseInt(req.params.id));
    if (!shipmentToDelete) return res.status(404).send('Shipment not found');
    shipments = shipments.filter(shipment => shipment.id !== shipmentToDelete.id);

    await writeShipmentsFs(shipments);
    res.status(200).send("Shipment deleted successfully")
})


export  default routerShipments;