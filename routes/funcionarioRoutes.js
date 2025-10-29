import express from "express";
import {
  listarFuncionarios,
  inserirFuncionario,
  atualizarFuncionario,
  excluiFuncionario,
} from "../controllers/funcionarioController.js";

const router = express.Router();

router.get("/", listarFuncionarios);
router.post("/", inserirFuncionario);
router.put("/:id", atualizarFuncionario);
router.delete("/:id", excluiFuncionario);

export default router;
