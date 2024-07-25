import {Router, fs, fileURLToPath, path} from './warehouses.js';

const routerDrivers = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

const driversFilePath = path.join(_dirname, '../../data/drivers.json');

const readDriversFs = async () => {
    try {
        const drivers = await fs.readFile(driversFilePath)
        return JSON.parse(drivers);
    } catch (err) {
        throw new Error(`Something went wrong in the promise ${err}`)
    }
}

const writeDriversFs = async (drivers) => {
    await fs.writeFile(driversFilePath, JSON.stringify(drivers, null, 2));
};

const idGenerator = async () => {
    const drivers = await readDriversFs()
    if (drivers.length == 0) return 1
    return (drivers[(drivers.length - 1)].id + 1);
}



routerDrivers.post("/postDrivers", async (req, res) => {
    const drivers = await readDriversFs();
    const newDriver = {
        id: await idGenerator(),
        name: req.body.name,
    };

    if (!req.body.name) return res.status(400).json({error: "Bad request: 'name' is required"});

    drivers.push(newDriver);
    const response = {
        message: "Driver created successfully",
        driver: newDriver
      };
    await writeDriversFs(drivers);
    res.status(201).send(response);
});


routerDrivers.get("/", async (req, res) => {
    const drivers = await readDriversFs();
    const response = {
        "drivers": drivers
      }
    res.status(200).json(response);
});


routerDrivers.get("/:driverId", async (req, res) => {
    const drivers = await readDriversFs();
    const animeToFind = drivers.find(driver => driver.id === parseInt(req.params.driverId));
    if(!animeToFind) return res.status(404).send("Driver not found");
    const response = {
        "driver": animeToFind
      }
    res.status(200).json(response)
});


routerDrivers.put("/:id", async (req, res) => {
    const drivers = await readDriversFs();
    const indexDriver = drivers.findIndex(driver => driver.id === parseInt(req.params.id));
    if (indexDriver === -1) return res.status(404).send('Driver not found');
    const updateDriver = {
        ...drivers[indexDriver],
        name: req.body.name,
    }

    if (!req.body.name) return res.status(400).json({error: "Bad request: 'name' is required"});

    drivers[indexDriver] = updateDriver;
    await writeDriversFs(drivers);
    res.send(`Driver was updated successfully ${JSON.stringify(updateDriver)}`)
});


routerDrivers.delete("/delete/:id", async (req, res) => {
    let drivers = await readDriversFs();
    const driverToDelete = drivers.find(driver => driver.id === parseInt(req.params.id));
    if (!driverToDelete) return res.status(404).send('Driver not found');
    drivers = drivers.filter(driver => driver.id !== driverToDelete.id);

    await writeDriversFs(drivers);
    res.status(200).send("Driver deleted successfully")
})


export  default routerDrivers;