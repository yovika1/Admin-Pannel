import {  AiOutlineShoppingCart} from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';

import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { RiContactsLine, RiCouponFill, RiPagesLine} from 'react-icons/ri';
import { GoDuplicate } from "react-icons/go";
import { FaStar, FaUser } from 'react-icons/fa';
import { HiPlusCircle } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';
import { PiFlagBannerFill } from 'react-icons/pi';


export const SideBarMenu = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'ecommerce',
          icon: FiShoppingBag ,
          link:"/dashboard"
        },
        {
          name: 'Order management',
          icon: AiOutlineShoppingCart ,
          link:"/order"
        },
        {
          name: 'Customer',
          icon: RiContactsLine ,
          link:"/customer"
        },
        {
          name: 'Coupon Code',
          icon: RiCouponFill ,
          link:'/Coupon'
        },
        {
          name:'Categories',
          icon: GoDuplicate,
          link:'/category'
        },
        {
          name:'Transitions',
          icon:RiPagesLine,
          link:'/transitions'
        },
        {
          name:'Brand',
          icon:FaStar,
          link:'/brand'
        },

      ],
    },
  
    {
      title: 'Products',
      links: [
        {
          name: 'Add Products',
          icon: HiPlusCircle ,
          link:"/Products"
        
        },
        {
          name: 'Product List',
          icon: HiMiniClipboardDocumentList ,
          link:"/List"
        },
        {
          name: 'Banner',
          icon: PiFlagBannerFill  ,
          link:"/Banners"
        },
 
      ],
    },
    
    
    {
      title: 'Admin',
      links: [
        {
          name: 'Manage Admin',
          icon: FaUser ,
          link:"/Manage"
        },
        {
          name: 'Admin Role',
          icon: IoMdSettings ,
          link:"/Adminrole"
        },
  
      ],
    },
  ]
  