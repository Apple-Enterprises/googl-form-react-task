import React from "react";

import Dashboard from "./Dashboard";

function Home() {
  /**
   * If auth will be there; 
   * will navigate to login component
   * in case of no jwt/expired jwt
   */
  return <Dashboard />;
}

export default Home;
