import { Router } from "express";

import { getAll, getOne, insert, update, remove} from "../controllers/driverController.js";

const driverRouter = Router();

driverRouter.get("/", getAll);
driverRouter.get("/:id", getOne);
driverRouter.post("/", insert);
driverRouter.put("/:id", update);
driverRouter.delete("/:id", remove);



export default driverRouter;