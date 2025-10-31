import {api } from "@/lib/apiBase"


export const friendRequestApi = api.injectEndpoints({
    endpoints:(builder)=>({

        sendFriendRequests:builder.mutation({
            query:(credentials:{receiverId?:string,receiverEmail?:string})=>({
                url:"/friends/request",
                method:"POST",
                body:credentials
            })
        }),

        respondFriendRequests:builder.mutation({
            query:(credentials:{status:string})=>({
                url:"/friends/respond/:id",
                method:"PATCH",
                body:credentials
            })
        }),

        getFriendRequests:builder.query<any,void>({
            query: ()=> "/friends/pending"
        }),

        searchFriends:builder.query({
            query:(query)=> `/friends/search?query=${encodeURIComponent(query)}`,
        })

        // sent:builder.query({
        //     query:()=> "/friends/sent"
        // })

    })
})

export const {useSendFriendRequestsMutation,useSearchFriendsQuery,useRespondFriendRequestsMutation,useGetFriendRequestsQuery} = friendRequestApi;