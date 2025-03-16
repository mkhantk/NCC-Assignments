import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";
import AppContext from "./components/AppContext";
import Theme from "./components/Theme";
import View from "./View";

function App() {
  return (
    <AppContext>
      {/* <Login /> */}
      <Nav />
      <View />
    </AppContext>
  );
}

export default App;
