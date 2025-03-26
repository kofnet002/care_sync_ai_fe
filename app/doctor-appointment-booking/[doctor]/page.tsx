"use client";

import { useParams } from "next/navigation";
import { doctors } from "@/app/data/doctors";
import Image from "next/image";
import {
  Star,
  MapPin,
  Banknote,
  MoveRight,
  Video,
  PhoneOutgoing,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/app/components/navbar";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import EducationTimeline from "@/app/components/EducationTImeline";
import WorkExperienceTimeline from "@/app/components/WorkExperienceTimeline";
import AwardsTimeline from "@/app/components/AwardsTimeline";
import { CallModal } from "@/app/components/ui/callModal";
import { useState } from "react";

interface EducationItem {
  university: string;
  degree: string;
  period: string;
}

interface WorkExperienceItem {
  company: string;
  position: string;
  period: string;
}

interface AwardItem {
  award: string;
  period: string;
  description: string;
}

const Page = () => {
  const { doctor } = useParams();
  const [showCallModal, setShowCallModal] = useState<boolean>(false);

  const doctorData = doctors.find(
    (doc) => doc.id === parseInt(doctor as string)
  );

  const handleBookAppointment = () => {
    toast.info("Feature coming soon");
  };

  const educationHistory: EducationItem[] = [
    {
      university: "American Dental Medical University",
      degree: "BDS",
      period: "2010 - 2015",
    },
    {
      university: "American Dental Medical University",
      degree: "MDS",
      period: "2015 - 2019",
    },
  ];

  const workExperienceHistory: WorkExperienceItem[] = [
    {
      company: "Glowing Smiles Family Dental Clinic",
      position: "BDS",
      period: "2020 - Present (5 years)",
    },
    {
      company: "Dream Smile Dental Practice",
      position: "BDS",
      period: "2018 - 2020 (2 years)",
    },
  ];

  const awardsHistory: AwardItem[] = [
    {
      award: "Best Dentist Award",
      period: "2020",
      description: "Awarded for excellence in dental care",
    },
    {
      award: "Humanitarian Award",
      period: "2020",
      description: "Awarded for humanitarian work",
    },
    {
      award: "The Dental Professional of The Year Award",
      period: "2020",
      description: "The most prestigious award for dental professionals",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="mt-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="w-full md:w-48 h-48">
            <Image
              src={doctorData?.image || ""}
              alt={doctorData?.name || ""}
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {doctorData?.name}
                </h3>
                <p className="text-gray-600 text-sm">{doctorData?.title}</p>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Image
                  src={doctorData?.specializationImage || ""}
                  alt={doctorData?.specialization || ""}
                  width={20}
                  height={20}
                />
                <span className="text-blue-600 text-sm">
                  {doctorData?.specialization}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      size={16}
                      key={i}
                      className={
                        i < Math.floor(doctorData?.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600">({doctorData?.reviews})</span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin className="text-gray-500" size={16} />
                <span className="text-gray-600">{doctorData?.location}</span>
              </div>

              <div className="flex items-center gap-1">
                <Banknote className="text-gray-600" size={16} />
                <span className="text-gray-600">{doctorData?.priceRange}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 my-2">
              {doctorData?.services.map((service, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <div
                  onClick={() => setShowCallModal(true)}
                  className="border border-gray-300 rounded-full p-2 hover:cursor-pointer hover:bg-[#3e888c] transition-colors"
                >
                  {!showCallModal && (
                    <PhoneOutgoing className="hover:text-white" size={16} />
                  )}

                  {showCallModal && (
                    <CallModal
                      doctor={{
                        image: doctorData?.image || "",
                        name: doctorData?.name || "",
                      }}
                    />
                  )}
                </div>
                <div
                  onClick={() => setShowCallModal(true)}
                  className="border border-gray-300 rounded-full p-2 hover:cursor-pointer hover:bg-[#3e888c] transition-colors"
                >
                  {!showCallModal && (
                    <Video className="hover:text-white" size={16} />
                  )}

                  {showCallModal && (
                    <CallModal
                      isVideoCall
                      doctor={{
                        image: doctorData?.image || "",
                        name: doctorData?.name || "",
                      }}
                    />
                  )}
                </div>
              </div>
              <Button
                onClick={handleBookAppointment}
                className="px-6 py-2 text-white rounded-sm"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow mb-20">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start mb-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="business-hours">Business Hours</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="mb-5">
                <h1 className="text-xl font-medium mb-1">About Me</h1>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>

              <EducationTimeline educationHistory={educationHistory} />
              <WorkExperienceTimeline
                workExperienceHistory={workExperienceHistory}
              />
              <AwardsTimeline awardsHistory={awardsHistory} />

              <div className="mb-5">
                <h1 className="text-xl font-medium mb-1">Services</h1>
                <div className="flex items-center gap-5">
                  {doctorData?.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-gray-700 text-sm"
                    >
                      <MoveRight className="w-4 h-4 mr-2" />
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              <div className="">
                <h1 className="text-xl font-medium mb-1">Specialization</h1>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1 text-gray-700 text-sm">
                    <MoveRight className="w-4 h-4 mr-2" />
                    {doctorData?.specialization}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">Coming soon</TabsContent>

            <TabsContent value="business-hours">Coming soon</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Page;
