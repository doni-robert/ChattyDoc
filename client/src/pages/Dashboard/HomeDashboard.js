import React from 'react'
import WelcomeMessage from '../../components/ui/WelcomeMessage'
import SearchDoctor from '../../components/ui/SearchDoctor';
import "../../assets/styles/homeDashboard.css";
import doctor1 from "../../assets/images/doctor 1.png";
import nurse1 from "../../assets/images/nurse 1.png";
import healthy1 from "../../assets/images/healthy 1.png";

const HomeDashboard = ({username}) => {
  return (
    <div className="home-dashboard-container">
        <WelcomeMessage username={username}/>
        <div className="home-dashboard-images">
            <figure>
                <img src={doctor1} alt="" />
                <figcaption>500+ doctors</figcaption>
            </figure>
            <figure>
                <img src={nurse1} alt="" />
                <figcaption>1000+ nurses</figcaption>
            </figure>
            <figure>
                <img src={healthy1} alt="" />
                <figcaption>2000+ patients</figcaption>
            </figure>

        </div>
        <SearchDoctor />
    </div>
  )
}

export default HomeDashboard