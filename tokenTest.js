router.post('/', (req, res, next) {
  if(!authHeader){
    return res.status(403)
  }
})


app.get('/api/user'){
  if(user){
    verifyToken.
  }
}

verifyToken = (req, res, next) => {

}

const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
  noteId: {type: Number, required: true},
  noteContent: {type: String, required: true}
})
module.exports = mongoose.model("notes", noteSchema);
req.query

Notes.find({ noteContent: {$regex: //}})
