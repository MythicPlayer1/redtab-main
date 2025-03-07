import React, { useEffect } from "react";
import Header from "./header";
import { usePanVerifyStore } from "../../store/pan-verification-store/use-outlet-verification";
import { usePanVerificationInformationStore } from "../../store/pan-verification-store/use-pan-verification-store";
import OutletEdit from "../Input/OutletEdit";

const PANDetail = () => {
    const { panVerify } = usePanVerifyStore();
    const [panNo, setPanNo] = React.useState<string>("");
    const [panIssueDate, setPanIssueDate] = React.useState<string>("");
    const [panPhoto, setPanPhoto] = React.useState<string>("");
    const { setPanNumber, setIssueDate, setImagePreviewURL } = usePanVerificationInformationStore();

    useEffect(() => {
        if (panVerify) {
            setPanNo(panVerify[0]?.pan_no);
            setPanNumber(panVerify[0]?.pan_no);
            setPanIssueDate(panVerify[0]?.issued_local_date);
            setIssueDate(panVerify[0]?.issued_local_date);
            if (panVerify[0]?.pan_image) {
                const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
                const panImage = panVerify[0]?.pan_image;
                setPanPhoto(`${baseUrl}${panImage}`);
                setImagePreviewURL(`${baseUrl}${panImage}`);
            }
        }
    }, [panVerify]);

    return (
        <>
            <Header title="PAN Information" path="/kyc/pan/verify"/>
            <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
            <OutletEdit label={"PAN Number"} value={panNo} />
            <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
            <OutletEdit label={"PAN Issue Date"} value={panIssueDate} />
            <div className="border-dashed border-[1px] border-[#DDDDE3] my-4"></div>
            <div>
                <h3 className="text-[#667085] text-sm font-normal mb-4">PAN Photo</h3>
                {panPhoto ? (
                    <div className="border border-[#d0d5dd] bg-primaryColorText rounded-[0.75rem] flex text-center items-center justify-center">
                        <img src={panPhoto} alt="pan_image" className="w-full h-full" />
                    </div>
                ) : (
                    <p>No PAN image uploaded</p>
                )}
            </div>
        </>
    );
};

export default PANDetail;
