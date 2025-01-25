import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./component/Login";
import Feed from "./component/Feed";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./component/profile";
import Connections from "./component/Connections";
import ConnectionRequests from "./component/ConnectionRequests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Feed />} />

              <Route path="/connections" element={<Connections />} />
              <Route path="/request" element={<ConnectionRequests />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
