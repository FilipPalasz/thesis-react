// AssignmentForm.js
import React, { useState } from "react";
import "./AssignmentForm.css";
import logo from "./hyflogo.svg";

export default function AssignmentForm() {
  const [links, setLinks] = useState([{ url: "", title: "", valid: false }]);
  const [submitted, setSubmitted] = useState(false);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    newLinks[index].valid = validateUrl(newLinks[index].url) && newLinks[index].title.trim() !== "";
    setLinks(newLinks);
  };

  const addLink = () => {
    setLinks([...links, { url: "", title: "", valid: false }]);
  };

  const removeLink = () => {
    if (links.length > 1) {
      setLinks(links.slice(0, -1));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Submitted Links:", links);
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="HackYourFuture Logo" className="logo-img" />
        <nav className="nav">
          <a href="#">APPLY</a>
          <a href="#">VOLUNTEER</a>
          <a href="#">ABOUT</a>
          <a href="#" className="support">SUPPORT</a>
        </nav>
      </header>

      <div className="sub-header adjusted-sub-header">
        <div className="left-sub">
          <button className="back-button">📄 All Assignments</button>
        </div>
        <div className="right-sub">
          <div className="user-info">
            <span>Signed in as – Amina Rahimi</span>
            <button className="logout-button">← Log Out</button>
          </div>
        </div>
      </div>

      <div className="main-section">
        <h1 className="title large">Homework assignment, React 1/4</h1>
        <h1 className="title">Deadline: May. 03, 12:00</h1>
        <p className="week">Week 18</p>
        <p><a href="#">React 2</a></p>
      </div>

      <form onSubmit={handleSubmit} className="form-section">
        {links.map((link, index) => (
          <div key={index} className="inputs-row">
            <div className="input-group">
              <label>* URL</label>
              <input
                type="text"
                placeholder="Enter URL/Link"
                value={link.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
                required
                className={link.valid ? "valid-input" : ""}
              />
            </div>
            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Add Title to URL/Link"
                value={link.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className={link.valid ? "valid-input" : ""}
              />
            </div>
          </div>
        ))}

        <div className="link-controls">
          <div className="add-link" onClick={addLink}>+ add additional link</div>
          {links.length > 1 && (
            <div className="remove-link" onClick={removeLink}>- remove additional link</div>
          )}
        </div>

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
