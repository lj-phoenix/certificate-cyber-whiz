import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import logo from "../logo.svg";
import "../App.scss";
import { printDiv } from "../helper/util";

import certificate1st from "../media/1st_u.svg";
import certificate2nd from "../media/2nd_u.svg";
import certificate3rd from "../media/3rd_u.svg";
import certificateCo from "../media/co2_u.svg";
import certificateParticipant from "../media/participants_u.svg";
import certificateMentor from "../media/mentor_u.svg";

import { students } from "../students";

function Certificate() {
  const { id } = useParams();
  const htmlRef = useRef(null);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    type: "",
    bg: "",
  });
  const [student] = useState(students.find((student) => !!student.isActive && student.id == id));
  const [HtmlStringVerify, setHtmlStringVerify] = useState(null);

  function capitalize(input) {
    return input
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  }

  function certificateApperication(type) {
    switch (type) {
      case `1st`:
        return `For your exceptional performance and for securing <b>1st</b> rank in the event <b>Cyber Whiz</b> `;
      case `2nd`:
        return `For your exceptional performance and for securing <b>2nd</b> rank in the event <b>Cyber Whiz</b> `;
      case `3rd`:
        return `For your exceptional performance and for securing <b>3rd</b> rank in the event <b>Cyber Whiz</b> `;
      case `mentor`:
        return `For their active mentorship during the event <b>Cyber Whiz</b> organised by <b>LJ Phoenix Club</b>. `;
      case `co-ordinator`:
        return `For actively coordinating and managing the event <b>Cyber Whiz</b> organised by <b>LJ Phoenix Club</b>. `;
      case `participant`:
        return `For their active participation and commitment to the event <b>Cyber Whiz</b> along with performing mini cyber hacks`;
      default:
        return "";
    }
  }
  function certificateSkillEarned(type) {
    switch (type) {
      case `1st`:
        return `The participant was skilled in <b>Computer Architecture, Computer Networks, Cyber Security</b>`;
      case `2nd`:
        return `The participant was skilled in <b>Computer Architecture, Computer Networks, Cyber Security</b>`;
      case `3rd`:
        return `The participant was skilled in <b>Computer Architecture, Computer Networks, Cyber Security</b>`;
      case `mentor`:
        return `We are really thankful for your lasting efforts and commitment that made this event a super success.`;
      case `co-ordinator`:
        return `We are really thankful for your support and presence that made this event a super success.`;
      case `participant`:
        return `Skills obtained: <b>Computer Architecture, Computer Networks, Cyber Security</b>`;
      default:
        return "";
    }
  }

  function certificateHeader(type) {
    switch (type) {
      case `1st`:
        return `Excellence`;
      case `2nd`:
        return `Excellence`;
      case `3rd`:
        return `Excellence`;
      case `mentor`:
        return `Mentorship`;
      case `co-ordinator`:
        return `Recognition`;
      default:
        return "APPRECIATION";
    }
  }

  useEffect(() => {
    setHtmlStringVerify(htmlRef.current.innerText);
    setInfo({
      certifcateHonoured: "We are honoured to present this certificate to",
      certificateApperication: certificateApperication(student.type),
      certificateSkillEarned: certificateSkillEarned(student.type),
      name: student.name,
      email: student.email,
      type: student.type,
      bg:
        student.type === "1st"
          ? certificate1st
          : student.type === "2nd"
          ? certificate2nd
          : student.type === "3rd"
          ? certificate3rd
          : student.type === "mentor"
          ? certificateMentor
          : student.type === "participant"
          ? certificateParticipant
          : student.type === "co-ordinator"
          ? certificateCo
          : "",
    });
  }, [student]);

  useEffect(() => {
    setHtmlStringVerify(htmlRef.current.innerText);
  }, [info]);

  return (
    <div
      ref={htmlRef}
      className="certificate__container"
      id="certificate-web-wonder"
    >
      <div className="certificate__wrap">
        <div
          className="certificate__print"
          onClick={() => {
            if (HtmlStringVerify == htmlRef.current.innerText) {
              printDiv(
                "certificate-web-wonder",
                "certificate_" + info.name.toLowerCase().replaceAll(" ", "_")
              );
            } else {
              window.alert("Sorry Buddy, This trick is not work 😁😁");
            }
          }}
        >
          Print
        </div>
        <div className="certificate_link">
          Valid Certificate Link <br />
          <a
            target={"_blank"}
            href={window.location.href}
            link={window.location.href}
          >
            {window.location.href
              .replace("https://", "")
              .replace("http://", "")}
          </a>
        </div>
        <img className="certificate__bg" src={info.bg} />
        <div className="certificate__content">
          <div className="certficate__content__badge">
            {/* <div className="badge">
              <img className="badge__2020-awards" src={bgBage} />
            </div> */}
          </div>
          <div className="certificate__content__text">
            <div className="certificate__apperication">
              <div className="certificate__apperication__title">
                Certificate <br />
                <span className="certificate__apperication__title__light">
                  {" "}
                  of {certificateHeader(student.type)}{" "}
                </span>
              </div>
            </div>
            <div className="certificate__info">
              {/* <div className="info-text" style={{
                // paddingTop: "20px",
              }}>WEB WONDERS WORKSHOP</div> */}
              <div className="info-text">{info.certifcateHonoured}</div>
              <div className="info-person">{capitalize(info.name)}</div>
              <div
                className="info-description"
                dangerouslySetInnerHTML={{
                  __html: info.certificateApperication,
                }}
              ></div>
              <div
                className="info-description"
                style={{
                  marginTop: "20rem",
                }}
                dangerouslySetInnerHTML={{
                  __html: info.certificateSkillEarned,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
