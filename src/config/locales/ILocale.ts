export default interface ILocale {
  app: {
    errors: {
      internalServer: string;
    };
  };

  /* Middlewares */
  middlewares: {
    ensureAuthenticated: {
      JWTtokenMissing: string;
      InvalidJWTToken: string;
    };
    hasPermission: {
      accessDenied: string;
    };
  };

  /* Auth */
  auth: {
    invalidCredentials: string;
    inactiveAccount: string;
  };

  /* Mail */
  mail: {
    errorSendingEmail: string;
    subject: {
      userActivation: string;
    };
  };

  /* Resources */
  resources: {
    user: string;
    users: {
      alreadyActivated: string;
      requestPasswordTokenExpired: string;
      userNotFound: string;
    };
    permission: string;
    permissions: {
      alreadyExists: string;
      notFound: string;
    };
    role: string;
    roles: {
      alreadyExists: string;
      notFound: string;
    };
    company: string;
    companies: {
      alreadyExists: string;
      notFound: string;
    };
    cryptocurrency: string;
    cryptocurrencies: {
      alreadyExists: string;
      notFound: string;
    };
    transaction: string;
    transactions: {
      notFound: string;
    };
  };

  /* Validation */
  validation: {
    invalidUUID: string;
    resourceNotFound: string;
    alreadyExists: string;
    invalidValue: string;
    emailAlreadyUsed: string;
    invalidCurrentPassword: string;
    oldPasswordIsRequired: string;
    oldPasswordNotMatch: string;
    onlyImageJpgPngAccepted: string;
  };
}
