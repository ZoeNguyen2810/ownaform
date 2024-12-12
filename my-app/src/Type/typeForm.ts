export type Contact = {
    firstName: string;
    surname: string;
    phone: string;
    mobile: string;
    email: string;
    position: string;
  };
  
  export type CentreDetails = {
    name: string;
    purchasingSettlementDate: string;
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    email: string;
    phone: string;
    goLiveDate: string; // ISO 8601 date string
    openingTime: {
      hour: number;
      minute: number;
    };
    closingTime: {
      hour: number;
      minute: number;
    };
    numberOfApprovedPlaces: number;
    centreType: string;
  };
  
  export type BankDetails = {
    accountName: string;
    bsb: string;
    accountNumber: string;
  };
  
  export type CreditCardDetails = {
    cardToken: string;
    cardExpiry: string;
  };
  
  export type Agreement = {
    endUserAgreement: boolean;
    privacyPolicy: boolean;
    termsAndConditions: boolean;
    securityPolicy: boolean;
    directDebitServiceAgreement: boolean;
  };
  
  export type ApplicationForm = {
    primaryContact: Contact;
    onboardingChampion?: Contact;
    approvedProvider?: Contact;
    centreDetails: CentreDetails[];
    currentSoftwareUsed?: string[];
    featuresSelected?: string[];
    selectedPackage?: string;
    bankDetails?: BankDetails;
    creditCardDetails?: CreditCardDetails;
    agreement?: Agreement;
  };
