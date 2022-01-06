let express = require("express");
const multer = require("multer");
const path = require("path")
const { carrito } = require("../controllers/productsController");
let router = express.Router();

// CONTROLADORES
let productsController = require("../controllers/productsController")

// MULTER
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
       cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const newFileName = 'product_' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({storage: storage});

// Middlewares
const productCreateValidations = require('../Middlewares/productCreateMiddleware')
const productEditValidations = require('../Middlewares/productEditMiddleware') 
const guestMiddleware = require('../Middlewares/guestMiddleware');
const authMiddleware = require('../Middlewares/authMiddleware');


// Listado
router.get("/", authMiddleware ,productsController.list)

// Detalle de producto
router.get("/detalle/:id", productsController.detalle)

// Carrito
router.get("/carrito", authMiddleware, productsController.carrito)

// Crear y almacenar
router.get("/crear",productsController.create)
router.post("/", upload.single("image"), productCreateValidations, productsController.store)

// Editar y almacenar
router.get("/editar/:id",productsController.edit)
router.put("/detalle/:id", upload.single("image"), productEditValidations, productsController.update)

// Borrar
router.delete("/detalle/:id",productsController.delete)

// Buscar
router.get("/buscar",productsController.search)
router.get("/resultados",productsController.results)

module.exports = router