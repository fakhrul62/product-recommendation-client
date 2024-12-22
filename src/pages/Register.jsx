import React, { useContext } from "react";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  ///
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    if (password.length < 6) {
      Swal.fire({
        title: "Pass should be at least 6 characters!!!",
        icon: "error",
      });
      return;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (!hasUpperCase || !hasLowerCase) {
      Swal.fire({
        title:
          "Password must include at least one uppercase and one lowercase letter!!!",
        icon: "error",
      });
      return;
    }

    createUser(email, password)
      .then(async (result) => {
        const user = result.user;

        try {
          // Step 1: Update Firebase Profile
          await updateProfile(user, { displayName: name, photoURL });

          // Step 2: Save Updated User to MongoDB
          const newUser = { name, email, photoURL, password };
          const response = await fetch(
            "http://localhost:5000/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to save user to MongoDB");
          }

          const responseData = await response.json();
          console.log("User saved to MongoDB:", responseData);

          // Step 3: Update Context (if required)
          const updatedUser = { ...user, displayName: name, photoURL };
          setUser(updatedUser); // Use AuthContext's setUser to reflect changes immediately

          Swal.fire({
            title: "User Created Successfully!",
            icon: "success",
          });

          // Reset the form after success
          form.reset();
        } catch (error) {
          console.error("Error during sign-up flow:", error.message);
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      });
  };
  return (
    <div>
      <div className="w-6/12 mx-auto">
        <h2 className="text-center font-bold text-4xl my-5 font-logo">
          Sign Up now!
        </h2>
        <div className="mt-5 mb-20">
          <form className="card-body font-body" onSubmit={handleSignUp}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Your name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="text"
                placeholder="Valid Photo URL (URL should end with .jpg/.jpeg/.png)"
                name="photoURL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn  bg-white text-black hover:bg-mongo border-black">
                Sign Up
              </button>
            </div>
          </form>
          <h3 className="font-body text-center text-xl">
            Already have an account?{" "}
            <Link to="/login" className="text-mongo">
              Log in Now
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Register;
