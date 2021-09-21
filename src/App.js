import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../src/Header/Header";
import { CartProvider } from "./contexts/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductScreen from "./pages/ProductScreen";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Header />

          <Switch>
            <Route path="/product" exact component={Products}></Route>
            <Route path="/product/:id" exact component={ProductScreen}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/" exact component={Home}></Route>
            <Route path="/contact" exact component={Contact}></Route>
            <Route path="/cart" exact component={Cart}></Route>
          </Switch>
        </div>
        <Newsletter />
        <Footer />
      </Router>
    </CartProvider>
  );
}
