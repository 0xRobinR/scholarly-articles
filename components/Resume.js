import styles from "../styles/modules/Resume.module.scss";
import { FaGraduationCap, FaClock } from "react-icons/fa";
const Resume = () => {
  // education information
  const eduDetails = [
    {
      name: "bachelor of computer science",
      place: "new york university",
      date: "2010 - 2014",
    },
    {
      name: "master of computer science",
      place: "new york university",
      date: "2014 - 2016",
    },
    {
      name: "PHD of computer science",
      place: "new york university",
      date: "2016 - 2018",
    },
  ];

  //experience information
  const exDetails = [
    {
      name: "junior frontend developer",
      place: "facebook",
      date: "2018 - 2019",
    },
    {
      name: "senior frontend developer",
      place: "google",
      date: "2019 - 2020",
    },
    {
      name: "lead frontend developer",
      place: "uber",
      date: "2020 - 2022",
    },
  ];

  return (
    <div className={styles.resume}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-6">
            <h3 className={styles.title}>
              <span className={styles.titleIcon}>
                <FaGraduationCap />
              </span>
              <span>education</span>
            </h3>
            <div className="row mt-4">
              {/* map education information */}
              {eduDetails.map((eduDetail) => (
                <div className="col-lg-4" key={eduDetail.name}>
                  <div className={styles.box}>
                    <h4 className={`${styles.name} mb-3`}>{eduDetail.name}</h4>
                    <h6 className="mb-4">{eduDetail.place}</h6>
                    <p className={`${styles.date}`}>{eduDetail.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-12 col-md-6 mt-lg-5 mt-md-0 mt-5">
            <h3 className={styles.title}>
              <span className={styles.titleIcon}>
                <FaClock />
              </span>
              <span>experience</span>
            </h3>
            <div className="row mt-4">
              {/* map experience information */}
              {exDetails.map((exDetail) => (
                <div className="col-lg-4" key={exDetail.name}>
                  <div className={styles.box}>
                    <h4 className={`${styles.name} mb-3`}>{exDetail.name}</h4>
                    <h6 className="mb-4">{exDetail.place}</h6>
                    <p className={`${styles.date}`}>{exDetail.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
