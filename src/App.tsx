import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SplashScreen } from "./components/SplashScreen";
import SupplierProductCart from "./pages/product-list/supplier-product-list";

const Home = React.lazy(() => import("./pages/home/home"));

const MainProfile = React.lazy(() => import("./pages/profile/main-profile"));
const MerchantProfile = React.lazy(() => import("./pages/kyc/merchant/merchant-profile"));
const MapPage = React.lazy(() => import("./pages/kyc/merchant/MapPage"));
const KYCOutlet = React.lazy(() => import("./pages/kyc/merchant/outlet"));
const ConfirmLocation = React.lazy(() => import("./pages/kyc/merchant/confirm-location"));
const WelCome = React.lazy(() => import("./pages/welcome"));

const SignupOTPStep = React.lazy(() => import("./pages/connect/email/otp"));
const SignupCreatePasswordStep = React.lazy(() => import("./pages/connect/email/password"));
const AccountCreated = React.lazy(() => import("./pages/connect/account-created"));
const AccountCreatedWithEmail = React.lazy(() => import("./pages/connect/account-created-with-email"));
const ConnectViaPhoneOTP = React.lazy(() => import("./pages/connect/phone/otp"));
const ConnectViaPhone = React.lazy(() => import("./pages/connect/phone"));
const ConnectViaEmail = React.lazy(() => import("./pages/connect/email"));
const ConnectViaPhonePassword = React.lazy(() => import("./pages/connect/phone/password"));

// kyc flow
const SelectBizType = React.lazy(() => import("./pages/kyc/select-biz-type"));
const MerchantName = React.lazy(() => import("./pages/kyc/merchant/name"));
const MerchantLocation = React.lazy(() => import("./pages/kyc/merchant/location"));
const MerchantContact = React.lazy(() => import("./pages/kyc/merchant/contact"));
const PanVerify = React.lazy(() => import("./pages/kyc/pan/verify"));
const PanVerifyCompany = React.lazy(() => import("./pages/kyc/pan/verify-company"));
const PanVerifyOwner = React.lazy(() => import("./pages/kyc/pan/verify-owner"));
const KYCPANFrontPhoto = React.lazy(() => import("./pages/kyc/pan/upload-id/capture-pan-front"));
const KYCUplodPaanFront = React.lazy(() => import("./pages/kyc/pan/upload-id/upload-pan-front"));
const KYCPANBackPhoto = React.lazy(() => import("./pages/kyc/pan/upload-id/capture-pan-back"));
const KYCUploadPanBack = React.lazy(() => import("./pages/kyc/pan/upload-id/upload-pan-back"));
const InformationReview = React.lazy(() => import("./pages/kyc/pan/upload-id/information-review"));
const ReviewSuccessMessage = React.lazy(() => import("./pages/kyc/pan/upload-id/review-success"));
const ReviewErrorMessage = React.lazy(() => import("./pages/kyc/pan/upload-id/review-error"));
const ReviewDocumentResult = React.lazy(() => import("./pages/kyc/pan/upload-id/review-document-result"));
const CaptureProfileInterface = React.lazy(() => import("./pages/kyc/profile/capture-profile-interface"));
const ProfileVerify = React.lazy(() => import("./pages/kyc/profile/profile-verify"));
const ProfileReview = React.lazy(() => import("./pages/kyc/profile/profile-review"));
const ProfileReviewSuccess = React.lazy(() => import("./pages/kyc/profile/profile-review-success"));
const ProfileReviewError = React.lazy(() => import("./pages/kyc/profile/profile-review-error"));
const ProfileReviewResult = React.lazy(() => import("./pages/kyc/profile/profile-review-result"));
const OwnerInfo = React.lazy(() => import("./pages/kyc/profile/owner-info"));
const OwnerInfoReview = React.lazy(() => import("./pages/kyc/profile/owner-info-review"));

// team member
const ManageTeamMember = React.lazy(() => import("./pages/staffs/staff-page"));
const ManageTeamMemberInfo = React.lazy(() => import("./pages/staffs/staff-info-page"));
const ManageTeamMemberUsername = React.lazy(() => import("./pages/staffs/staff-username-page"));
const ManageTeamMemberPermission = React.lazy(() => import("./pages/staffs/permission-module"));
const ManageStaffProfile = React.lazy(() => import("./pages/staffs/staff-profile-page"));
const OwnerPasswordVerify = React.lazy(() => import("./pages/staffs/owner-password"));
const StaffUsernameChange = React.lazy(() => import("./pages/staffs/staff-username-change-page"));

// finance
const FinanceHome = React.lazy(() => import("./pages/finance-page/finance-home-page"));
const FinanceTransactionhistory = React.lazy(() => import("./pages/finance-page/transaction-history-page"));
const RedTabPayHome = React.lazy(() => import("./pages/finance-page/red-tab-pay-page"));
const RedTabCredit = React.lazy(() => import("./pages/finance-page/red-tab-credit-page"));
const RedTabRequest = React.lazy(() => import("./pages/finance-page/red-tab-request-page"));
const PayInvoice = React.lazy(() => import("./pages/finance-page/pay-invoice-page"));
const BusinessNameInvoice = React.lazy(() => import("./pages/finance-page/businessname-invoice-page"));
const PaymentPlan = React.lazy(() => import("./pages/finance-page/payment-plan-page"));
const AccountPaymentPlan = React.lazy(() => import("./pages/finance-page/account-payment-plan-page"));
const PaymentDetail = React.lazy(() => import("./pages/finance-page/payment-detail-page"));
const PaymentReceived = React.lazy(() => import("./pages/finance-page/payment-receive-page"));
const AccountBalancePaymentDetail = React.lazy(() => import("./pages/finance-page/account-balance-payment-details"));

// pos
const PosHome = React.lazy(() => import("./pages/pos/pos-home-page"));
const PosMain = React.lazy(() => import("./pages/pos/pos-main-page"));
const PosSendReceipt = React.lazy(() => import("./pages/pos/pos-send-receipt-page"));
const PosInvoiceReview = React.lazy(() => import("./pages/pos/invoice-review-page"));
const PosInvoice = React.lazy(() => import("./pages/pos/pos-invoice-page"));
const PosChargeAction = React.lazy(() => import("./pages/pos/pos-charge-action-page"));
const PosProductDetail = React.lazy(() => import("./pages/pos/pos-product-detail-page"));
const PosReviewSale = React.lazy(() => import("./pages/pos/pos-review-sale-page"));
const PosPaymentDetails = React.lazy(() => import("./pages/pos/pos-payment-details"));

//product
const ProductPage = React.lazy(() => import("./pages/product-page/product-page"));

//auth redirect for non logged in users
const AuthRedirect = React.lazy(() => import("./pages/auth-redirect/auth-redirect"));

// outlet All Information
const Outlet = React.lazy(() => import("./pages/outlet/page"));
const UploadedEkycDetails = React.lazy(() => import("./pages/outlet-upload-detail/view-eKyc-detail"));

// supplier list page
const SupplierList = React.lazy(() => import("./pages/supplier-list-page/supplier-list"));

// Notification Page
const NotificationPage = React.lazy(() => import("./pages/notification/notifiation-page"));

//order place page
const OrderPlacePage = React.lazy(() => import("./pages/order-place/order-place-page"));
// edi-pay
const EdiPaymentReview = React.lazy(() => import("./pages/pay-edi/review-payment"));
const EdiQrPayment = React.lazy(() => import("./pages/pay-edi/qr-payment"));
const EdiPaymentSuccess = React.lazy(() => import("./pages/pay-edi/payment-success"));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<SplashScreen />}>
        <Routes>
          {/* email signup */}
          <Route path="/connect/email" element={<ConnectViaEmail />} />
          <Route path="/connect/email/otp" element={<SignupOTPStep />} />
          <Route path="/connect/email/password" element={<SignupCreatePasswordStep />} />
          <Route path="/account-created" element={<AccountCreated />} />
          <Route path="/account-created-with-email" element={<AccountCreatedWithEmail />} />
          {/* phone signup */}
          <Route path="/connect/phone/password" element={<ConnectViaPhonePassword />} />
          <Route path="/connect/phone/otp" element={<ConnectViaPhoneOTP />} />
          <Route path="/connect/phone" element={<ConnectViaPhone />} />
          {/* kyc */}
          <Route path="/kyc/select-biz-type" element={<SelectBizType />} />
          <Route path="/kyc/merchant/name" element={<MerchantName />} />
          <Route path="/kyc/merchant/outlet" element={<KYCOutlet />} />
          <Route path="/kyc/merchant/location" element={<MerchantLocation />} />
          <Route path="/kyc/merchant/confirm-location" element={<ConfirmLocation />} />
          <Route path="/kyc/merchant/contact" element={<MerchantContact />} />
          <Route path="/kyc/pan/verify" element={<PanVerify />} />
          <Route path="/kyc/pan/verify-company" element={<PanVerifyCompany />} />
          <Route path="/kyc/pan/verify-owner" element={<PanVerifyOwner />} />
          <Route path="/kyc/pan/capture-front" element={<KYCPANFrontPhoto />} />
          <Route path="/kyc/pan/upload-front" element={<KYCUplodPaanFront />} />
          <Route path="/kyc/pan/capture-back" element={<KYCPANBackPhoto />} />
          <Route path="/kyc/pan/upload-back" element={<KYCUploadPanBack />} />
          {/* unadded to routes */}
          <Route path="/kyc/pan/review" element={<InformationReview />} />
          <Route path="/kyc/pan/review-success" element={<ReviewSuccessMessage />} />
          <Route path="/kyc/pan/review-error" element={<ReviewErrorMessage />} />
          <Route path="/kyc/pan/review-result" element={<ReviewDocumentResult />} />
          {/* profile */}
          <Route path="/kyc/profile/interface" element={<CaptureProfileInterface />} />
          <Route path="/kyc/profile/verify" element={<ProfileVerify />} />
          <Route path="/kyc/profile/review" element={<ProfileReview />} />
          <Route path="/kyc/profile/review-success" element={<ProfileReviewSuccess />} />
          <Route path="/kyc/profile/review-error" element={<ProfileReviewError />} />
          <Route path="/kyc/profile/review-result" element={<ProfileReviewResult />} />
          <Route path="/kyc/profile/owner-info" element={<OwnerInfo />} />
          <Route path="/kyc/profile/owner-info-review" element={<OwnerInfoReview />} />
          <Route path="/" element={<WelCome />} />
          {/* team members Home */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<MainProfile />} />
          <Route path="/products" element={<ProductPage />} />

          {/* //team members */}
          <Route path="/manage-staffs" element={<ManageTeamMember />} />
          <Route path="/staff-information" element={<ManageTeamMemberInfo />} />
          <Route path="/staff-username-information" element={<ManageTeamMemberUsername />} />
          <Route path="/permission-access" element={<ManageTeamMemberPermission />} />
          <Route path="/staff-profile" element={<ManageStaffProfile />} />
          <Route path="/owner-password-verify" element={<OwnerPasswordVerify />} />
          <Route path="/staff-username-change" element={<StaffUsernameChange />} />

          {/* merchant*/}
          <Route path="/merchant-profile" element={<MerchantProfile />} />

          {/* // finance */}
          <Route path="/finance" element={<FinanceHome />} />
          <Route path="/transaction-history" element={<FinanceTransactionhistory />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/tab-pay" element={<RedTabPayHome />} />
          <Route path="/tab-pay-credit" element={<RedTabCredit />} />
          <Route path="/tab-request" element={<RedTabRequest />} />
          <Route path="/pay-invoice" element={<PayInvoice />} />
          <Route path="/business-name-invoice" element={<BusinessNameInvoice />} />
          <Route path="/payment-plan" element={<PaymentPlan />} />
          <Route path="/payment-details" element={<PaymentDetail />} />
          <Route path="/account-payment-plan" element={<AccountPaymentPlan />} />
          <Route path="/payment-receive" element={<PaymentReceived />} />
          <Route path="/account-balance-payment-details" element={<AccountBalancePaymentDetail />} />
          {/* Pos */}
          <Route path="/pos-calculator" element={<PosHome />} />
          <Route path="/pos-main" element={<PosMain />} />
          <Route path="/pos-send-receipt" element={<PosSendReceipt />} />
          <Route path="/pos-invoice-review" element={<PosInvoiceReview />} />
          <Route path="/pos-invoice" element={<PosInvoice />} />
          <Route path="/pos-charge-action" element={<PosChargeAction />} />
          <Route path="/pos-product-detail" element={<PosProductDetail />} />
          <Route path="/pos-charge-action" element={<PosChargeAction />} />
          <Route path="/pos-review-sale" element={<PosReviewSale />} />
          <Route path="/pos-payment-details" element={<PosPaymentDetails />} />

          {/*Outlet Information */}
          <Route path="/outlet-information" element={<Outlet></Outlet>} />
          <Route path="/outlet-upload-details" element={<UploadedEkycDetails />} />

          <Route path="/auth-redirect" element={<AuthRedirect />} />

          {/* product-details */}
          <Route path="/product-list" element={<SupplierProductCart />} />

          {/* supplier page */}
          <Route path="/supplier-list/:uuid" element={<SupplierList />} />

          {/* Notification Page */}
          <Route path="/notification" element={<NotificationPage />} />

          {/* order place */}
          <Route path="/order-place" element={<OrderPlacePage />} />
            {/* pay-edi */}
            <Route path='/edi-payment-review' element={<EdiPaymentReview />} />
            <Route path='/edi-pay-qr' element={<EdiQrPayment/>} />
            <Route path='/edi-payment-success' element={<EdiPaymentSuccess />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
