import DoctorSearch from "../components/DoctorSearch";
import Navbar from "@/app/components/navbar";

const DoctorAppointmentBooking = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-32">
        <DoctorSearch />
      </div>
    </div>
  );
};

export default DoctorAppointmentBooking;
