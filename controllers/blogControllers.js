import blogModel from '../models/blogModel.js';

export const createBlog = async (req,res) => {
    try{
        console.log(req.file)
       res.status(201).json({message:"Blog Created Successfully"}) 
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}

export const fetchAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().populate("authorId", "name email"); 
    return res.status(200).json({ success: true, blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const fetchBlogById = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({ authorId: req.params.id })
      .populate("authorId", "name email");
    
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ success: false, message: "No blogs found" });
    }

    return res.status(200).json({ success: true, blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
