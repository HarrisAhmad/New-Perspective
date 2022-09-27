import {
  GET_BIRTH_YEAR,
  GET_RELATIONSHIP,
  SHOW_INFOMODAL,
  SHOWDATEPICKER_MODAL,
  GETUSER_DATA,
  USER_LOCATION,
  USER_NAME,
  HAVING_DEPENDANT,
  GET_TITLE,
  GET_COUNTRIES,
  GET_NATIONALITY,
  GET_UPID,
  GET_PIID,
  GET_CID,
  GET_BANKNAME,
  GET_ACC_TYPE,
  GET_DEBITORDER,
  SHOW_SIGNATUREMODAL,
  SHOW_ADDITIONALINFO_MODAL,
  SHOWHIDE_SNACKBAR,
  GET_DEPENDANT_BIRTHYEAR,
  GET_CONTACT_INFO,
  SHOW_DATEADJUSTMODAL,
  GET_ADJUSTED_DATE,
  SHOW_DISCLOSURE,
  GET_BENEFICIARY_RELATION,
  GET_PRIMARYMEMBER_AGE,
  GET_TERMS_URL,
  GET_USER_STATUS,
} from '../actiontypes';

const initialState = {
  userStatus: {
    isUserLoggedIn: false,
  },
  userinfo: {
    Birth_Year: '',
    Dependant_BirthYear: '',
    relationship: '',
    relationshipID: 0,
    userData: [],
    userlocation: '',
    userName: '',
    surName: '',
    isHavingDependant: 0,
    title: '',
    titleID: 0,
    countries: '',
    countriesID: 0,
    nationality: '',
    nationalityID: 0,
    UP_ID: 0,
    PI_ID: 0,
    C_ID: 0,
    Contact: '',
    BankName: '',
    B_ID_FK: 0,
    AccountType: '',
    AT_ID_FK: 0,
    DebitOrder: '',
    DO_ID_FK: 0,
    Adjusted_Date: '',
    beneficiaryRelation: '',
    beneficiaryR_ID: 0,
    primararyMemberAge: 0,
  },

  modalPopup: {
    isModalVisible: false,
    isSignatureModalVisible: false,
    isDatePickerVisible: false,
    isAdditionalInfoVisible: false,
    isDateAdjusterModalShown: false,
    isSnackbarShown: false,
    isDisclosureShown: false,
  },

  legalURL: {
    privacyURL: '',
    termsURL: '',
  },
};

export const StateReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STATUS:
      return {
        ...state,
        userStatus: {
          isUserLoggedIn: action.payload.isUserLoggedIn,
        },
      };
    case GET_BIRTH_YEAR:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          Birth_Year: action.payload.Birth_Year,
        },
      };

    case GET_DEPENDANT_BIRTHYEAR:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          Dependant_BirthYear: action.payload.Dependant_BirthYear,
        },
      };
    case GETUSER_DATA:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          userData: action.payload.userData,
        },
      };

    case GET_RELATIONSHIP:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          relationship: action.payload.relationship,
          relationshipID: action.payload.relationshipID,
        },
      };

    case USER_LOCATION:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          userlocation: action.payload.userlocation,
        },
      };

    case USER_NAME:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          userName: action.payload.userName,
          surName: action.payload.surName,
        },
      };

    case USER_LOCATION:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          userlocation: action.payload.userlocation,
        },
      };

    case HAVING_DEPENDANT:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          isHavingDependant: action.payload.isHavingDependant,
        },
      };

    case GET_TITLE:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          title: action.payload.title,
          titleID: action.payload.titleID,
        },
      };

    case GET_COUNTRIES:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          countries: action.payload.countries,
          countriesID: action.payload.countriesID,
        },
      };

    case GET_NATIONALITY:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          nationality: action.payload.nationality,
          nationalityID: action.payload.nationalityID,
        },
      };

    case GET_UPID:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          UP_ID: action.payload.UP_ID,
        },
      };

    case GET_PIID:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          PI_ID: action.payload.PI_ID,
        },
      };

    case GET_CID:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          C_ID: action.payload.C_ID,
        },
      };
    case GET_CONTACT_INFO:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          Contact: action.payload.Contact,
        },
      };

    case GET_BANKNAME:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          BankName: action.payload.BankName,
          B_ID_FK: action.payload.B_ID_FK,
        },
      };

    case GET_ACC_TYPE:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          AccountType: action.payload.AccountType,
          AT_ID_FK: action.payload.AT_ID_FK,
        },
      };

    case GET_DEBITORDER:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          DebitOrder: action.payload.DebitOrder,
          DO_ID_FK: action.payload.DO_ID_FK,
        },
      };
    case GET_ADJUSTED_DATE:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          Adjusted_Date: action.payload.Adjusted_Date,
        },
      };

    case GET_BENEFICIARY_RELATION:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          beneficiaryRelation: action.payload.beneficiaryRelation,
          beneficiaryR_ID: action.payload.beneficiaryR_ID,
        },
      };

    case GET_PRIMARYMEMBER_AGE:
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          primararyMemberAge: action.payload.primararyMemberAge,
        },
      };

    //////////////////////////////////////////////////////// MODAL POPUP//////////////////////////////////////////////
    case SHOW_INFOMODAL:
      return {
        ...state,
        modalPopup: {
          ...state.modalPopup,
          isModalVisible: action.payload.isModalVisible,
        },
      };

    case SHOW_SIGNATUREMODAL:
      return {
        ...state,
        modalPopup: {
          ...state.modalPopup,
          isSignatureModalVisible: action.payload.isSignatureModalVisible,
        },
      };

    case SHOWDATEPICKER_MODAL:
      return {
        ...state,
        modalPopup: {
          ...state.modalPopup,
          isDatePickerVisible: action.payload.isDatePickerVisible,
        },
      };
    case SHOW_ADDITIONALINFO_MODAL:
      return {
        ...state,
        modalPopup: {
          ...state.modalPopup,
          isAdditionalInfoVisible: action.payload.isAdditionalInfoVisible,
        },
      };

    case SHOW_DATEADJUSTMODAL:
      return {
        ...state,
        modalPopup: {
          ...state.modalPopup,
          isDateAdjusterModalShown: action.payload.isDateAdjusterModalShown,
        },
      };

    case SHOWHIDE_SNACKBAR:
      return {
        ...state,
        modalPopup: {
          ...state.modalPopup,
          isSnackbarShown: action.payload.isSnackbarShown,
        },
      };

    case SHOW_DISCLOSURE:
      return {
        ...state,
        modalPopup: {
          ...state.modalPopup,
          isDisclosureShown: action.payload.isDisclosureShown,
        },
      };

    ////////////////////////////////////////////////////////////// LEGAL ///////////////////////////////////////////////

    case GET_TERMS_URL:
      return {
        ...state,
        legalURL: {
          privacyURL: action.payload.privacyURL,
          termsURL: action.payload.termsURL,
        },
      };

    default:
      return state;
  }
};
