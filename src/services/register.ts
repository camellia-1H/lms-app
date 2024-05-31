const ApiPath = {
  REGISTER: '/user/register',
  VERIFY_EMAIL: '/user/verify-email',
  RESEND_CODE: '/user/resend-confirm-code',
  CHECK_USER_VERIFY: '/user/check-user-verify',
};

// export const register = async (registerRequest: any) => {
//   try {
//     const response = await axiosClient.post<BaseResponse<RegisterResponse>>(
//       ApiPath.REGISTER,
//       registerRequest
//     );
//     const data = response.data;
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const verifyEmailApi = async (
//   verifyRequest: VerifyRequest
// ): Promise<BaseResponse<VerifyResponse>> => {
//   const { axiosClient } = useAxiosClient();
//   try {
//     const response = await axiosClient.post<BaseResponse<VerifyResponse>>(
//       ApiPath.VERIFY_EMAIL,
//       verifyRequest
//     );
//     const data = plainToClassFromExist(
//       new BaseResponse<VerifyResponse>(VerifyResponse),
//       response.data
//     );
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const resendCodeApi = async (resendCodeRequest: ResendCodeRequest) => {
//   const { axiosClient } = useAxiosClient();
//   try {
//     await axiosClient.post(ApiPath.RESEND_CODE, resendCodeRequest);
//   } catch (error) {
//     throw error;
//   }
// };

// export const checkUserVerifyApi = async (
//   checkUserVerifyRequestRequest: CheckUserVerifyRequest
// ): Promise<BaseResponse<CheckUserVerifyResponse>> => {
//   const { axiosClient } = useAxiosClient();
//   try {
//     const response = await axiosClient.post<
//       BaseResponse<CheckUserVerifyResponse>
//     >(ApiPath.CHECK_USER_VERIFY, checkUserVerifyRequestRequest);
//     const data = plainToClassFromExist(
//       new BaseResponse<CheckUserVerifyResponse>(CheckUserVerifyResponse),
//       response.data
//     );
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
