import React, { useEffect, useState } from "react";
import "../App.css";
import Banner from "../Banner/Banner";
import RecommendBanner from "../Home/RecommendBanner";

// import axios from "axios";

function Home() {
  const [collection, setCollection] = useState([]);
  useEffect(() => {
 
       setCollection(0);
    
    window.scrollTo(0, 0);
     document.body.style.overflow = "auto";
  }, []);

  return (
    <div>
      <Banner collection={collection} />
      <RecommendBanner />
    </div>
  );
}
export default Home;
