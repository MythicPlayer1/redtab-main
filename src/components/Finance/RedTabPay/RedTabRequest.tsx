import { ButtonPrimary } from "../../Button/ButtonPrimary";
import ThankYouCard from "../../../assets/ThankYou.jpeg";
import { Link } from "react-router-dom";
const RedTabRequest = () => {
  return (
    <>
      <div className="w-full h-screen">
        <div className="flex justify-center flex-col items-center  h-[90%] space-y-4">
          <div className="h-[114px] w-[114px] ">
            <img src={ThankYouCard} className="rounded-full" alt="thank you!!" />
          </div>
          <span>
            <h4 className="text-xl font-bold  font-poppins">Thanks,we are reviewing</h4>
            <h4 className="text-xl text-center font-bold  font-poppins">your request</h4>
          </span>
        </div>
        {/* button section */}
        <div className="fixed bottom-0 left-0 right-0 p-5">
          {/* add back url link to back to home */}
          <Link to="/home">
            <ButtonPrimary className="w-full" size="large" disabled={false} onClick={() => {}}>
              {"Back to home"}
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RedTabRequest;
