import { Router } from "express";

import { getAll, getOne, insert, update, remove} from "../controllers/shipmentController.js";

const shipmentRouter = Router();

shipmentRouter.get("/", getAll);
shipmentRouter.get("/:id", getOne);
shipmentRouter.post("/", insert);
shipmentRouter.put("/:id", update);
shipmentRouter.delete("/:id", remove);



export default shipmentRouter;