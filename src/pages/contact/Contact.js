import React, { useRef } from "react";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { GoLocation } from "react-icons/go";

import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `${process.env.REACT_APP_EMAILJS_SERVICE_ID}`,
        `${process.env.REACT_APP_EMAILJS_TEMPLATE_ID}`,
        form.current,
        `${process.env.REACT_APP_EMAILJS_OTHER_ID}`
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="text"
                name="user_email"
                placeholder="Your active Email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea cols="30" rows="10" name="message"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+256 704 690 012</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>bravolsoftwaresolutions@gmail.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p> Kampala, Uganda </p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@BravolSoft.com</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
