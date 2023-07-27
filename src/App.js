import { useEffect } from "react";
import "./App.css";
import Main from "./components/Main/Main";
import axios from "axios";

import { useDispatch } from "react-redux";

import { fetchPosts } from "./redux/slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
