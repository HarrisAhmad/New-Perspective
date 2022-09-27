import {axiosConfig} from '../configurations/axiosconfig';
import axios from 'axios';

const headers = {
  headers: {
    Authorization:
      'Brearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiIiwiaWF0IjoxNjM3NDQxNDQ5fQ.xzng4Ugj1m3cAamsUhK61CDlpOG409XJGFhzlHGfo0s',
  },
};

export const GetDependantRelations = async () => {
  let relations = [];
  await axiosConfig
    .get('/getdependantrelations')

    .then(response => {
      return response.data;
    })
    .then(response => {
      relations = response.data;
      result = relations.map(item => {
        return item.R_Name;
      });
      data = result;
    })

    .catch(error => {
      console.log(error);
    });

  return data;
};

export const GetFicaRelations = async userData => {
  let relations = [];
  await axiosConfig
    .post('/getficarelation', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      relations = response.data;
      result = relations.map(item => {
        return item.FR_Relation;
      });
      data = result;
    })

    .catch(error => {
      console.log(error);
    });

  return data;
};

export const InsertUserPolicy = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/insertuserpolicy', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      responseArray = response.data[0];
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const InsertUserDependants = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/insertdependant', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      // console.log('USERPOLOCY' + JSON.stringify(response));
      responseArray = response.data[0];
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const GetTitle = async () => {
  let title = [];
  let data = '';
  await axiosConfig
    .get('/gettitle')

    .then(response => {
      return response.data;
    })
    .then(response => {
      title = response.data;
      //console.log(response.data);
      result = title.map(item => {
        return item.T_Name;
      });
      data = result;
    })

    .catch(error => {
      console.log(error);
    });

  return data;
};

export const GetDependants = async userData => {
  let dependantArray = [];

  await axiosConfig
    .post('/getdependant', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      dependantArray = response.data;
      return dependantArray;
    })

    .catch(error => {
      console.log(error);
    });

  return dependantArray;
};

export const GetCountries = async () => {
  let countries = [];
  await axiosConfig
    .get('/getcountries')

    .then(response => {
      return response.data;
    })
    .then(response => {
      countries = response.data;
      //console.log(response.data);
      result = countries.map(item => {
        return item.CountryName;
      });
      data = result;
    })

    .catch(error => {
      console.log(error);
    });

  return data;
};

export const InsertPersonalInfo = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/insertpersonalinfo', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      // console.log('PersonalINFO' + JSON.stringify(response));
      responseArray = response;
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const InsertContactInfo = async userData => {
  let responseData = '';
  await axiosConfig
    .post('/insertcontactdetails', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      //  console.log('ContactINFO' + JSON.stringify(response));
      responseData = response.data;
    })

    .catch(error => {
      console.log(error);
    });

  return responseData;
};

export const RegenerateOTP = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/regenerate', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      responseArray = response.data;
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const VerifyOTP = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/verifyOTP', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      responseArray = response.data[0];
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const VerifyCredential = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/verifycrd', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      responseArray = response.data[0];
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const RecoverPassword = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/passwordrecover', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      responseArray = response.data[0];
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const InsertDependantDetails = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/insertdependantdetails', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      responseArray = response.data[0];
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const InsertPaymentDetails = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/insertpaymentdetails', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      responseArray = response.data[0];
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const GetBank = async () => {
  let countries = [];
  await axiosConfig
    .get('/getbank')

    .then(response => {
      return response.data;
    })
    .then(response => {
      countries = response.data;
      //console.log(response.data);
      result = countries.map(item => {
        return item.B_Name;
      });
      data = result;
    })

    .catch(error => {
      console.log(error);
    });

  return data;
};

export const GetDebitOrder = async () => {
  let countries = [];
  await axiosConfig
    .get('/getdebitorder')

    .then(response => {
      return response.data;
    })
    .then(response => {
      countries = response.data;
      //console.log(response.data);
      result = countries.map(item => {
        return item.DO_Date;
      });
      data = result;
    })

    .catch(error => {
      console.log(error);
    });

  return data;
};

export const GetAccountType = async () => {
  let countries = [];
  await axiosConfig
    .get('/getaccounttype')

    .then(response => {
      return response.data;
    })
    .then(response => {
      countries = response.data;
      //console.log(response.data);
      result = countries.map(item => {
        return item.AT_Name;
      });
      data = result;
    })

    .catch(error => {
      console.log(error);
    });

  return data;
};

export const InsertProminentRelation = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/insertprominent', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      console.log(response);
      responseArray = response;
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const InsertBeneficiaryDetails = async userData => {
  let responseArray = [];
  await axiosConfig
    .post('/insertbeneficiary', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      responseArray = response.data[0];
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

export const SendDocs = async userData => {
  console.log(userData);
  const data = new FormData();
  data.append('description', 'docs');
  data.append('docs', userData);

  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type':
        'multipart/form-data; boundary=--------------------------489900364438342033930574',
    },
  };
  let responseArray = [];
  await axiosConfig
    .post('/postdocs', data, config)

    .then(response => {
      return response.data;
    })
    .then(response => {
      console.log('URI DATA' + JSON.stringify(response));
      responseArray = response;
    })

    .catch(error => {
      console.log('Hello' + error);
    });

  return responseArray;
};

export const GetApplicationStatus = async userData => {
  let responseArray = '';
  await axiosConfig
    .post('/getstatus', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      // console.log('PersonalINFO' + JSON.stringify(response));
      responseArray = response.data[0];
    })

    .catch(error => {
      console.log(error);
    });

  return responseArray;
};

////////////////////////////////////////////// ADJUST POLICY DATE ////////////////////////////////////////////////

export const AdjustPolicyDate = async userData => {
  let response = '';
  await axiosConfig
    .post('/updatepolicydate', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(response => {
      response = response.data;
    })

    .catch(error => {
      console.log(error);
    });

  return response;
};

export const GetPolicyDetails = async userData => {
  let response = '';
  await axiosConfig
    .post('/getdetails', {
      data: userData,
    })

    .then(response => {
      return response.data;
    })
    .then(respons => {
      response = respons.data;
    })

    .catch(error => {
      console.log(error);
    });

  return response;
};
