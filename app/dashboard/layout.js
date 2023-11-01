import React from "react";
import NavBar from "components/NavBar";
const DashBoardLayout = async ({ children }) => {
  // if (!getSession()) return redirect("/signin");
  return (
    <div className="flex">
      <NavBar className="w-2/12" />
      {children}
    </div>
  );
};

export default DashBoardLayout;
