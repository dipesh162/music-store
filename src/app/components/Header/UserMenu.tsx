'use client'
import Link from "next/link"
import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { reset } from "@/redux/slices/authSlice";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";

interface pageProps{
    handleMouseLeave?: Function
}

const UserMenu: FC<pageProps> = ({handleMouseLeave}) =>{
    const router = useRouter()

    const user:any = useAppSelector((state)=> state.auth.user)

    const [userAuthState, setUserAuthState] = useState(user.token ? 'loggedIn' : 'loggedOut')
    useEffect(()=>{
        setUserAuthState(user.token ? 'loggedIn' : 'loggedOut')
    }, [user.token])

    const dispatch = useAppDispatch();
    const handleLogout = async () =>{
        try {
            await axios.get('/api/users/logout')
            dispatch(reset())
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    return(
        <div className="shadow-[0_0.5px_2.5px_rgba(0,0,0,0.19)] bg-white py-4 px-5" onMouseLeave={()=> handleMouseLeave && handleMouseLeave()}>
            <h3 className="font-semibold text-[#161616]">Welcome</h3>
            <h4 className="text-[#161616] text-[14px] mt-[-1px]">To your musical world</h4>

            {userAuthState == 'loggedOut' ? 
                <Link href='/login' className="border-[1px] hover:border-[#161616] p-2 my-3 block text-[14px] text-center font-semibold">
                    LOGIN / SIGNUP
                </Link>
            : null}

            <div className="pt-2 mt-2 border-t-[1px] border-[#e8e8e8]">
                <Link href='/orders'>
                    <h4 className="text-[#161616] text-[14px] hover:font-semibold">Orders</h4>
                </Link>

                <Link href='/wishlist'>
                    <h4 className="text-[#161616] text-[14px] hover:font-semibold">Wishlist</h4>
                </Link>

                <Link href='/about'>
                    <h4 className="text-[#161616] text-[14px] hover:font-semibold">About</h4>
                </Link>
                
                <Link href='/contact-us'>
                    <h4 className="text-[#161616] text-[14px] hover:font-semibold">Contact Us</h4>
                </Link>


                {userAuthState == 'loggedIn' ? 
                    <h4 onClick={handleLogout} className="text-[#161616] hover:font-semibold">logout</h4>
                : null}
                
            </div>
        </div>
    )
}

export default UserMenu