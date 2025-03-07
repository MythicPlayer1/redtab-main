import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OwnerVerificationState {
  country: string | null;
  idFrontImage: string | null;
  idBackImage: string | null;
  ownerImage: string | null;
  setCountry: (country: string) => void;
  setIdFrontImage: (image: string | null) => void;
  setIdBackImage: (image: string | null) => void;
  setOwnerImage: (image: string | null) => void;
 // resetState: () => void;
}
export const useOwnerStore = create<OwnerVerificationState>()(
    persist(
      (set) => ({
        country: null,
        setCountry: (country: string | null) => {
          set({ country });
        },
        idFrontImage: null,
        setIdFrontImage(idFrontImage: string | null) {
          set({ idFrontImage });
        },
        idBackImage: null,
        setIdBackImage(idBackImage: string | null) {
          set({idBackImage });
        },
        ownerImage: null,
        setOwnerImage(ownerImage: string | null) {
          set({ownerImage });
        },
        // resetState: () => {
        //   set({
        //     country: null,
        //     idFrontImage: null,
        //     idBackImage: null,
        //     ownerImage: null,
        //   });
        // },
      }),
  
      {
        name: "owner-details-storage",
        getStorage: () => localStorage,
        partialize: (state) => ({
          country: state.country,
          idFrontImage: state.idFrontImage,
          idBackImage: state. idBackImage,
          ownerImage: state.ownerImage
        }),
      }
    )
  );
  
