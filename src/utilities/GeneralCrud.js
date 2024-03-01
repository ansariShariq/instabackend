// const express = require('express');
// const { register } = require('../controller/auth.controller');
// // const { register } = require('./');
// // const { model } = require('mongoose');
// const router = express.Router()

// const GeneralCrud = (method,url,Model,MiddleWare)=>{
  
//     if(method === "GET" && url === `/`){

//         router.get(url,...MiddleWare, async (req, res) => {
//             try {
//               const elements = await Model.find();
//               console.log(elements);
//               res.json(elements).status(201);
//             } catch (err) {
//               console.log(err);
//               res.status(500).json({ error: 'An error occurred while fetching data.' });
//             }
//           })
//     }
//     else if(method === "POST" && url === `/`){
//         router.post(url,async (req, res) => {
//             try {
//               const element = await Model.create(req.body);
//               res.json(element).status(200);
//             } catch (err) {
//                 res.send(err).status(400)
//             }
//           });
//     }

//     else if(method === "GET" && url === '/:id'){
//         router.get(url, async (req, res) => {
//             try {
//               const element = await Model.findOne({"_id":req.params.id});
//               console.log(element);
//               res.json(element).status(200);
//             } catch (err) {
//               console.log(err);
//               res.status(500).json({ error: 'An error occurred while fetching data.' });
//             }
//           })
//     }
//     else if(method === "DELETE" && url === '/:id'){
//         router.delete(url, async (req, res) => {
//             try {
//               const element = await Model.findOneAndDelete({"_id":req.params.id});
//               console.log(element);
//               res.json(element).status(200);
//             } catch (err) {
//               console.log(err);
//               res.status(500).json({ error: 'An error occurred while fetching data.' });
//             }
//           })
//     }
//     else if(method === "PATCH" && url === '/:id'){
//         router.patch(url, async (req, res) => {
//             try {
//               const element = await Model.findOneAndUpdate({"_id":req.params.id},{$set:req.body},{new:true});
//               console.log(element);
//               res.json(element).status(200);
//             } catch (err) {
//               console.log(err);
//               res.status(500).json({ error: 'An error occurred while fetching data.' });
//             }
//           })
//     }
//       return router
// }
// module.exports = GeneralCrud