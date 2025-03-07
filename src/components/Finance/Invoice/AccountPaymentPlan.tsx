import CrossArrow from "../../Button/CrossArrow";
import { Link } from "react-router-dom";
import { ButtonPrimary } from "../../Button/ButtonPrimary";

const AccountPaymentPlan = () => {
  return (
    <>
      <div className="w-auto h-screen">
        {/* first section */}
        <div className="">
          <span className="flex w-[98%] p-4 items-center">
            <CrossArrow className="text-2xl mr-4" to="" onClick={() => {}} />
          </span>
        </div>
        {/* second section */}
        <div className="flex items-center   w-[250px] md:w-full h-[72px]">
          <h1 className="text-[28px] ml-4 font-semibold font-poppins">Review your payment </h1>
        </div>
        {/* third section */}

        {/* fifth section */}
        <div className="w-full h-[195px]  mt-8 flex justify-center pl-1.5 pr-1.5">
          <div className="h-[195px] w-[96%] bg-[#F2F4F7] rounded-2xl flex justify-center flex-col">
            <div className="h-[195px] w-[96%] flex justify-center mt-2">
              {/* red circle section */}
              <div className="flex justify-between w-[94%] items-center  ">
                <div className="flex justify-between items-center   h-[60px] space-x-1 ">
                  <div className="p-2 h-11 w-11 rounded-full mr-2 flex items-center justify-center bg-[#FFDEDB] text-white font-semibold"></div>
                  <span className="">
                    <h1 className="font-poppins font-semibold text-sm">Account balance</h1>
                  </span>
                </div>
                <span className=" flex items-center ml-10">
                  <h1 className="font-semibold font-poppins  text-sm">1,460,000रु</h1>
                </span>
              </div>
            </div>
            {/* another */}
            <div className="flex w-full h-[80%] justify-center  mb-2 flex-col">
              <div className="w-full h-[36px] flex justify-center mt-4 ">
                <span className="flex justify-between items-center h-[44px]  w-[92%]  border-t-2 border-dashed border-[#D0D5DD]">
                  <h6 className=" text-secondaryColorTextBtn font-normal text-sm font-poppins">To be used</h6>
                  <h2 className=" text-sm font-poppins font-semibold">200रु</h2>
                </span>
              </div>
              <div className="w-full h-[44px] flex justify-center mt-4">
                <span className="flex justify-between items-center h-[44px]  w-[92%]  border-t-2 border-dashed border-[#D0D5DD]">
                  <h6 className=" text-secondaryColorTextBtn font-normal text-sm font-poppins">
                    After payment balance
                  </h6>
                  <h2 className=" text-sm font-poppins font-semibold">200रु</h2>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* sixth section */}

        {/* last section button */}
        <div className="fixed bottom-0 left-0 right-0 p-5">
          <Link to="/">
            <ButtonPrimary className="w-full" size="large" disabled={false} onClick={() => {}}>
              {"Pay now "}
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AccountPaymentPlan;
