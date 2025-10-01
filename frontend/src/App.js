import logo from "./logo.svg";
import { Router, Route, Routes } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CompanyPolicyPage from "./pages/CompanyPolicyPage";
import BlogPage from "./pages/BlogPage";
import WhereToBuyPage from "./pages/WhereToBuy";
import Careers from "./pages/Careers";
import NotFoundPage from "./components/Error/Error404";
import CategoryACP from "./components/Category/CategoryAcp";
import CategoryLaminates from "./components/Category/CategoryLaminates";
import CategoryPvc from "./components/Category/CategoryPvc";
import CategoryPlywood from "./components/Category/CategoryPlywood";
import CategoryAluminium from "./components/Category/CategoryAluminium";
import CategoryMdf from "./components/Category/CategoryMdf";
import CSRPage from "./components/Media/Csr";
import CoveragesPage from "./components/Media/Coverages";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/company-policy" element={<CompanyPolicyPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/where-to-buy" element={<WhereToBuyPage />} />

        <Route path="*" element={<NotFoundPage />} />
        <Route path="/acp" element={<CategoryACP />} />
        <Route path="/laminates" element={<CategoryLaminates />} />
        <Route path="/pvc" element={<CategoryPvc />} />
        <Route path="/plywood" element={<CategoryPlywood />} />
        <Route path="/aluminium" element={<CategoryAluminium />} />
        <Route path="/mdf" element={<CategoryMdf />} />

        <Route path="/csr" element={<CSRPage />} />
        <Route path="/coverages" element={<CoveragesPage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
