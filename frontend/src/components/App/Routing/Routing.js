import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const Routing = () => {
  return (
    <>
      <Router>
        <NavBar />

        <Routes>
          {/* <Route path="/" exact element={<Home />} /> */}

          {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Routing;
