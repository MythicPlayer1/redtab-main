import { ProtectedRoute } from "../components/ProtectedRoute";
import { MasterHeader } from "../components/MasterHeader";
import { MasterLayout } from "../components/MasterLayout";
import ErrorBoundary from "./notfound";
import { useEffect } from "react";
import { useLoginStatusStore } from "../store/login-status-store/use-login-status-store";
import { useNavigate } from "react-router-dom";

const ContentBlock = () => {
  return (
    <div className="mt-2">
      <h3 className="px-5 py-2 text-[0.875rem] text-[#1D2939] font-bold">Hotel & resort</h3>

      <div className="overflow-auto px-5">
        <div className="flex items-center gap-4 flex-nowrap">
          {Array.from({ length: 10 }).map((_, _idx) => (
            // eslint-disable-next-line react/jsx-key
            <div className="w-[12.5rem] rounded-lg shadow-lg mb-4" key={String(_idx)}>
              <div className="w-[12.5rem] rounded-t-lg overflow-hidden">
                <img src="https://placehold.co/300x200" className="w-full" />
              </div>
              <div className="p-5">
                <div className="text-[#1D2939] text-[0.75rem]">Five guys Kiele Dom</div>
                <div className="text-[#667085] text-[0.75rem]">Bedding and clothing</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  const { isLoggedIn, merchantProfileUUID } = useLoginStatusStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && !merchantProfileUUID) {
      navigate("/kyc/select-biz-type");
    }
  }, [isLoggedIn, merchantProfileUUID]);

  return (
    <ProtectedRoute>
      <MasterLayout header={<MasterHeader />}>
        <div className="px-5 flex items-center justify-between">
          <div className="text-[#667085] text-[0.75rem] font-bold">Explore supplier in your city</div>
          <div className="flex items-center gap-3 text-lg">
            Kathmandu
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.00002 7.22721L11.3636 3.86361C11.7151 3.51214 12.2849 3.51214 12.6364 3.86361C12.9879 4.21508 12.9879 4.78493 12.6364 5.1364L8.63642 9.1364C8.28495 9.48787 7.7151 9.48787 7.36363 9.1364L3.36363 5.1364C3.01216 4.78493 3.01216 4.21508 3.36363 3.86361C3.7151 3.51214 4.28495 3.51214 4.63642 3.86361L8.00002 7.22721Z"
                fill="#EA4335"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-auto">
          <div className="py-2 whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, key) => (
              <div className="text-center inline-block ml-4 w-[4.25rem]" key={key}>
                <div>
                  <img src="https://placehold.co/300x300" className="w-[4.25rem] rounded-full" />
                </div>
                <div className="mt-2 text-[0.6875rem] font-bold">Grocery</div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-16 rounded-lg bg-secondaryColor mx-5"></div>

        <ContentBlock></ContentBlock>
        <ContentBlock></ContentBlock>
        <ContentBlock></ContentBlock>
        <ContentBlock></ContentBlock>
      </MasterLayout>
    </ProtectedRoute>
  );
};

export default Index;

export { ErrorBoundary };
