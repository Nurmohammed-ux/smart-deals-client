import { CiFacebook, CiLinkedin, CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-[#001931] text-white">
      <footer className="max-w-7xl mx-auto pt-20 pb-10 px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-16 gap-y-12">
        {/* Branding Section (Spans 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-4">
          <Link to={"/"} className="text-2xl font-bold flex items-center">
            Smart
            <span className="text-transparent bg-clip-text text-gradient">
              Deals
            </span>
          </Link>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            Your trusted marketplace for authentic local products. Discover the
            best deals from across Bangladesh.
          </p>
        </div>

        {/* Links Sections */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/allProducts" className="hover:text-white transition">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white transition">
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Categories</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Living</li>
            <li>Groceries</li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Support</h4>
          <div className="text-gray-400 space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <MdOutlineEmail className="text-white shrink-0" />
              support@smartdeals.com
            </p>
            <p className="flex items-center gap-1">
              <IoCallOutline className="text-white shrink-0" />
              +880 123 456 789
            </p>
            <p className="flex items-center gap-2">
              <CiLocationOn className="text-white shrink-0" />
              123 Commerce Street, Dhaka, Bangladesh
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:ml-6">
          <h4 className="text-lg font-semibold">Social Links</h4>
          <div className="flex gap-2">
            {[
              { icon: RiTwitterXFill, color: "text-black" },
              { icon: CiLinkedin, color: "text-blue-700" },
              { icon: CiFacebook, color: "text-blue-600" },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-all transform hover:scale-105"
              >
                <item.icon size={20} className={item.color} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <div className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
        © 2026 SmartDeals. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
