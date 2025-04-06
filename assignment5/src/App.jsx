import "./App.css";
import Nav from "./components/Nav";
import AppContext from "./components/AppContext";
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
