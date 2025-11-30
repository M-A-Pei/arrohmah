"use server"

import { cookies } from 'next/headers';

export async function login(pw: string){
    if(pw == (process.env.ADMIN_PASSWORD || "123")){
        const cookie = await cookies()
        cookie.set("login", "admin")
        return {status: true}
    }else if(pw == (process.env.PASSWORD || "321")){
        const cookie = await cookies()
        cookie.set("login", "guru")
        return {status: true}
    }else{
        return {status: false}
    }
}