import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ButtonPrimary } from "../../Button/ButtonPrimary";
import Map from "../../kyc/map";

export interface MapPinProps {
  onConfirm?: () => void;
  onClose?: () => void;
}

export const MapPin: FC<MapPinProps> = (props) => {
  const { t } = useTranslation("MapPin");

  const handleConfirm = () => {
    props.onConfirm?.();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0">
      <Map />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <ButtonPrimary onClick={handleConfirm} className="w-full">
          {t("confirm", { defaultValue: "Confirm location" })}
        </ButtonPrimary>
      </div>
    </div>
  );
};
