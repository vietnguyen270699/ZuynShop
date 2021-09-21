import React, { useEffect } from "react";
import "../App.css";
import bg from "../assets/contact.jpg";
import BannerV2 from "../Banner/BannerV2.js";
import ContactBody from "../components/Contact/ContactBody.js";
import GetInTouch from "../components/Contact/GetInTouch";



function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className="Contact">
      <BannerV2 bannerImage={bg} position={"0px"} />
      <ContactBody />
      <GetInTouch />
    </div>
  );
}
export default Contact;
