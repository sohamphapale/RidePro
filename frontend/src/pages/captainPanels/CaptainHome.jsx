import { Link } from "react-router-dom";
import CaptainDetails from "./components/CaptainDetails";

const CaptainHome = () => {
  return (
    <div className="h-screen relative overflow-hidden">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-screen w-screen ">
        {/* image for temporary */}
        <img className="h-full w-full object-cover" src="mapimg.gif" />
      </div>
      {/* captain Details */}
      <CaptainDetails />
    </div>
  );
};

export default CaptainHome;
