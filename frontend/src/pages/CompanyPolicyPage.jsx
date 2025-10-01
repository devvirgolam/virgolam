import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import "../styles/companypolicy.css";

const CompanyPolicyPage = () => {
  // Simulated WordPress data
  const siteUrl = "https://virgolam.com";
  const templateDirectoryUri = "/wp-content/themes/virgo";

  // Policy data
  const policies = [
    {
      title: "NRC Policy",
      url: `${siteUrl}/wp-content/uploads/2025/08/NRC-Policy.pdf`,
    },
    {
      title: "Whistle Blower Policy",
      url: `${siteUrl}/wp-content/uploads/2025/08/Whistle-Blower-Policy.pdf`,
    },
    {
      title: "Risk Management Policy",
      url: `${siteUrl}/wp-content/uploads/2025/08/Risk-management-policy.pdf`,
    },
    {
      title: "Internal Financial Policy",
      url: `${siteUrl}/wp-content/uploads/2025/08/Internal-financial-policy.pdf`,
    },
    {
      title: "CSR Policy",
      url: `${siteUrl}/wp-content/uploads/2025/08/CSR-policy.pdf`,
    },
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <main className="page-wrapper company-policy-page">
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-8 text-center">
              <h1
                className="main-heading"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                Company Policies - Virgo Laminates Ltd
              </h1>
            </div>
          </div>
          <div className="row">
            {policies.map((policy, index) => (
              <div key={index} className="col-12 col-md-4 mb-4">
                <a
                  href={policy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card h-100 text-decoration-none"
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">{policy.title}</h5>
                    <p className="card-text">Download PDF</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Assume Newsletter component */}
      {/* <Newsletter /> */}
    </main>
  );
};

export default CompanyPolicyPage;
