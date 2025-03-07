import QRCode from "react-qr-code";
import { useEdiCalculateStore } from "../../store/edi-payment-store/use-edi-calculate";
import { useEdiQrPaymentStore } from "../../store/edi-payment-store/use-edi-payment-qr";


const QrPayment = () => {
  const { edi } = useEdiCalculateStore();
  const { qrData } = useEdiQrPaymentStore();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-[#1D2939] text-[14px] font-poppins font-bold mt-16 leading-5">
          <p className="text-center">Scan & pay to following QR.</p>
        </div>
        <div className="mt-[60px] text-[#1D2939] text-center text-[14px] font-medium font-poppins leading-7">
          Amount
        </div>
        <div className="text-[28px] font-bold font-poppins mb-6 ">
          <span className="text-center pe-[6px]">{edi?.daily_amount}</span>
          <span className="text-[#98A2B3]">रु</span>
        </div>
        <div className=" rounded-lg bg-[#fff]  w-[207.4px] h-[204px]">
          <QRCode
            size={256}
            fgColor="red"
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrData?.Payload}
            viewBox={`0 0 256 256`}
            level="L"
          ></QRCode>
        </div>
        <div className="font-poppins font-normal text-[12px] text-[#667085] mt-3 w-[130px]">
          Auto refresh after <span className="text-[#EA4335]">59s</span>
        </div>
      </div>
      <div className="px-6 w-full absolute  bottom-6">
        <div className="text-center w-full   bg-[#F5F6F7]  h-[96px] rounded-[12px] flex flex-col justify-center items-center">
          <div className="flex justify-center pb-2">
            <span className="loader"></span>
          </div>
          <p className="text-[16px] font-semibold text-[#1D2939] leading-6 font-poppins">Waiting for Payment</p>
        </div>
      </div>
    </>
  );
};

export default QrPayment;
