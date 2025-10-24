import {api} from "@/lib/apiBase";

export const authApi = api.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(credentials:{email:string, password:string})=>({
                url:'/auth/login',
                method:'POST',
                body:credentials,
            }),
        }),

        signup:builder.mutation({
            query:(Credentials:{fullName:string,email:string,phoneNumber:string,password:string})=>({
                url:'/auth/signup',
                method:'POST',
                body:Credentials,
            })
        }),

        forgotPassword:builder.mutation({
            query:(email:string)=>({
                url:'/auth/forgot-password',
                method:'POST',
                body:{email},
            }),
        }),

        verifyOtp:builder.mutation({
            query:(data:{email:string,otp:string})=>({
                url:'/auth/verify-otp',
                method:'POST',
                body:data,
            }),
        }),
        
        resetPassword:builder.mutation({
            query:(data:{email:string,newPassword:string,otp:string})=>({
                url:"/auth/reset-password",
                method:"POST",
                body:data,
            })
        })
    })

});
export const{useLoginMutation,useSignupMutation,useForgotPasswordMutation,useVerifyOtpMutation,useResetPasswordMutation}=authApi;  