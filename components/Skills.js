import styles from "../styles/modules/Skills.module.scss";
const Skills = () => {
  // skills information
  const skills = [
    { percent: "22%", name: "dapp browser" },
    { percent: "9%", name: "blockchain" },
    { percent: "2%", name: "Code Lang." },
    { percent: "0.1%", name: "artificial blockchain" },
  ];

  return (
    <div className={styles.skills}>
      <div className="container">
        <div className={"text-center mb-4"}>
          <h2>Ongoing Builds.</h2>
        </div>
        <div className="row">
          {/* map skills information */}
          {skills.map((skill) => (
            <div className="col-lg-3 col-md-6 mb-5" key={skill.name}>
              <div
                className={styles.circle}
                style={{
                  background: `conic-gradient(var(--main) ${skill.percent}, var(--background) 0%)`,
                }}
              >
                <h4 className="mb-2">{skill.percent}</h4>
                <h6 className="mb-0">{skill.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
