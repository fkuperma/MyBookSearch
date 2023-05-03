//Fraidy Kuperman
import { useReducer } from "react";
import "./App.css";
import { Home } from "./component/home/home";
import { ReadList } from "./component/readList/readList";
import { Search } from "./component/search/search";
import { Review } from "./component/review/review";
import { Header } from "./component/header/header";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ReadListContext } from "./state/readList/readList-context.jsx";
import { readListReducer } from "./state/readList/readList.reducer.js";
import UserContext from "./state/user/user-context.jsx";
import { SearchProvider } from "./state/search/search-context.jsx";
import { SimpleBottomNavigation } from "./component/footer/footer";
import { useState } from "react";
import MyContext from "./state/MyContext";

function App() {
  const [readListState, readListDispatch] = useReducer(readListReducer, {
    readLists: [],
  });
  const [username, setUsername] = useState("");
  const [state, dispatch] = useReducer();
  const [data, setData] = useState({});

  return (
    <HashRouter>
      <Header />
      <SearchProvider>
        <UserContext.Provider
          value={{ username, setUsername }}
        ></UserContext.Provider>
        <ReadListContext.Provider value={{ readListState, readListDispatch }}>
          <MyContext.Provider value={{ data, setData }}>
            <Routes>
              {/* http://localhost:3000/#/ */}
              <Route path="/" element={<Home />} />
              {/* http://localhost:3000/#/readList */}
              <Route path="/readList" element={<ReadList />} />
              {/* http://localhost:3000/#/search */}
              <Route path="/search" element={<Search />} />
              {/* http://localhost:3000/#/review */}
              <Route path="/review" element={<Review />} />
            </Routes>
          </MyContext.Provider>
        </ReadListContext.Provider>
        <UserContext.Provider
          value={{ username, setUsername }}
        ></UserContext.Provider>
      </SearchProvider>
      <SimpleBottomNavigation />
    </HashRouter>
  );
}

export default App;
