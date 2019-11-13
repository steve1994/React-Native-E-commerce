var express = require('express');
var router = express.Router();
var path = require('path');
const Product = require('../model/products')

router.put('/upload/:idProduct', function (req,res) {
    let idProduct = req.params.idProduct;
    let uploadedFile = req.files ? req.files.files : null;
    let fileName = req.files ? (Date.now() + '_' + req.files.files.name) : null;
    if (uploadedFile) {
        uploadedFile.mv(path.join(__dirname,`../public/images/uploaded_image/${fileName}`), function (err) {
            if (err) {
                res.status(400).json({status:'failed',error:err})
            } else {
                Product.find({_id:idProduct})
                .exec(function (err,response) {
                    if (err) {
                        res.status(400).json({status:'failed',error:err})
                    } else {
                        let arrayImage = response[0].imageProduct;
                        arrayImage.push(fileName);
                        Product.findOneAndUpdate({_id:idProduct},{imageProduct:arrayImage},function (err,response) {
                            if (err) {
                                res.status(400).json({status:'failed',error:err});
                            } else {
                                res.status(201).json({status:'success',data:response});
                            }
                        })
                    }
                })
            }
        })
    } else {
        res.status(400).json({status:'failed',error:'file uploaded is empty'});
    }
})

router.delete('/remove_upload/:idProduct/:fileName', function (req,res) {
    let idProduct = req.params.idProduct;
    let fileName = req.params.fileName;
    Product.find({_id:idProduct})
    .exec(function (err,response) {
        if (err) {
            res.status(400).json({status:'failed',error:err})
        } else {
            let arrayImages = response[0].imageProduct;
            let indexFileName = -1;
            for (let i=0;i<arrayImages.length;i++) {
                if (arrayImages[i] == fileName) {
                    indexFileName = i;
                }
            }
            if (indexFileName >= 0) {
                arrayImages.splice(indexFileName,1);
                Product.findOneAndUpdate({_id:idProduct},{imageProduct:arrayImages},function (err,response) {
                    if (err) {
                        res.status(400).json({status:'failed',error:err});
                    } else {
                        res.status(201).json({status:'success',data:response});
                    }
                })
            } else {
                res.status(400).json({status:'failed',error:'file not found'});
            }
        }
    })
})

router.get('/:limit/:page', function(req, res) {
    let limit = parseInt(req.params.limit) || 7;
    let numSkipPage = ((parseInt(req.params.page)-1) * limit) || 0;
    Product.find()
      .skip(numSkipPage)
      .limit(limit)
      .exec(function(err,response) {
          if (err) {
              res.status(400).json({'error':err})
          } else {
              res.status(200).json(response);
          }
      })
});

router.get('/:idProduct', function(req, res) {
    let idProduct = req.params.idProduct;
    Product.find({_id:idProduct})
      .exec(function (err,response) {
          if (err) {
              res.status(400).json({status:'failed',error:err})
          } else {
              res.status(200).json({status:'success',data:response[0]})
          }
      })
})

router.put('/:idProduct/:vote', function(req, res) {
    let idProduct = req.params.idProduct;
    let vote = parseInt(req.params.vote);
    Product.find({_id:idProduct})
      .exec(function (err,response) {
          let arrayVote = response[0].rate;
          arrayVote.push(vote);
          if (err) {
              res.status(400).json({status:'failed',error:err});
          } else {
              Product.findOneAndUpdate({_id:idProduct},{rate:arrayVote},function (err,response) {
                  if (err) {
                      res.status(400).json({status:'failed',error:err});
                  } else {
                      res.status(201).json({status:'success',data:response});
                  }
              })
          }
      })
})

router.post('/', function (req,res) {
    let title = req.body.title;
    let rate = parseInt(req.body.rate);
    let description = req.body.description;
    let price = req.body.price;
    let brand = req.body.brand;
    let detailProduct = req.body.detailProduct;
    try {
        let arrayRate = [rate];
        const newProduct = new Product({title,rate:arrayRate,description,price,brand,detailProduct});
        newProduct.save().then(dataCreated => {
            res.status(201).json({status:'success',data:dataCreated})
        })
    } catch (error) {
        res.status(400).json({status:'failed',error});
    }
})

router.delete('/:idProduct', function(req,res) {
    let idProduct = req.params.idProduct;
    Product.findOneAndDelete({_id:idProduct},function (err,response) {
        if (err) {
            res.status(400).json({status:'failed',error:err});
        } else {
            res.status(201).json({status:'success',data:response});
        }
    })
})

module.exports = router;
