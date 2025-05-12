import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Posts from "./pages/posts/Posts";
import Author from "./pages/aurhor/Author";
import Signup from "./pages/auth/Signup";
import PostDetail from "./pages/postDetail/PostDetail";
import NotFound from "./pages/404/NotFound";
import Protected from "./components/Protected";
import Login from "./pages/auth/Login";
import Create from "./pages/create/Create";
import DeleteConfirm from "./components/DeleteConfirm";
import useAppContext from "./components/useAppContext";
import PostNotFound from "./components/PostNotFound";
import Footer from "./components/Footer";

function App() {
  const { state } = useAppContext();
  const { isDelete } = state;
  return (
    <div className="w-full min-h-screen relative">
      <NavBar />
      {isDelete && <DeleteConfirm />}
      <div className="max-w-6xl m-auto">
        <Routes>
          <Route path="/" element={<Home />}>
            Home
          </Route>
          <Route
            path="posts"
            element={
              <Protected>
                <Posts />
              </Protected>
            }
          ></Route>
          <Route
            path="posts/:pId"
            element={
              <Protected>
                <PostDetail />
              </Protected>
            }
          ></Route>
          <Route
            path="author"
            element={
              <Protected>
                <Author />
              </Protected>
            }
          ></Route>
          <Route
            path="create"
            element={
              <Protected>
                <Create />
              </Protected>
            }
          ></Route>

          <Route path="signup" element={<Signup />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="postNotFound" element={<PostNotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
