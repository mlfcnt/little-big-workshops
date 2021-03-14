import React from "react";
import Workshops from "../components/Workshops";
import Layout from "../templates/layout";

const Home = () => {
  return (
    <Layout>
      <h1 className="main-heading">Little Big Workshops</h1>
      <Workshops />
    </Layout>
  );
};

export default Home;
