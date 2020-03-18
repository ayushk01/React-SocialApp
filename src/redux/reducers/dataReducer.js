import {
  SET_POSTS,
  SET_POST,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  CREATE_POST,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };

    case SET_POST:
      return {
        ...state,
        post: action.payload
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state
      };

    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };

    case DELETE_POST:
      let index2 = state.posts.findIndex(
        post => post.postId === action.payload
      );
      state.posts.splice(index2, 1);
      return {
        ...state
      };

    default:
      return state;
  }
}
