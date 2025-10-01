import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PrivacyPolicyPage = ({
  title = "Privacy Policy",
  content = `<p class=""  data-aos="fade-up" data-aos-duration="1000">This Privacy policy is subject to the terms of the Site Policy (User agreement) of Virgo Laminates. This policy is effective from the date and time a user registers with Virgo Laminates by filling up the Registration form and accepting the terms and conditions laid out in the Site Policy.</p>

<p class=""  data-aos="fade-up" data-aos-duration="1000">In order to provide a personalized browsing experience, Virgo Laminates may collect personal information from you. Additionally some of our websites may require you to complete a registration form or seek some information from you. When you let us have your preferences, we will be able to deliver or allow you to access the most relevant information that meets your end.</p>

<p class=""  data-aos="fade-up" data-aos-duration="1000">To extend this personalized experience Virgo Laminates may track the IP address of a user's computer and save certain information on your system in the form of cookies. A user has the option of accepting or declining the cookies of this website by changing the settings of your browser.</p>

<p class=""  data-aos="fade-up" data-aos-duration="1000">The personal information provided by the users to Virgo Laminates will not be provided to third parties. without previous consent of the user concerned. Information of a general nature may however be revealed to external parties</p>

<p class=""  data-aos="fade-up" data-aos-duration="1000">Every effort will be made to keep the information provided by users in a safe manner, the information will be displayed on the website will be done so only after obtaining consent from the users. Any user browsing the site generally is not required to disclose his identity or provide any information about him/her, it is only at the time of registration you will be required to furnish the details in the registration form.</p>

<p class=""  data-aos="fade-up" data-aos-duration="1000">A full user always has the option of not providing the information which is not mandatory. You are solely responsible for maintaining confidentiality of the User password and user identification and all activities and transmission performed by the User through his user identification and shall be solely responsible for carrying out any online or off-line transaction involving credit cards / debit cards or such other forms of instruments or documents for making such transactions and Virgo Laminates assumes no responsibility or liability for their improper use of information relating to such usage of credit cards / debit cards used by the subscriber online / off-line.</p>

<p class=""  data-aos="fade-up" data-aos-duration="1000">You agree that Virgo Laminates may use personal information about you to improve its marketing and promotional efforts, to analyze site usage, improve the Site's content and product offerings, and customize the Site's content, layout, and services. These uses improve the Site and better tailor it to meet your needs, so as to provide you with a smooth, efficient, safe and customized experience while using the Site.</p>

<p class=""  data-aos="fade-up" data-aos-duration="1000">You agree that Virgo Laminates may use your personal information to contact you and deliver information to you that, in some cases, are targeted to your interests, such as targeted banner advertisements, administrative notices, product offerings, and communications relevant to your use of the Site. By accepting the User Agreement and Privacy Policy, you expressly agree to receive this information. If you do not wish to receive these communications, we encourage you to opt out of the receipt of certain communications in your profile. You may make changes to your profile at any time. It is the belief of Virgo Laminates that privacy of a person can be best guaranteed by working in conjunction with the Law enforcement authorities.</p>

<p class=""  data-aos="fade-up" data-aos-duration="1000">All Virgo Laminates websites including Virgo Laminates fully comply with all Indian Laws applicable. Virgo Laminates has always cooperated with all law enforcement inquires. Virgo Laminates may disclose all or part of your personal details in response to a request from the law enforcement authorities or in a case of bonafide requirement to prevent an imminent breach of the law.</p>`,
  thumbnail = "/assets/images/privacy-banner.jpg",
  breadcrumbs = ["Home", "Privacy Policy"],
}) => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <main className="page-wrapper privacy-page">
      {/* BANNER */}
      <section className="card py-0">
        <img
          src={thumbnail}
          alt="Privacy Policy Banner"
          className="card-img-top img-fluid w-100 p-0"
        />
      </section>

      {/* BREADCRUMB */}
      <section className="pt-3 pb-0 breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="breadcrumb">
              <div
                className="breadcrumbs"
                typeof="BreadcrumbList"
                vocab="https://schema.org/"
              >
                {breadcrumbs.map((crumb, i) => (
                  <span key={i}>
                    {crumb}
                    {i < breadcrumbs.length - 1 && " / "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pt-0">
        <div className="container">
          <div className="col-md-9 col-lg-8 mx-auto text-center">
            <h1
              className="mb-3 text-uppercase main-heading"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {title}
            </h1>
          </div>
          <div className="row" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
