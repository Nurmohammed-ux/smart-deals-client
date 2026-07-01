import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInWithGoogle, signInUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => console.log(error.message));
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        // console.log(result);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="hero bg-base-200 pt-30 pb-80">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
        <div className="card-body p-12">
          <form onSubmit={handleLogin}>
            <h1 className="text-4xl font-bold text-center">Login!</h1>
            <p className="text-center my-4 text-base">
              Don't have an account?{" "}
              <Link to={"/register"} className="text-gradient font-medium">Register Now</Link>
            </p>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full"
                name="email"
                placeholder="Email"
              />
              <div className="form-control w-full relative">
                <label className="label mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"} // Toggle type
                  className="input input-bordered w-full pr-10" // Add padding on the right for the icon
                  name="password"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              <button className="btn bg-primary-gradient text-base text-white font-semibold mt-4">
                Login
              </button>
            </fieldset>
            <div className="flex items-center gap-4 my-6 justify-between text-gray-400">
              <div className="h-px w-full bg-gray-400 grow"></div>
              <p>Or</p>
              <div className="h-px w-full bg-gray-400 grow"></div>
            </div>
          </form>
          {/* Google */}
          <button
            onClick={handleSignInWithGoogle}
            className="btn bg-white w-full text-black text-base font-medium border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="18"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
