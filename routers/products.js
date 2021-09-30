let express = require("express");
const { carrito } = require("../controllers/productsController");
let router = express.Router();

// CONTROLADORES
let productsController = require("../controllers/productsController")

// Listado
router.get("/",productsController.list)

// Detalle de producto
router.get("/detalle/:id", productsController.detalle)

// Carrito
router.get("/carrito", productsController.carrito)

// Crear y almacenar
router.get("/crear",productsController.create)
router.post("/", productsController.store)

// Editar y almacenar
router.get("/editar/:id",productsController.edit)
router.put("/", productsController.update)

module.exports = router