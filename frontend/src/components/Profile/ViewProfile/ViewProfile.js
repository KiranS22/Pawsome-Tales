import React, { useState } from "react";
import "./../../../Resources/CSS/viewProfile.css";
import noprofile from "./../../../Resources/Images/no-profile.png";
import Posts from "../../Posts/Posts";

const ViewProfile = () => {
  const [showPosts, setShowPosts] = useState(false);

  const handleViewActivity = () => {
    setShowPosts(!showPosts);
  };

  return (
    <section className="vh-50-view-profile mt-4">
      <div className="container py-5">
        <div className="row d-flex">
          <div className="col-md-6">
            <div className="card card-view-profile">
              <div className="card-body p-4">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img
                      src={noprofile}
                      className="img-fluid img-fluid-view-profile"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3 d-flex flex-column">
                    <h5 className="mb-1 mb-1-view-profile">Danny McLoan</h5>
                    <div className="flex-grow-1"></div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-outline-primary-view-profile me-1"
                        onClick={handleViewActivity}
                      >
                        {showPosts ? "Hide Posts" : "View posts"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showPosts && (
            <div className="col-md-6 d-flex flex-column align-items-center user-posts">
              <div className="mt-4">
                {/* Hard-coded  - will change once I've  implemented Redux  */}
                <Posts />
                <Posts />
                <Posts />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewProfile;
