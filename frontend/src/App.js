import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
import CreatePost from "./Pages/CreatePost";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { UserContextProvider } from "./UserContext";
import PostDetails from "./Pages/PostDetails";
import EditPost from "./Pages/EditPost";
import Profile from "./Pages/Profile";
import AuthorPage from "./Pages/AuthorPage";
import BlogContainer from "./Components/BlogContainer";
import PostCreate from "./Components/PostCreate";
import PostsContainer from "./Components/PostsContainer";
import EditProfile from "./Pages/EditProfile";
import DeleteComment from "./Pages/DeleteComment";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/author/:id" element={<AuthorPage />} />
          <Route path="/post" element={<PostsContainer />} />
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/edit-profile/:id" element={<EditProfile />} />
          <Route path="/comment-delete/:id" element={<DeleteComment />} />
        </Route>
        <Route path="/create" element={<PostCreate />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
