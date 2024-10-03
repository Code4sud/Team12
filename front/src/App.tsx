import { Container } from "@/components/Container";
import { Page } from "@/components/Page";
import './App.css'
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {

  return (
    <Container>
      <Navbar />
      <Page />
      <Footer />
    </Container>
  )
}

export default App