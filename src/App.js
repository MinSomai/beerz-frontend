import "./App.css";
import { Container } from "react-bootstrap";
import BeersTab from "./components/BeersTab";

import { BeersProvider } from "./store/BeersContext";
function App() {
  return (
    <div className="App">
      <main className="pt-5">
        <Container>
          <BeersProvider>
            <BeersTab />
          </BeersProvider>
        </Container>
      </main>
    </div>
  );
}

export default App;
