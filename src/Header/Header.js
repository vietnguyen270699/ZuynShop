import {
  faAngleDown,
  faBars,
  faCartPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, {  useEffect, useRef, useState } from "react";
import Div100vh from "react-div-100vh";
import { Link, withRouter } from "react-router-dom";
import "../App.css";
import { CartContext } from "../contexts/Cart";

import MenuItemDropdown from "./MenuItemDropdown";
import Search from "./Search.js";
import logo from "../assets/logoshop.png";

function Header(props) {
  const [scrolled, setScrolled] = useState(false);
  const [whiteBox, setWhiteBox] = useState(false);
  const [whiteText, setWhiteText] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [disableBox, setDisableBox] = useState(false);
  const [dropdownHover, setDropdownHover] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const location = props.history.location.pathname;
  const path = props.history.location.pathname.slice(12);

  const subHeight = useRef();

  function clickToClose() {
    document.body.style.overflow = "unset";
    setSearchOpen(false);


    setOpenMobileMenu(false);
  }

  const handleHover = () => {
    setDropdownHover(true);
  };
  const handleLeaveHover = () => {
    setDropdownHover(false);
  };
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const [navBar, setNavBar] = useState([]);
  useEffect(() => {
    const navBar = [
      {
        id: "1",
        label: "Home",
        url: "/home",
        dropdownContent: [],
      },
      {
        id: "2",
        label: "Product",
        url: "/product",
        dropdownContent: [],
      },

      {
        id: "3",
        label: "Contact",
        url: "/contact",
        dropdownContent: [],
      },
    ];
    setNavBar(navBar);

  

    function onScroll() {
      if (
        location === "/news" ||
        location === `/news/category/${props.match.params.cate}` ||
        location === "/collection" ||
        location === `/collection/${path}`
      ) {
        if (window.pageYOffset < 50) {
          // top
          if (dropdownHover === true) {
            setWhiteBox(true);
            setWhiteText(false);
            setDisableBox(false);
          } else {
            setWhiteBox(false);
            setWhiteText(true);
            setDisableBox(true);
          }
        } else if (this.prev < window.pageYOffset) {
          //down
          if (dropdownHover === true) {
            setScrolled(false);
          } else {
            setScrolled(true);
          }
          setWhiteBox(true);
          setDisableBox(false);
          setWhiteText(false);
        } else if (this.prev > window.pageYOffset) {
          //up
          setScrolled(false);
        }
      } else {
        if (window.pageYOffset < 50) {
          // top
          setWhiteBox(false);
          setWhiteText(false);
        } else if (this.prev < window.pageYOffset) {
          //down
          if (dropdownHover === true) {
            setScrolled(false);
          } else {
            setScrolled(true);
          }
          setWhiteBox(true);
        } else if (this.prev > window.pageYOffset) {
          //up
          setScrolled(false);
          setWhiteText(false);
        }
      }
      this.prev = window.pageYOffset;
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [
   
    location,
    dropdownHover,
    props.match.params.cate,
    path,

  ]);

 

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const openMobileMenuFunc = () => {
    setOpenMobileMenu(true);
  
  };

  const [closeAnimation, setCloseAnimation] = useState(false);
  const closeMobileMenuFunc = () => {
    document.body.style.overflow = "unset";
    setCloseAnimation(true);
    setTimeout(() => {
      setOpenMobileMenu(false);
      setCloseAnimation(false);
    }, 700);
  };

  const redirect = (event) => {
    window.scrollTo(0, 0);
    props.history.push(`/${event.target.id}`);
    closeMobileMenuFunc();
  };

  const [searchMobile, setSearchMobile] = useState("");
  return (
    <div
      className={classNames("Header", {
        scrolled: scrolled === true,
        white: whiteBox === true,
        white_disable: disableBox === true,
      })}
    
    >
      <div
        className={
          whiteText === false
            ? "menu-mobile flex-center"
            : "menu-mobile flex-center closeMenuMobile_white"
        }
      >
        <FontAwesomeIcon
          icon={faBars}
          onClick={openMobileMenuFunc}
          style={{ fontSize: "20px" }}
        />
      </div>
      {openMobileMenu === true && (
        <Div100vh className="menu-mobile-box flex">
          <div
            className={classNames("menu-mobile-left flex-col", {
              openMenuMobile: openMobileMenu,
              closeMenuMobile: closeAnimation,
            })}
          >
            <div className="menu-mobile-search flex-center">
              <input
                onChange={(e) => {
                  setSearchMobile(e.target.value);
                }}
                value={searchMobile}
                className="input"
                placeholder="Search"
                style={{ fontSize: "16px", height: "50px" }}
              ></input>
              <div
                onClick={() => {
                  props.history.push(`/shop/${searchMobile}`);
                  closeMobileMenuFunc();
                }}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ marginLeft: "10px", color: "#777" }}
                />
              </div>
            </div>
            <div className="menu-mobile-list">
              {navBar.map((item, index) => {
                let home = "";
                if (location === "/") home = "home";
                return (
                  <div
                    key={index}
                    style={{
                      color: "#111",
                      maxHeight: openSubMenu === item.id ? `1000px` : "40px",
                    }}
                    className={classNames("menu-mobile-item a", {
                      menu_mobile_item_active:
                        location.slice(1) === item.label.toLowerCase() ||
                        home === item.label.toLowerCase(),
                    })}
                  >
                    <div
                      className="flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <p id={item.label.toLowerCase()} onClick={redirect}>
                        {item.label}
                      </p>
                      {item.dropdownContent.length > 0 && (
                        <div
                          style={{
                            width: "30px",
                          }}
                          className="flex-center"
                          onClick={() => {
                            if (!item.dropdownContent.length > 0) {
                              props.history.push(item.url);
                            } else {
                              if (!openSubMenu) {
                                setOpenSubMenu(item.id);
                              } else {
                                if (openSubMenu === item.id) {
                                  setOpenSubMenu(null);
                                } else {
                                  setOpenSubMenu(item.id);
                                }
                              }
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                      )}
                    </div>
                    <div className="menu-mobile-sub" ref={subHeight}>
                      {item.dropdownContent.map((item2, index) => {
                        return (
                          <div key={index} className="menu-item-sub-item">
                            <p
                              id={`${item.label.toLowerCase()}/${item2.dropdownTitle.replace(
                                /\s+/g,
                                ""
                              )}`}
                              onClick={redirect}
                            >
                              {item2.dropdownTitle}
                            </p>
                            {item2.dropdownList.map((item3, index) => {
                              return (
                                <div
                                  className="menu-item-sub-item2"
                                  key={index}
                                >
                                  <p
                                    id={`${item.label.toLowerCase()}/${item3.replace(
                                      /\s+/g,
                                      ""
                                    )}`}
                                    onClick={redirect}
                                  >
                                    {item3}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="menu-mobile-right"
            onClick={closeMobileMenuFunc}
          ></div>
        </Div100vh>
      )}
      <ul className="menu flex-center">
        {navBar.map((item, index) => {
          return (
            <MenuItemDropdown
              handleClick={handleClick}
              handleHover={handleHover}
              handleLeaveHover={handleLeaveHover}
              dropdownHover={dropdownHover}
              scrolled={scrolled}
              location={location}
              key={index}
              whiteText={whiteText}
              label={item.label}
              url={item.url}
              dropdownContent={item.dropdownContent} // dropdown text
              className="menu-item"
            ></MenuItemDropdown>
          );
        })}
      </ul>
      <div className="logo flex-center">
        <Link to="/">
          {whiteText === true ? (
            <img
              src="https://demo.uix.store/sober/wp-content/themes/sober/images/logo-light.svg"
              alt="logo"
            ></img>
          ) : (
            <img src={logo} alt="logo"></img>
          )}
        </Link>
      </div>
      <div
        className={classNames("cart flex-center", {
          whitelink_header: whiteText === true,
        })}
      >
        <div className="icon-container">
          <FontAwesomeIcon
            icon={faSearch}
            className="icon search-icon"
            onClick={() => {
              setSearchOpen(true);
            }}
          />
        </div>
          <Link to="/cart">
          
            <CartContext.Consumer>
            {({ totalItem }) => (
              <div
                className="icon flex-center"
               
                  >
                <FontAwesomeIcon icon={faCartPlus} className="cart-icon" />
                <div
                  className={classNames("cart-count flex-center", {
                    cart_count_news_hover: whiteText === true,
                  })}
                  >
                  <p className="cart-items">{totalItem}</p>
                </div>
              </div>
                     )}
                </CartContext.Consumer>
          </Link>
      </div>
      <Search searchOpen={searchOpen} clickToClose={clickToClose} />
    </div>
  );
}
export default withRouter(Header);
