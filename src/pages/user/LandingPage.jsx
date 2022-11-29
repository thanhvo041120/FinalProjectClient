import React from "react";
import working from 'assets/images/working-girl.png'
import feature1 from 'assets/images/project/project-image01.jpg';
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const Buttons = (
    <React.Fragment>
      <ButtonGroup>
        <Button onClick={() => navigate("/login")} sx={{ color: "#E9E9E9", fontWeight: "bold" }}>
          SignIn
        </Button>
        <Button onClick={() => navigate("/register")} sx={{ color: "#E9E9E9", fontWeight: "bold" }}>
          SignUp
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
  return (
    <div>
      <div className="navbar navbar-expand-lg">
        <div className="container">
          <p className="navbar-brand">
            Smart Library
          </p>
          {Buttons}
        </div>
      </div>

      <section className="hero hero-bg d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-10 col-12 d-flex flex-column justify-content-center align-items-center">
              <div className="hero-text">
                <h1 className="text-white" data-aos="fade-up">
                  We are ready for your learning
                </h1>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div
                className="hero-image"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <img
                  src={working}
                  className="img-fluid"
                  alt="working girl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="project section-padding" id="project">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-12">
              <h2 className="mb-5 text-center" data-aos="fade-up">
                Please take a look through our <strong>featured Smart Library</strong>
              </h2>

              <div className="owl-carousel owl-theme" id="project-slide">
                <div
                  className="item project-wrapper"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <img
                    src={feature1}
                    className="img-fluid"
                    alt="project image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 mx-lg-auto col-md-8 col-10">
              <h1
                className="text-white"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                We make creative <strong>brands</strong> only.
              </h1>
            </div>

            <div
              className="col-lg-3 col-md-6 col-12"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h4 className="my-4">Our Library</h4>

              <p className="mb-1">
                <i className="fa fa-home mr-2 footer-icon"></i>
                5555, Bach Dang street, Hai Chau District, Danang City, Vietnam
              </p>
            </div>

            <div
              className="col-lg-4 mx-lg-auto text-center col-md-8 col-12"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <p className="copyright-text">
                Copyright &copy; 2022 Smart Library
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
