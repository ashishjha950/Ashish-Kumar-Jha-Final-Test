import blogModel from '../models/blogModel.js';
import cloudinary from '../config/cloudinary.js';

export const createBlog = async(req, res) => {

    const { title, content } = req.body;
    if (!title || !content || !req.file)
        return res.status(400).json({
            error: 'Title, content and image are required',
            success: false
        });

    try {
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Blogs',
        });

        const blog = await blogModel.create({
            title,
            content,
            imageURL: uploadedImage.secure_url,
            authorId: req.user.id,
        });

        res.status(201).json(blog);
    } catch {
        res.status(500).json({
            error: 'Error while creating the blog',
            success: false,
        });
    }
};

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
