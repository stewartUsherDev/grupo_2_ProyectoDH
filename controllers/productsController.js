const fs = require("fs");
const path = require('path');

// const productsFilePath = path.join(__dirname, '../data/products.json');
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require("../database/models");

const productsController ={
    detalle: (req,res)=>{
        db.Product.findByPk(req.params.id,{include: ['colors','sizes','category','season']})
            .then(product => {
                res.render('products/productDetail',{product:product})
            });
        // productos.forEach(producto=>{
        //     if(req.params.id == producto.id){
        //         res.render('products/productDetail',{producto:producto})
        //     }
        // })  
    },
    carrito: (req,res)=>{
        res.render('products/productCart')
    },

    // Crear y almacenar
    create: (req,res) =>{
        let promColor = db.Color.findAll();
        let promSizes = db.Size.findAll();
        let promCategory = db.Category.findAll();
        let promSeason = db.Season.findAll();
        
        Promise
        .all([promColor, promSizes, promCategory, promSeason])
        .then(([allColors, allSizes, allCategories, allSeasons]) => {
            return res.render('products/create', {allColors, allSizes, allCategories, allSeasons})})
        .catch(error => res.send(error))
    },
    store: (req,res) =>{
        db.Product.create(
            {
                category_id: req.body.category,
                season_id: req.body.season,
                title: req.body.name,
                description: req.body.description,
                price: req.body.price,
                discount:req.body.discount,
                gender:req.body.gender,
                product_image: req.file.filename,
                deleted: 0
            }
        )
        .then(()=> {
            return res.redirect('/movies')})   
        .catch(error => res.send(error))
        // const newProduct = {
		// 	id: productos[productos.length - 1].id + 1,
		// 	name: req.body.name,
        //     description: req.body.description,
        //     category: req.body.category,
        //     color: req.body.color,
        //     size:req.body.size,
        //     image:req.file.filename,
		// 	price: req.body.price,
		// }
		// productos.push(newProduct);

		// fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, " "));
		// res.redirect("/productos");
    },
    // 

    // Editar y almacenar
    edit: (req,res) =>{
        let productId = req.params.id;
        let promProduct = db.Product.findByPk(productId,{include: ['colors','sizes','category','season']});
        let promColor = db.Color.findAll();
        let promSizes = db.Sizes.findAll();
        let promCategory = db.Category.findAll();
        let promSeason = db.Season.findAll();
        Promise
        .all([promProduct,promColor, promSizes, promCategory, promSeason])
        .then(([Product, allColors, allSizes, allCategories, allSeasons]) => {
            console.log(allGenres)
            return res.render(path.resolve(__dirname, '..', 'views',  'products/edit'), {Product, allColors, allSizes, allCategories, allSeasons})})
        .catch(error => res.send(error))
        // productos.forEach(producto=>{
        //     if(req.params.id == producto.id){
        //         res.render('products/edit',{producto:producto})
        //     }
        // })
    },
    update: (req, res) => {
        let productId = req.params.id;
        db.Product.update(
            {
                category_id: req.body.category,
                season_id: req.body.season,
                title: req.body.name,
                description: req.body.description,
                price: req.body.price,
                discount:req.body.discount,
                gender:req.body.gender,
                product_image: req.file.filename,
                deleted: 0
            },
            {
                where: {id: productId}
            })
        .then(()=> {
            return ("/productos/detalle/" + productId)})            
        .catch(error => res.send(error))
		// const id = req.params.id;
		// let productToEdit = productos.find(producto => producto.id == id);
		
		// productToEdit = {
		// 	id: productToEdit.id,
		// 	name: req.body.name,
        //     description: req.body.description,
        //     category: req.body.category,
        //     color: req.body.color,
        //     size:req.body.size,
        //     image: req.file ? req.file.filename : productToEdit.image,
		// 	price: req.body.price,
		// }

		// let newProducts = productos;
		// newProducts[id-1] = productToEdit;

		// fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, " "));
		// res.redirect("/productos/detalle/" + productToEdit.id)
	},
    // 

    list: (req,res) =>{
        db.Product.findAll()
            .then(products => {
                res.render('products/list', {products})
            })
        // productos.forEach(producto=>{
        //     return producto  
        // })
        // res.render('products/list', {productos:productos})
    },
    delete:(req, res) => {
		let finalProducts = productos.filter(producto => producto.id != req.params.id);

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));

        res.redirect("/productos")
	}
}
module.exports = productsController;