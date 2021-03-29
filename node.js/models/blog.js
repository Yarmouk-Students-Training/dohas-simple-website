const mongoose = require('mongoose');
const schema = mongoose.Schema ; 
const blogschema= new schema ({
    title:{
        type : String, 
        required : true
    },
    snippet: {
        type : String,
        required : true

    },
    body: {
        type : String,
        required : true
    }

},{titmestamps : true});
 const Blog = mongoose.model('Blogs',blogschema );
 module.exports = Blog;
 