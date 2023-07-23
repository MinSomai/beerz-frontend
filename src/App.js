import { Container } from "react-bootstrap";
import BeersProvider from "./providers/BeersProvider";
import BeersTab from "./components/BeersTab";

function App() {
  return (
    <main className="pt-5">
      <Container>
        <BeersProvider>
          <BeersTab />
        </BeersProvider>
      </Container>
    </main>
  );
}

export default App;
