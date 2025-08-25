import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  imageURL: {
    type: String, 
    required: false
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;
