import express from 'express';
import { createBlog, fetchAllBlogs, fetchBlogById } from '../controllers/blogControllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/blog',verifyToken,upload.single("image"),createBlog);
router.get('/blogs',fetchAllBlogs);
router.get('/blogs/:id',fetchBlogById);

export default router;