import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Segment, Message, Image } from "semantic-ui-react";
import "../Landing/Landing.css";

const Landing = () => {
  return (
    <div className='landing-container'>
      <Container textAlign="left">
        <Segment>
          {/* <Image  size='large' centered src='https://i.imgur.com/RQLDOlE.jpg'/> */}
          <p style={{ fontSize: "15px" }}>
            Welcome to the ScaleHistorySLC Order Dice App version 2.2 for Bolt
            Action! This app makes playing Bolt Action, Warlords of Erewhon,
            Konflict 47 and other games that use the dice bag mechanic even more
            Covid-19 friendly!
          </p>

          <p style={{ fontSize: "15px" }}>
            Press the green button to get started, or watch the how-to video
            below!
          </p>

          <Message warning>
            <Message.Header>
              {" "}
              10/15/2020 Version 2.2 New Site Features
            </Message.Header>

            <p style={{ fontSize: "12px" }}>
              Version 2.2 features functionality for up to four players! You can
              now use this app for team games, four player free-for-all, or use
              a specific color of dice for special units or events! Also, the
              Communication Breakdown special rule is now functional within the
              app. Simply check the box during setup, and the app will do the
              rest! This app is being updated frequently, make sure to check
              back in often!
            </p>
          </Message>

          <p style={{ fontSize: "12px" }}>
            Feel free to leave me feedback by emailing me at{" "}
            <b>wiebe.jordan@yahoo.com </b>
          </p>

          <p style={{ fontSize: "10px" }}>
            *Order Dice and the games mentioned above are owned by{" "}
            <a href="https://store.warlordgames.com/">Warlord Games</a>. To have
            the best experience with their games, make sure you purchase
            physical order dice to place next to your units after they activate.
          </p>
        </Segment>
      </Container>

      <Container >
        
        <Link to="/setup">
          <Button size="massive" color='green' style={{ margin: "10px" }}>
            Begin
          </Button>
        </Link>
        
      </Container>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/U3sW4qxRnh8"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* <img src='https://i.imgur.com/A3BYOoI.jpg'/> */}
    </div>
  );
};

export default Landing;
