import { Outlet } from "react-router-dom";
import GuestHeader from "./GuestHeader";
import GuestFooter from "./GuestFooter";

const GuestLayout = () => {
  return (
    <>
      <div style={{position:"fixed",top:"0",width:"100%",zIndex:"100"}}><GuestHeader /></div>
      <div style={{minHeight:"100vh",marginTop:"80px"}}><Outlet /></div>
      <GuestFooter />
    </>
  );
};

export default GuestLayout;