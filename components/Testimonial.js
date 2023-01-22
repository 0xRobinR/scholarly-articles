import styles from "../styles/modules/Testimonial.module.scss";
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";

const Testimonial = () => {
  // slider options
  var settings = {
    arrows: false,
    dots: true,
    dotsClass: `${styles.dots}`,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
    centerMode: true,
    className: `${styles.slider}`,
  };

  // client information
  const clients = [
    {
      image: "/client-1.jpg",
      name: "william liam",
      feedback:
        "alex smith is a professional and loves web designs and coding. his products are high quality with high performance.",
    },
    {
      image: "/client-2.jpg",
      name: "william liam",
      feedback:
        "alex smith is a professional and loves web designs and coding. his products are high quality with high performance.",
    },
    {
      image: "/client-3.jpg",
      name: "william liam",
      feedback:
        "alex smith is a professional and loves web designs and coding. his products are high quality with high performance.",
    },
  ];

  return (
    <div className={styles.testimonial}>
      <div className="container">
        <Slider {...settings}>
          {/* map clients information */}
          {clients.map((client) => (
            <div key={client.image}>
              <div className={styles.box}>
                <div className={styles.imageContainer}>
                  <img src={client.image} alt="client" />
                </div>
                <h4 className="mt-3 mb-4">{client.name}</h4>
                <p className="mb-0">{client.feedback}</p>
                <div className={styles.quoteRight}>
                  <FaQuoteRight />
                </div>
                <div className={styles.quoteLeft}>
                  <FaQuoteLeft />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
