import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;


// TEMPORARY DATA
// const users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
// ];

// const posts = [
//   { id: 1, title: "Post 1", body: "......", userId: 1 },
//   { id: 2, title: "Post 2", body: "......", userId: 1 },
//   { id: 3, title: "Post 3", body: "......", userId: 2 },
//   { id: 4, title: "Post 4", body: "......", userId: 2 },
// ];

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    return posts;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug) => {
  try {
    connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const getUser = async (id) => {
  console.log(id); // 66856b58e217c88ed55baa04
  try {
    await connectToDb();

    // Check if the provided id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    // Convert the id to an ObjectId
    const objectId = new ObjectId(id);
    console.log(objectId)

    const user = await User.findById(objectId);
    console.log(user); // null
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};


export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    console.log(users + "   users")
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
