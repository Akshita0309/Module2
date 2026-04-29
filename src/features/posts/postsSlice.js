import { createSlice } from "@reduxjs/toolkit";
import {
  loadPosts,
  normalizePost,
  loadLikedIds,
  saveLikedIds,
} from "../../utils/localStorage";

const initialState = {
  posts: loadPosts(),
  likedPostIds: loadLikedIds(),
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const post = normalizePost(action.payload);
      state.posts.push(post);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
      state.likedPostIds = state.likedPostIds.filter(
        (id) => id !== action.payload,
      );
      saveLikedIds(state.likedPostIds);
    },
    updatePost: (state, action) => {
      const i = state.posts.findIndex((p) => p.id === action.payload.id);
      if (i === -1) return;

      state.posts[i] = normalizePost(action.payload);
    },
    likePost: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (!post) return;

      const alreadyLiked = state.likedPostIds.includes(action.payload);
      if (alreadyLiked) {
        post.likes = Math.max(0, post.likes - 1);
        state.likedPostIds = state.likedPostIds.filter(
          (id) => id !== action.payload,
        );
      } else {
        post.likes++;
        state.likedPostIds.push(action.payload);
      }
      saveLikedIds(state.likedPostIds);
    },
  },
});

export const { addPost, deletePost, updatePost, likePost } = postsSlice.actions;
export default postsSlice.reducer;
