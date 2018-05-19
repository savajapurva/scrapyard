const Order = require('../models/order'); // Import User Model Schema
const config = require('../config/database'); // Import database configuration
const Acceptedorders=require('../models/acceptedorders');

module.exports = (router) => {


  router.post('/ordereq', (req, res) => {
      console.log('order req'+JSON.stringify(req.body));

      let order = new Order({
            username: req.body.name,
            email: req.body.email,
            work: req.body.work,
            address: req.body.address,
            date:req.body.date,
            userid:req.body.userid,
            mobile:req.body.mobile,
            cityzip:req.body.cityzip
      });

      order.save(function(err,data){
            if (err) {
                res.send(err);
            }else{

                res.json({success:true,order:data});
            }
        });
  });

  router.get('/allOrder',(req,res) => {

     Order.find(function(err, orders) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
             res.send(err)
          //console.log('order',orders);
            res.json(orders); // return all reviews in JSON format
        });
  })

  router.post('/deleteorder',(req,res) => {
var id=req.body._id;
console.log('id',id);
 var myquery = { _id: id };
     Order.deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted",obj);
      });
  })


  router.post('/acceptinsert',(req,res) => {
    console.log("nodedate"+req.body.date);
    let accepted = new Acceptedorders({
      orderid: req.body.id,
      vendorname:req.body.vendorname,
      username:req.body.username,
      email:req.body.email,
      work:req.body.work,
      address:req.body.address,
      date:req.body.date
    });
    accepted.save(function(err,data){
          if (err) {
              res.send(err);
          }else{

              res.json({success:true,order:data});
          }
      });
  })


  router.get('/allacceptorder/:venderName',(req,res) => {
    console.log('req.params.username',req.params.venderName);
    Acceptedorders.find().where("vendorname",req.params.venderName)
    .exec(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json({success:true,order:result});
    });
  })


    router.get('/userorder/:id',(req,res) => {

          console.log("nodeuserid"+req.params.id);
          Order.find().where("userid",req.params.id)
          .exec(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json({success:true,order:result});
          });
    })

  return router; // Return router object to main index.js
}
