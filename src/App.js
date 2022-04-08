import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useGlobalContext } from "./context";
import {
  Admin,
  AdminPosts,
  Draft,
  Drafts,
  EditPost,
  EditDraft,
  Home,
  IndividualPost,
  Login,
  NewPost,
  Posts,
  Stats,
} from "./pages";
import { Navbar, Footer } from "./components";

const SMALL_WIDTH_BREAKPOINT = 600;
const SMALL_HEIGHT_BREAKPOINT = 600;

function App() {
  const { isLoggedIn } = useGlobalContext();
  const [isSmallScreenWidth, setIsSmallScreenWidth] = useState(
    window.innerWidth < SMALL_WIDTH_BREAKPOINT
  );
  const [isSmallScreenHeight, setIsSmallScreenHeight] = useState(
    window.innerHeight < SMALL_HEIGHT_BREAKPOINT
  );

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  const checkSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width > SMALL_WIDTH_BREAKPOINT) {
      setIsSmallScreenWidth(false);
    } else {
      setIsSmallScreenWidth(true);
    }
    if (height > SMALL_HEIGHT_BREAKPOINT) {
      setIsSmallScreenHeight(false);
    } else {
      setIsSmallScreenHeight(true);
    }
  };

  return (
    <div
      className={`relative ${
        isSmallScreenWidth ? "min-h-nav-height mt-nav" : "min-h-screen"
      } pb-24 px-5`}
    >
      <Router>
        <Navbar
          isSmallScreenWidth={isSmallScreenWidth}
          isSmallScreenHeight={isSmallScreenHeight}
        />
        <main className="grid place-items-center py-20">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              {isLoggedIn ? <Redirect to="/admin" /> : <Login />}
            </Route>
            <Route path="/admin/posts">
              <AdminPosts />
            </Route>
            <Route path="/admin/new-post">
              <NewPost />
            </Route>
            <Route path="/admin/edit-post/:id">
              <EditPost />
            </Route>
            <Route path="/admin/drafts" exact>
              <Drafts />
            </Route>
            <Route path="/admin/edit-draft/:id">
              <EditDraft />
            </Route>
            <Route path="/admin/drafts/:id">
              <Draft />
            </Route>
            <Route path="/admin/stats">
              <Stats />
            </Route>
            <Route path="/admin">
              {!isLoggedIn ? <Redirect to="/login" /> : <Admin />}
            </Route>

            <Route path="/posts/:id">
              <IndividualPost />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
