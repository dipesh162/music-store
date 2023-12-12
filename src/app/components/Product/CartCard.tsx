// React
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

// Hooks
import useOutsideAlerter from '@/hooks/useOutsideDetect';
import { useAppDispatch } from '@/redux/hooks';

// Icons
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// Redux
import { updateCartThunk } from '@/redux/thunks/cartThunks';

export default function CartCard({product, handleDelete, userAuthState}:{product:any, handleDelete: any , userAuthState: string}){
    const dispatch = useAppDispatch();

    const [quantity, setQuantity] = useState(product.productCartQuantity)
    const updateQuantity = (quantity:number)=>{
        if(quantity == 0){
            handleDelete([product._id])
        } else {
            dispatch(updateCartThunk({type: userAuthState, productId: product._id, quantity}))
            setQuantity(quantity)
        }
    }

    const [quantityDropdown,setQuantityDropdown] = useState(false)
    const toggleQuantityDropdown = () =>{
        setQuantityDropdown((prevState)=> !prevState)
    }

    const dropDownRef = useRef(null)
    useOutsideAlerter(dropDownRef,toggleQuantityDropdown);


    return(
        <div>
            <div className='flex justify-between'>
                <div className='flex'>
                    <Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/instruments/${product.slug}`}>
                        <Image
                            src={product?.images[0]}
                            width={155}
                            height={155}
                            alt="Product Image"
                            className='pb-1 m-auto'
                        />
                    </Link>
                    <div className='mt-[22px]'>
                        <Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/instruments/${product.slug}`}>
                            <h2>{product.name}</h2>
                        </Link>
                        <div className='flex gap-3 mt-2'>
                            <div className='w-fit cursor-pointer relative py-1 pl-[10px] pr-[6px] bg-[#F0F2F2] border-[#BBBFBF] border-[1px] rounded-[8px] shadow-[0_2px_5px_0px_rgba(213,217,217,.5)]' onClick={()=> setQuantityDropdown((prevState)=> !prevState)}>
                                <div className='flex items-center gap-1 text-[14px]'>Qty: {quantity} <span className='rotate-[90]'><MdOutlineKeyboardArrowDown className='font-bold' size={20} color='#616364'/></span></div>
                                { quantityDropdown && 
                                    <div ref={dropDownRef} className="w-full absolute py-1.5 left-[0.5px] top-0 z-[10px] bg-[#fff] border-[#BBBFBF] border-[1px] rounded-[8px] shadow-[0_2px_5px_rgba(15,17,17,.15)]">
                                        {[ ... Array(10)].map((item,i)=>(
                                            <div className='' onClick={()=>updateQuantity(i)}>
                                                {i ===0 ? <span className='pl-1'>0 (Delete)</span>: <div className={quantity == i ? 'bg-[#EDFDFF] border-[#D5D9D9] border-[1px]  pl-1 py-0.5' : 'pl-1 py-0.5'}>{i}</div>}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                            <div className='flex items-center gap-2.5'>
                                <div className='text-[11px] text-[#616364]'>|</div>
                                <div className='cursor-pointer hover:underline text-[13px] text-[#616364]' onClick={()=>handleDelete([product._id])}>Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='mt-[22px] font-semibold'>&#8377;{(product.price).toLocaleString()}</h2>
            </div>


        </div>
    )
}