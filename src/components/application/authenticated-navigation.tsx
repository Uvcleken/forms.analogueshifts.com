"use client";
import ApplicationLogo from "./application-logo";
import Link from "next/link";
import ProfileDropdown from "./profile-dropdown";
import AppsDropdown from "./apps-dropdown";
import { useState } from "react";
import Cookies from "js-cookie";
import IdiomProof from "./idiom-proof";
import FormFallbackLoading from "@/app/forms/components/fallback-loading";
import { errorToast } from "@/utils/toast";

function AuthenticatedNavigation({ user }: any) {
  const [logoutModal, setLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    const axios = require("axios");
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/logout";
    let config = {
      url: url,
      method: "POST",
      headers: {
        Authorization: "Bearer " + user?.token,
      },
    };
    setLoading(true);

    try {
      await axios.request(config);
      Cookies.remove("analogueshifts");
      window.location.href = "/login";
    } catch (error) {
      setLoading(false);
      errorToast("Error logging out", "There was a problem with your request.");
    }
  };

  return (
    <div className="flex justify-center pt-3 pb-20 px-3">
      <IdiomProof
        open={logoutModal}
        description="   Are you sure you want to sign out of your account? You can always
        sign in at anytime."
        title="Confirm LogOut"
        label="Log Out"
        action={() => {
          setLogoutModal(false);
          handleLogout();
        }}
        close={() => setLogoutModal(false)}
      />
      {loading && <FormFallbackLoading />}
      <nav className="backdrop-blur-lg z-40 drop-shadow-lg border border-gray-100 w-full lg:rounded-full fixed">
        <div className="w-full mx-auto px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationLogo />
                </Link>
              </div>
            </div>

            {/* Settings Dropdown */}
            <div className="flex items-center  gap-2">
              {user && (
                <ProfileDropdown
                  user={user}
                  logout={() => setLogoutModal(true)}
                />
              )}
              <AppsDropdown />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AuthenticatedNavigation;
