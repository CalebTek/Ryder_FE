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
    description: "Safe and Reliable Dispatch",
    details:
      "Our platform ensures safe and reliable dispatch services. We prioritize the security of both riders and customers to provide a trusted experience."
  },
  {
    id: 2,
    icon: time_delivery,
    description: "On-Time Order Delivery",
    details:
      "We emphasize on-time delivery of orders. Riders can count on our platform to efficiently manage deliveries and meet delivery deadlines."
  },
  {
    id: 3,
    icon: shipping,
    description: "Track Orders in Real-Time",
    details:
      "Track your dispatched orders in real-time. Our advanced tracking system allows riders to monitor the progress of each delivery."
  },
  {
    id: 4,
    icon: customer_service,
    description: "Dedicated Rider Support",
    details:
      "Our customer service team is here to support our riders. If you have any questions or encounter issues during deliveries, we're just a call away."
  },
  {
    id: 5,
    icon: world,
    description: "Deliver Nationwide",
    details:
      "Join our network of riders and deliver orders nationwide. Whether it's local deliveries or long-distance hauls, we've got you covered."
  },
  {
    id: 6,
    icon: building,
    description: "Efficient Order Fulfilment",
    details:
      "Efficiently fulfill orders with our platform. We provide the tools and resources you need to streamline the dispatch process."
  }
];


// Define the customer reviews data
const customerReviews = [
  {
    id: 1,
    image: customer,
    review:
      "Exceptional Service! The riders provided outstanding delivery service, always on time and reliable. I highly recommend them.",
    name: "Jenifer Harrison",
    rating: 5
  },
  {
    id: 2,
    image: customer,
    review:
      "Great Experience! I had a positive experience with the riders. They were punctual and handled my parcels with care.",
    name: "John Smith",
    rating: 4
  },
  {
    id: 3,
    image: customer,
    review:
      "Reliable Service! The riders were dependable and provided excellent delivery service. I'm satisfied with their performance.",
    name: "Alice Johnson",
    rating: 5
  },
  {
    id: 4,
    image: customer,
    review:
      "Impressive Service! I was pleased with the riders' professionalism and timely deliveries. They exceeded my expectations.",
    name: "Jenifer Harrison",
    rating: 4
  },
  {
    id: 5,
    image: customer,
    review:
      "Good Service! The riders were efficient, and my parcels arrived in good condition. I appreciate their efforts.",
    name: "John Smith",
    rating: 4
  },
  {
    id: 6,
    image: customer,
    review:
      "Excellent Service! The riders consistently delivered my parcels promptly and professionally. I'm a satisfied customer.",
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
              to="/customer-signUp"
              className="btn btn-warning me-2 fw-medium"
            >
              Register as a Customer
            </Link>
            <Link to="/rider-signup" className="btn btn-outline-light fw-medium">
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
                  Our seasoned riders and trusted partners are here to ensure your
                  parcels reach their destination seamlessly. We prioritize efficient delivery,
                  providing you with a reliable and hassle-free experience.
                  With a commitment to excellence, we are your go-to solution for all your dispatch needs"
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
