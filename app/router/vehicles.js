import { Router } from "express";

import { getAll, getOne, insert, update, remove} from "../controllers/vehicleController.js";

const vehicleRouter = Router();

vehicleRouter.get("/", getAll);
vehicleRouter.get("/:id", getOne);
vehicleRouter.post("/", insert);
vehicleRouter.put("/:id", update);
vehicleRouter.delete("/:id", remove);



export default vehicleRouter;