import React from "react";
import { Link } from "react-router-dom";
import chats from "../../assets/images/chats.png";
import realTime from "../../assets/images/virtual.jpg";
import history from "../../assets/images/history.png";
import "../../assets/styles/features.css";

const Features = () => {
    return (
        <div className="features-container">
            <div className="features-header">
                <h3 className="title">Our Features</h3>
            </div>
            {/* Realtime section */}
            <div className="realtime">
                <div className="realtime-text">
                    <h3 className="title">Realtime Communication</h3>
                    <p className="text">
                        Talk in real time with a doctor anytime, anywhere and reduce the number of trips to a healthcare facility.
                    </p>
                </div>
                <div className="realtime-image-container">
                    <img
                        src={realTime}
                        alt="Realtime"
                        className="realtime-image"
                    />
                </div>
            </div>
            {/* History section */}
            <div className="history">
                <div className="history-image-container">
                    <img
                        src={history}
                        alt="History"
                        className="history-image"
                    />
                </div>
                <div className="history-text">
                    <h3 className="title">Retrieve History</h3>
                    <p className="text">
                        Get your chat history.
                        Our databases have been designed to help you get all your chat history, unless, of course, they have been deleted.
                    </p>
                </div>
            </div>
            {/* Chats section */}
            <div className="chats">
                <div className="chats-text">
                    <h3 className="title">Private and Group Chat Capabilities</h3>
                    <p className="text">
                        That’s right.
                        Create group chats and join existing groups on invite.
                        DM a doctor or nurse and chat away.
                    </p>
                </div>
                <div className="chats-image-container">
                    <img
                        src={chats}
                        alt="Chats"
                        className="chats-image"
                    />
                </div>
            </div>

            <div className="separator-line"></div>

            <div className="login-link">
                Start today and get instant help from a medical professional. <Link to="/login" >
                    Start Here
                </Link>
            </div>
        </div>
    )
}

export default Features;
