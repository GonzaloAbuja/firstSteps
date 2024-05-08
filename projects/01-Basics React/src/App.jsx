/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './App.css';
import { TwiterFollowCard } from './TwiterFollowCard';
export function App (){
    const users =[
        {
            userName: 'midudev',
            name:'Miguel Angel',
            isFollowing: true
        },        {
            userName: 'messi',
            name:'Andres Lionel',
            isFollowing: false
        }
    ]
    return(
        <section className='App'>
           
            {
                users.map(user=>{
                    const{userName,name,isFollowing}=user
                    return(
                    <TwiterFollowCard userName={userName} initialIsFollowing={isFollowing} key={userName}>
                        {name}

                    </TwiterFollowCard>
                    )
                })
            }

        </section>



    )     
    
}