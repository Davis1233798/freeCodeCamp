'use strict';

const express = require('express');
const cors = require('cors');

const multer = require('multer');
// here on HyperDev the fs is read only, 
// You have to upload the file to memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });
    
  // using 'multer' middleware...
app.post('/api/fileanalyse',upload.single('upfile'), function(req, res){
   res.json({
    'name' : req.file.originalname,
    'type' : req.file.mimetype,
    'size' : req.file.size
   });
});
    

 // 404-NOT FOUND Middleware
 app.use(function(req, res, next){
   res.status(404);
   res.type('txt').send('Not found');
 });

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});