import {
  faCheckCircle,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import loadingicon from "../assets/loading.gif";
import { CartContext } from "../contexts/Cart";
import * as action from "../redux/actions";
import { productsState$ } from "../redux/selectors";
import "../Styles/Product.css";
import "../Styles/Toast.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [productsType, setProductsType] = useState([]);
  const [toast, setToast] = useState(false);
  const [sortPrice, setSortPrice] = useState(' Featured ');
  const productsSelector = useSelector(productsState$);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.getProducts.getProductsRequest());
  }, [dispatch]);

  useEffect(() => {
    setProductsType(productsSelector);
    setProducts(productsSelector);
  }, [productsSelector]);

  const { addToCart } = useContext(CartContext);

  const cartClick = (product) => {
    addToCart(product);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 1500);
  };
  const changeAll = () => {
    setProductsType(products);
    setSortPrice('Featured')
    return;
  };
  const changeMale = () => {
    const male = products.filter((product) => product.category === "men's clothing");
    setProductsType(male);
    setSortPrice('Featured')

    return;
  };
  const changeFemale = () => {
    const female = products.filter((product) => product.category === "women's clothing");
    setProductsType(female);
    setSortPrice('Featured')
    return;
  };
  const sortPriceLowToHigh=()=>{
    const newlist = [...productsType]
    newlist.sort((a,b)=> parseInt(a.price)- parseInt(b.price))
    setProductsType(newlist);
    setSortPrice('Low to High')

  
    return;
  }
  const sortPriceHighToLow =()=>{
    const newlist = [...productsType]
    newlist.sort((a,b)=> parseInt(b.price)- parseInt(a.price))
    setProductsType(newlist);
    setSortPrice('High to Low')
   
    return;
  }
 

  const styles = {
    btnAdd: {
      width: "120px",
      height: "50px",
      backgroundColor: "#5693F0",
      padding: 8,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 0 },
    },
    title: {
      marginTop: 150,
      marginLeft: 30,
      fontWeight: 700,
      fontSize: 30,
      color: "#000",
      with: "100%",
    },
    product_title: {
      fontWeight: 700,
      fontSize: 20,
    },
    product_title_link: {
      textDecoration: "none !important",
    },
    container: {
      margin: 0,
      padding: 0,
      with: "100%",
    },
    col: {
      with: "80%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    choice: {
      margin: 10,
    },
  };
  return (
    <div>
      <div className={toast ? "toast toast-show-success" : "toast"}>
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
        Product is added to cart successfully
      </div>

      <h2 style={styles.title}>Product</h2>
      <Container className="containner">
        <div className="filter_top">
          <ButtonGroup style={styles.choice}>
            <Button onClick={changeAll}>All</Button>
            <Button onClick={changeFemale}>Female</Button>
            <Button onClick={changeMale}>Male</Button>
          </ButtonGroup>
             <div className="filter-price" >
                <span className='sortValue'>Price: {sortPrice}</span>
                <FontAwesomeIcon icon={faChevronDown}  />
              <ul className="shop-handle__drop-list">
                <li className="shop-handle__drop-item" onClick={sortPriceLowToHigh}>Price: Low to High</li>
                <li className="shop-handle__drop-item" onClick={sortPriceHighToLow} >Price: High to Low</li>
              </ul>
              </div>
        </div>
        <Col style={styles.col}>
          {productsType.length === 0 ? (
            <img src={loadingicon} alt="loading"></img>
          ) : (
            <Row xs={1} md={3} lg={4}>
              {productsType.map((product, id) => (
                <Card key={id}>
                  <div className="productImg">
                    <p>
                      <img
                        title=""
                        width="100%"
                        src={product.image}
                        alt="img"
                      />
                    </p>
                  </div>
                  <CardBody className="cardBody">
                    <CardTitle
                      className="titleProduct"
                      style={styles.product_title}
                      tag="h5"
                    >
                      <Link
                        className="linkProduct"
                        to={`/product/${product.id}`}
                        style={styles.product_title_link}
                      >
                        {" "}
                        {product.title}{" "}
                      </Link>
                    </CardTitle>
                    <CardText className="priceProduct">
                      Price: ${product.price}
                    </CardText>

                    <Button
                      style={styles.btnAdd}
                      onClick={() => cartClick(product)}
                      className="buttonAdd"
                    >
                      Add to Cart
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </Row>
          )}
        </Col>
      </Container>
    </div>
  );
}

export default Products;
