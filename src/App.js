import React from "react";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import { Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import PostDetails from "./components/PostDetails";
import User from "./pages/User";
import PostCreate from "./pages/PostCreate";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const {user} = useAuthContext();

  return (
    <div className="App">
        <NavigationBar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route exact path="/post" element={<Posts />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/details/:id" element={<PostDetails />} />
          {user && <Route exact path="/user" element={<User />} />}
          {user && <Route exact path="/creation" element={<PostCreate />} />}
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
