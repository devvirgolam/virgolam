import logo from "./logo.svg";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Sidebar from "./components/Common/Sidebar";
import Router from "./router/Router";
function App() {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  return (
    <div class="main-wrapper">
      <Header />
      <Sidebar />

      <div class="page-wrapper">
        <Router />
      </div>
      <Footer />
    </div>
  );
}

export default App;
