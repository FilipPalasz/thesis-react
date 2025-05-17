import React, { useState } from "react";
import "./AssignmentForm.css";
import logo from "./hyflogo.svg"; //import everything (css, logo svg)

export default function AssignmentForm() {
  const [links, setLinks] = useState([{ url: "", title: "" }]);
  const [submitted, setSubmitted] = useState(false); //variable if the form has been submitted

  const handleChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks); //handling changes to input fields
  };

  const addLink = () => {
    setLinks([...links, { url: "", title: "" }]); //adding a new empty input field
  };

  const removeLink = () => {
    if (links.length > 1) {
      setLinks(links.slice(0, -1));   //removing input fields
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Submitted Links:", links); //sbumitting the form
  };

  return (
    <div className="container">
      {/* adding the top nav */}
      <header className="header">
        <img src={logo} alt="HackYourFuture Logo" className="logo-img" />
        <nav className="nav">
          <a href="#">APPLY</a>
          <a href="#">VOLUNTEER</a>
          <a href="#">ABOUT</a>
          <a href="#" className="support">SUPPORT</a>
        </nav>
      </header>

      {/* adding sub header (all assignments and log out) */}
      <div className="sub-header adjusted-sub-header">
        <div className="left-sub">
          <button className="back-button">📄 All Assignments</button>
        </div>
        <div className="right-sub">
          <div className="user-info">
            <span>Signed in as - Amina Rahimi</span>
            <button className="logout-button">← Log Out</button>
          </div>
        </div>
      </div>

      {/* adding main section (the blue background) */}
      <div className="main-section">
        <h1 className="title large">
          Homework assignment, React 1/4<br />
          <span className="title deadline-inline">Deadline: May. 03, 12:00</span>
        </h1>
        <p className="week">Week 18</p>
        <p><a href="#">React 2</a></p>
      </div>

      {/* the actual form section */}
      <form onSubmit={handleSubmit} className="form-section">
        <div className="field-note"><span className="required">*</span> - field required</div>
        {links.map((link, index) => {
          return (
            <div key={index} className="inputs-row">
              <div className="input-group">
                <label><span className="required">*</span> URL</label>
                <input
                  type="text"
                  placeholder="Enter URL/Link"
                  value={link.url}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                  className={link.url.trim() !== "" ? "valid-input" : ""}
                />
              </div>
              <div className="input-group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Add Title to URL/Link"
                  value={link.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className={link.title.trim() !== "" ? "valid-input" : ""}
                />
              </div>
            </div>
          );
        })}

        {/* adding and removing links */}
        <div className="link-controls">
          <div className="add-link" onClick={addLink}>+ add additional link</div>
          {links.length > 1 && (
            <div className="remove-link" onClick={removeLink}>- remove additional link</div>
          )}
        </div>

        {/* bottom section with status and submit button */}
        <div className="bottom-row">
          <div className={`status ${submitted ? "pending" : "unsubmitted"}`}>
            Review status:<br />
            <span>{submitted ? "Review Pending" : "Unsubmitted"}</span>
          </div>

          <button type="submit" className="submit-btn">Submit →</button>
        </div>
      </form>
    </div>
  );
}
