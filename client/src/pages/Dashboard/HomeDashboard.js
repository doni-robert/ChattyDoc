import React from "react";
import WelcomeMessage from "../../components/ui/WelcomeMessage";
import "../../assets/styles/homeDashboard.css";
import doctor from "../../assets/images/doctor.png";
import nurse from "../../assets/images/nurse.png";
import patient from "../../assets/images/patient.png";

const HomeDashboard = () => {
  return (
    <div className="home-dashboard-container">
      <WelcomeMessage />
      <div className="home-dashboard-images">
        <figure>
          <img src={doctor} alt="" />
          <figcaption>500+ doctors</figcaption>
        </figure>
        <figure>
          <img src={nurse} alt="" />
          <figcaption>1000+ nurses</figcaption>
        </figure>
        <figure>
          <img src={patient} alt="" />
          <figcaption>2000+ patients</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default HomeDashboard;
