import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/App.css';

import {
  Container
} from "reactstrap";
import City from "./views/City";

function App() {
  return (
    <Container className="App">
      <Header />
      <City />
      <Footer />
    </Container>
  );
}

export default App;
