import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PanVerificationState {
  selectedPanFile: File | null;
  panNumber: string;
  issueDate: string;
  selectedCompanyVerificationFile: File | null;
  setSelectedPanFile: (selectedPanFile: File) => void;
  setPanNumber: (panNumber: string) => void;
  setIssueDate: (issued_english_date: string) => void;
  setSelectedCompanyVerificationFile: (selectedPanFile: File) => void;
  outletId: string;
  setOutletId: (outletId: string) => void;
  imagePreviewURL: string;
  setImagePreviewURL: (imagePreviewURL: string) => void;
  imagePreviewURL1: string;
  setImagePreviewURL1: (imagePreviewURL1: string) => void;
  clearOutletInfo: () => void;
}

export const usePanVerificationInformationStore = create<PanVerificationState>()(
  persist(
    (set) => ({
      selectedPanFile: null,
      setSelectedPanFile: (selectedPanFile: File) => {
        set({ selectedPanFile });
      },
      panNumber: "",
      setPanNumber(panNumber: string) {
        set({ panNumber });
      },
      issueDate: "",
      setIssueDate(issueDate: string) {
        set({ issueDate });
      },
      imagePreviewURL: "",
      setImagePreviewURL(imagePreviewURL: string) {
        set({ imagePreviewURL });
      },
      imagePreviewURL1: "",
      setImagePreviewURL1(imagePreviewURL1: string) {
        set({ imagePreviewURL1 });
      },
      selectedCompanyVerificationFile: null,
      setSelectedCompanyVerificationFile: (selectedCompanyVerificationFile: File) => {
        set({ selectedCompanyVerificationFile });
      },
      outletId: "",
      setOutletId(outletId: string) {
        set({ outletId });
      },
      clearOutletInfo: () => set({
        panNumber: "",
        issueDate: "",
        imagePreviewURL: "",
        imagePreviewURL1: ""
      }),
    }),

    {
      name: "pan-verification-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ selectedPanFile: state.selectedPanFile}),
    }
  )
);
