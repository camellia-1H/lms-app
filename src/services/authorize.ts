import { Amplify, Auth } from 'aws-amplify';
import toast from 'react-hot-toast';

interface TokenItem {
  accessToken?: string;
  accessTokenExpiresAt?: number;
}

Amplify.configure({
  Auth: {
    userPoolId: 'us-east-1_l7ZzNbz7E',
    userPoolWebClientId: '6g0frahgmfbch91tbvo8k8sp5d',
  },
});

export const loginApi = async (loginRequest: any): Promise<TokenItem> => {
  try {
    const response = await loginCognito(loginRequest);
    return response.contents;
  } catch (error) {
    throw error;
  }
};

const loginCognito = async (loginRequest: any): Promise<any> => {
  try {
    const cognito = await Auth.signIn({
      username: loginRequest.email,
      password: loginRequest.password,
    });

    return {
      contents: {
        accessToken: cognito.signInUserSession.accessToken.jwtToken,
        accessTokenExpiresAt: cognito.signInUserSession.accessToken.payload.exp,
      },
    };
  } catch (error: any) {
    if (error.name === 'UserNotConfirmedException') {
      throw { message: 'Login cognito failed' };
    }
  }
};
export const forgotPassword = async (email: string) => {
  try {
    const result = await Auth.forgotPassword(email);
    if (result) {
      toast.success('Forgot success');
    }
  } catch (err: any) {
    switch (err.code) {
      case 'UserNotFoundException': {
        toast.error('UserNotFoundException');
        break;
      }
      case 'LimitExceededException': {
        toast.error('LimitExceededException');
        break;
      }
      case 'CodeDeliveryFailureException': {
        toast.error('CodeDeliveryFailureException');
        break;
      }
      case 'InvalidParameterException': {
        toast.error('InvalidParameterException');
        break;
      }
      default: {
        toast.error('Something wrong');
        break;
      }
    }
    return false;
  }
};

export const resetPassword = async (
  email: string,
  newPassword: string,
  token: string
) => {
  try {
    const result = await Auth.forgotPasswordSubmit(email, token, newPassword);
    if (result !== 'SUCCESS') {
      return false;
    }
    return true;
  } catch (error: any) {
    switch (error.code) {
      case 'CodeMismatchException': {
        toast.error('CodeMismatchException');
        break;
      }
      case 'ExpiredCodeException': {
        toast.error('ExpiredCodeException');
        break;
      }
      case 'UserNotFoundException': {
        toast.error('UserNotFoundException');
        break;
      }
      case 'InvalidParameterException': {
        toast.error('InvalidParameterException');
        break;
      }
      default: {
        toast.error('CodeMismatchException');
        break;
      }
    }
    return false;
  }
};
