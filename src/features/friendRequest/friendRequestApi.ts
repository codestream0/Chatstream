import {api } from "@/lib/apiBase"


export const friendRequestApi = api.injectEndpoints({
    endpoints:(builder)=>({

        sendFriendRequests:builder.mutation({
            query:(credentials:{receiverId?:string,receiverEmail?:string})=>({
                url:"/friends/request",
                method:"POST",
                body:credentials
            }),
            invalidatesTags:["friends"]
        }),

        respondFriendRequests:builder.mutation({
            query:({status,requestId})=>({
                url:`/friends/respond/${requestId}`,
                method:"PATCH",
                body:{status}
            }),
            invalidatesTags:["friends"]
        }),

        getFriendRequests:builder.query<any,void>({
            query: ()=> "/friends/pending",
            providesTags:["friends"]
        }),

        searchFriends:builder.query({
            query:(query)=> `/friends/search?query=${encodeURIComponent(query)}`,
            providesTags:["friends"]
        }),

        getFriends:builder.query<any,void>({
            query:()=> "/friends/getFriends"
        })


    })
})

export const {useSendFriendRequestsMutation,useSearchFriendsQuery,useRespondFriendRequestsMutation,useGetFriendRequestsQuery,useGetFriendsQuery} = friendRequestApi;