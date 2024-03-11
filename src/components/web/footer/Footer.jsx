import "@fortawesome/fontawesome-free/css/all.css";

import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-center text-lg-start text-white">
      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(43, 48, 53, 1)" }}
      >
        © 2024 Copyright :
        <Link className="text-white" to={"/"}>
          A-shop.com
        </Link>
      </div>
      {/* Copyright */}
    </footer>
  );
}
