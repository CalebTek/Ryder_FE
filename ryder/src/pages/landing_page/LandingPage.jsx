import React from "react";
import { Link } from "react-router-dom";

// import required images
import bgImage from "../../images/slider-bg-img.png";
import bgImage2 from "../../images/Pick-n-Pay.svg";
import customer from "../../images/client-round-frame.svg";

// import required service icons
import { FaStar } from "react-icons/fa";

import secure_reliable from "../../images/icons/eos-icons_secure-data-outlined.svg";
import time_delivery from "../../images/icons/ic_baseline-access-time.svg";
import shipping from "../../images/icons/fa-solid_shipping-fast.svg";
import customer_service from "../../images/icons/ri_customer-service-fill.svg";
import world from "../../images/icons/bx_world.svg";
import building from "../../images/icons/fluent_building-shop-16-filled.svg";
import Footer from "./footer";

import { AppNavbar } from "../../components";

// Define the list of services with their data
const servicesData = [
  {
    id: 1,
    icon: secure_reliable,
    description: "Reliable and secure",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante maecenas fusce orci nullam aenean arcu tellus. Massa rhoncus vestibulum, at nunc pellentesque ornare urna."
  },
  {
    id: 2,
    icon: time_delivery,
    description: "On-time delivery",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante maecenas fusce orci nullam aenean arcu tellus. Massa rhoncus vestibulum, at nunc pellentesque ornare urna."
  },
  {
    id: 3,
    icon: shipping,
    description: "Track your shipment",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante maecenas fusce orci nullam aenean arcu tellus. Massa rhoncus vestibulum, at nunc pellentesque ornare urna."
  },
  {
    id: 4,
    icon: customer_service,
    description: "Great Customer Service",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante maecenas fusce orci nullam aenean arcu tellus. Massa rhoncus vestibulum, at nunc pellentesque ornare urna."
  },
  {
    id: 5,
    icon: world,
    description: "Nationwide Delivery",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante maecenas fusce orci nullam aenean arcu tellus. Massa rhoncus vestibulum, at nunc pellentesque ornare urna."
  },
  {
    id: 6,
    icon: building,
    description: "Order Fulfilment",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante maecenas fusce orci nullam aenean arcu tellus. Massa rhoncus vestibulum, at nunc pellentesque ornare urna."
  }
];

// Define the customer reviews data
const customerReviews = [
  {
    id: 1,
    image: customer,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id est leo a eget risus nunc. Arcu amet nibh arcu risus vulputate. Amet, ac nec, nunc viverra massa blandit nec enim volutpat. Cursus pretium velit eget justo, turpis.",
    name: "Jenifer Harrison",
    rating: 5
  },
  {
    id: 2,
    image: customer,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id est leo a eget risus nunc. Arcu amet nibh arcu risus vulputate. Amet, ac nec, nunc viverra massa blandit nec enim volutpat. Cursus pretium velit eget justo, turpis.",
    name: "John Smith",
    rating: 4
  },
  {
    id: 3,
    image: customer,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id est leo a eget risus nunc. Arcu amet nibh arcu risus vulputate. Amet, ac nec, nunc viverra massa blandit nec enim volutpat. Cursus pretium velit eget justo, turpis.",
    name: "Alice Johnson",
    rating: 5
  },
  {
    id: 4,
    image: customer,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id est leo a eget risus nunc. Arcu amet nibh arcu risus vulputate. Amet, ac nec, nunc viverra massa blandit nec enim volutpat. Cursus pretium velit eget justo, turpis.",
    name: "Jenifer Harrison",
    rating: 4
  },
  {
    id: 5,
    image: customer,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id est leo a eget risus nunc. Arcu amet nibh arcu risus vulputate. Amet, ac nec, nunc viverra massa blandit nec enim volutpat. Cursus pretium velit eget justo, turpis.",
    name: "John Smith",
    rating: 4
  },
  {
    id: 6,
    image: customer,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id est leo a eget risus nunc. Arcu amet nibh arcu risus vulputate. Amet, ac nec, nunc viverra massa blandit nec enim volutpat. Cursus pretium velit eget justo, turpis.",
    name: "Alice Johnson",
    rating: 5
  }
];

// StarRating component
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const starColor = i <= rating ? "#f4c542" : "#ccc"; // Define the star's color
    stars.push(<FaStar key={i} color={starColor} />);
  }
  return <div className="star-rating">{stars}</div>;
};

const LandingPage = () => {
  return (
    <div>
      <AppNavbar />
      {/* First Section */}
      <section
        className="bg-image bg-custom"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6) !important"
        }}
      >
        <div>
          <h1
            className="text-light text-wrap text-center ps-5 pe-5"
            style={{
              fontFamily: "Inter",
              fontWeight: "700px",
              fontSize: "66px",
              lineHeight: "71.54px"
            }}
          >
            Fast, Reliable & Quality <br /> Dispatch Service
          </h1>
          <p className="text-light">Send. Track. Receive.</p>
          <div
            className="d-flex justify-content-center mt-4"
            style={{
              fontFamily: "Inter"
            }}
          >
            <Link
              to="/customerSignUp"
              className="btn btn-warning me-2 fw-medium"
            >
              Register as a Customer
            </Link>
            <Link to="/riderSignUp" className="btn btn-outline-light fw-medium">
              Register as a Rider
            </Link>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="container mb-5">
        <div className="container text-center">
          <h1
            className="text-center p-3"
            style={{
              color: "#FB8500",
              fontFamily: "Inter",
              fontWeight: "700px"
            }}
          >
            Top Notch Services
          </h1>
          <p className="text-wrap">
            Quickly integrate powerful solutions that give you more flexibility
            and control over your parcel shipping and logistics processes.
          </p>
          <div className="row mt-5">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="col-md-4 border d-flex align-items-center"
              >
                <div className="service-item">
                  <img
                    src={service.icon}
                    alt="Service Icon"
                    className="service-icon"
                  />
                  <p className="service-description fw-bold">
                    {service.description}
                  </p>
                  <p className="service-details ">{service.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section
        style={{
          background: "rgba(0, 0, 0, 0.04)",
          padding: "50px 0"
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* First Div */}
            <div className="col-md-6">
              <img src={bgImage2} alt="bg-img" className="img-fluid" />
            </div>

            {/* Second Div */}
            <div className="col-md-6 p-4">
              <div>
                <h1
                  style={{
                    color: "#FB8500",
                    fontFamily: "Inter",
                    fontWeight: "700px"
                  }}
                >
                  Quality Riders & Partners Ready to Deliver
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Convallis volutpat tortor ultricies tincidunt magna. Faucibus
                  tempus pretium sed enim integer at aliquet a. Semper vel id
                  lectus quis vitae, velit est. Orci mi sed dui viverra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section */}
      <section className="container-fluid bg-light py-5">
        <div className="container">
          <h1
            className="text-center"
            style={{
              color: "#FB8500",
              fontFamily: "Inter",
              fontWeight: "700px"
            }}
          >
            What Our Clients Say About Us
          </h1>
          <div className="row mt-5">
            {customerReviews.map((review) => (
              <div
                key={review.id}
                className="col-md-4 mb-4 border justify-content-between"
              >
                <div className="customer-review">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="rounded-circle mx-auto d-block mt-3"
                  />
                  <p className="mt-3">{review.review}</p>
                  <div className="d-flex justify-content-between">
                    <p className="fw-bold">{review.name}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
