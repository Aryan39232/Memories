import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(500).json({ message: 'Could not load memories. Please try again.' });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags, page = 1 } = req.query;
  const LIMIT = 8;

  try {
    const tagList = tags ? tags.split(',').filter(Boolean) : [];
    const hasTitle = searchQuery && searchQuery !== 'none';

    const orConditions = [];
    if (hasTitle) orConditions.push({ title: new RegExp(searchQuery, 'i') });
    if (tagList.length) orConditions.push({ tags: { $in: tagList } });

    const query = orConditions.length ? { $or: orConditions } : {};
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments(query);
    const posts = await PostMessage.find(query).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(500).json({ message: 'Search failed. Please try again.' });
  }
};

export const getPostsByCreator = async (req, res) => {
  const { name, page = 1 } = req.query;
  const LIMIT = 8;

  try {
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({ name });
    const posts = await PostMessage.find({ name }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(500).json({ message: 'Could not load these memories. Please try again.' });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Memory not found.' });

    const post = await PostMessage.findById(id);
    if (!post) return res.status(404).json({ message: 'Memory not found.' });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Could not load this memory. Please try again.' });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  try {
    if (!post?.title || !post?.message) {
      return res.status(400).json({ message: 'A title and a message are required.' });
    }

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: 'Could not save your memory. Please try again.' });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Memory not found.' });

    const existing = await PostMessage.findById(id);
    if (!existing) return res.status(404).json({ message: 'Memory not found.' });

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    const result = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Could not update this memory. Please try again.' });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Memory not found.' });

    const deleted = await PostMessage.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Memory not found.' });

    res.json({ message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete this memory. Please try again.' });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) return res.status(401).json({ message: 'Please sign in to like memories.' });
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Memory not found.' });

    const post = await PostMessage.findById(id);
    if (!post) return res.status(404).json({ message: 'Memory not found.' });

    const index = post.likes.findIndex((uid) => uid === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((uid) => uid !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Could not update the like. Please try again.' });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Memory not found.' });
    if (!value || !String(value).trim()) return res.status(400).json({ message: 'A comment cannot be empty.' });

    const post = await PostMessage.findById(id);
    if (!post) return res.status(404).json({ message: 'Memory not found.' });

    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Could not add your comment. Please try again.' });
  }
};
