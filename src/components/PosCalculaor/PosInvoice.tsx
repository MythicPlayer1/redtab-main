import { FC } from "react";
import image from "./image 4.png"
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { UseDataForPayload } from "../../store/pos-calculator/billing";
import { UseInvoiceReviewDetailsStore } from "../../store/pos-calculator/pos-cal-store";

const PosInvoice: FC = () => {
  const { selectedPaymentMethod } = UseDataForPayload.getState();
  const { invoiceReview } = UseInvoiceReviewDetailsStore.getState();
  return (
    <>
      <div className="bg-primaryColorText flex flex-col items-center justify-center w-full pb-14 h-[100dvh]  text-center">
        <div className="flex justify-center items-center  w-full ">
          <div className="h-24 w-24 bg-secondaryColor rounded-full flex items-center justify-center relative left-16">
          </div>
          <img className="relative right-8 " src={image} alt="Logo" />
        </div>
        <div className="text-center w-full h-[44px]  text-[14px] font-poppins">
          {selectedPaymentMethod === "cash" && <p className="text-xl font-poppins font-bold">Cash Received</p>}
          {selectedPaymentMethod === "qr" && <p className="text-xl font-poppins font-bold">QR Received</p>}
          {selectedPaymentMethod === "receipt" && <p className="text-xl font-poppins font-bold">Receipt Send</p>}

          {selectedPaymentMethod === "cash" && (
            <>
              <p className="text-xl font-poppins font-bold">रु {invoiceReview?.billing_info?.gross_total}</p>
              <p>
                from <span className="font-poppins font-semibold">{invoiceReview?.buyer_name}</span>
              </p>
            </>
          )
          }
          {selectedPaymentMethod === "qr" && (
            <>
              <p className="text-xl font-poppins font-bold">रु {invoiceReview?.billing_info?.gross_total}</p>
              <p>
                from <span className="font-poppins font-semibold">{invoiceReview?.buyer_name}</span>
              </p>
            </>
          )
          }
          {selectedPaymentMethod === "receipt" && (
            <>
              {/* <p className="text-xl font-poppins font-bold">रु {invoiceReview?.total_sales}</p> */}
              <p>
                Invoice sent to <span className="font-poppins font-semibold">{invoiceReview?.buyer_name}</span>
              </p>
              <p>We will notify you when they paid.</p>
            </>
          )
          }

        </div>
        <div className=" flex flex-col items-center absolute bottom-3 w-full px-4">
          <div className="w-full py-2">
            <Link to="/pos-payment-details" className=" flex text-center p-2 w-full">

              <div className="text-[#EA4335] text-sm font-semibold flex w-full items-center justify-center ">View Invoice</div>

            </Link>
          </div>
          <div className="w-full">
            <Link to="/home">
              <ButtonPrimary className="w-full  text-center " size="large">
                <div className="text-[14px] font-normal flex w-full items-center justify-center ">Back to Home</div>
              </ButtonPrimary>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PosInvoice;
