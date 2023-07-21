import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPostsAPICall } from "../../../../utils/utills";
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  fetchAllPostsAPICall
);

const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
  likeCount: 0,
  CommentCount: 0,
};

const Posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePostTitle: (state, action) => {
      const { id, title } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === id) {
          post.title = title;
          
        }
        return post;
      });
    },

    updatePostContent: (state, action) => {
      const { id, content } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === id) {
          post.content = content;
        }
        return post;
      });
    },
  },
});

export const {} = Posts.actions;

export default Posts.reducer;
