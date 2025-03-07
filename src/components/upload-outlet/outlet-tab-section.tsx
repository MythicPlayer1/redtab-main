import { useState, useEffect, useRef } from "react";
import BasicInfoDetail from "./basic-info";
import OwnerDetail from "./owner-details";
import OutletDetail from "./outlet-details";

const OutLetUploadTabSection = () => {
  const [activeTab, setActiveTab] = useState<string>("Basic Info");

  // Refs for individual components
  const tabPanelsRef = useRef<HTMLDivElement | null>(null);
  const basicInfoRef = useRef<HTMLDivElement | null>(null);
  const outletDetailRef = useRef<HTMLDivElement | null>(null);
  const ownerDetailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {

      if (tabPanelsRef.current && basicInfoRef.current && outletDetailRef.current && ownerDetailRef.current) {
        const scrollPosition = tabPanelsRef.current.scrollTop + 111;
        const basicInfoTop = basicInfoRef.current.offsetTop;
        const outletDetailTop = outletDetailRef.current.offsetTop;
        const ownerDetailTop = ownerDetailRef.current.offsetTop;

        // Dynamically set activeTab based on the scroll position
        if (scrollPosition >= basicInfoTop && scrollPosition < outletDetailTop) {
          setActiveTab("Basic Info");
        } else if (scrollPosition >= outletDetailTop && scrollPosition < ownerDetailTop) {
          setActiveTab("Outlet Details");
        } else if (scrollPosition >= ownerDetailTop) {
          setActiveTab("Owner Details");
        }
      }
    };

    if (tabPanelsRef.current) {
      tabPanelsRef.current.addEventListener("scroll", handleScroll);
    }

    // Cleanup scroll event listener
    return () => {
      if (tabPanelsRef.current) {
        tabPanelsRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const selectedName = localStorage.getItem("selectedSection");
    if (selectedName) {
      setTimeout(() => {
        if (selectedName === "Basic Information") {
          scrollToSection(basicInfoRef as React.RefObject<HTMLDivElement>);
        } else if (selectedName === "Outlet Documents") {
          scrollToSection(outletDetailRef as React.RefObject<HTMLDivElement>);
        } else {
          scrollToSection(ownerDetailRef as React.RefObject<HTMLDivElement>);
        }
      }, 100);
    }
  }, []);

  // Scroll to the corresponding section when a tab is clicked
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (tabPanelsRef.current && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full px-4">
      <div>
        <div className="py-1 flex gap-4 font-medium text-normal text-[#667085]">
          <div
            onClick={() => {
              scrollToSection(basicInfoRef as React.RefObject<HTMLDivElement>);
            }}
            className={
              activeTab === "Basic Info"
                ? "border-b-[2px] border-b-secondaryColorText focus:outline-none text-nowrap cursor-pointer"
                    : "focus:outline-none text-nowrap cursor-pointer"
            }
          >
            Basic Info
          </div>
          <div
            onClick={() => {
              scrollToSection(outletDetailRef as React.RefObject<HTMLDivElement>);
            }}
            className={
              activeTab === "Outlet Details"
                    ? "border-b-[2px] border-b-secondaryColorText focus:outline-none text-nowrap cursor-pointer"
                    : "focus:outline-none text-nowrap cursor-pointer"
            }
          >
            Outlet Details
          </div>
          <div
            onClick={() => {
              scrollToSection(ownerDetailRef as React.RefObject<HTMLDivElement>);
            }}
            className={
              activeTab === "Owner Details"
                    ? "border-b-[2px] border-b-secondaryColorText focus:outline-none text-nowrap cursor-pointer"
                    : "focus:outline-none text-nowrap cursor-pointer"
            }
          >
            Owner Details
          </div>
        </div>
        <div ref={tabPanelsRef} className="h-[calc(100dvh-111px)] overflow-y-scroll">
          <div className="flex flex-col gap-2">
            <div ref={basicInfoRef}>
              <BasicInfoDetail />
            </div>
            <div ref={outletDetailRef}>
              <OutletDetail />
            </div>
            <div ref={ownerDetailRef}>
              <OwnerDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutLetUploadTabSection;