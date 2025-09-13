import { Router } from "express";
import auth from "../middleware/auth";
import { shortenUrl, listUrls, deleteUrl } from "../controllers/urlController";

const router = Router();

router.use(auth); 
router.post("/shorten", shortenUrl);
router.get("/", listUrls);
router.delete("/:id", deleteUrl);

export default router;
