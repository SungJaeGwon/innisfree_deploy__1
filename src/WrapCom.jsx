import React from "react";
import axios from "axios";
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopModalCom from "./wrap/TopModalCom";
import MainModalCom from "./wrap/MainModalCom";
import SearchModalCom from "./wrap/SearchModalCom";
import ShoppingLogModalCom from "./wrap/ShoppingLogModalCom";
import ShoppingBasketModalCom from "./wrap/ShoppingBasketModalCom";
import HeaderCom from "./wrap/HeaderCom";
import MainCom from "./wrap/MainCom";
import FooterCom from "./wrap/FooterCom";
import QuickMenuCom from "./wrap/QuickMenuCom";
import { useDispatch, useSelector } from "react-redux";
import { topModal } from "./reducer/topModal";
import { mainModal } from "./reducer/mainModal";
import { shoppingBasketModal } from "./reducer/shoppingBasketModal";
import { searchModal } from "./reducer/searchModal";
import { shoppingModal } from "./reducer/shoppingModal";
import Sub1Com from "./wrap/sub/Sub1Com";
import Sub2Com from "./wrap/sub/Sub2Com";
import Sub3Com from "./wrap/sub/Sub3Com";
import Sub4Com from "./wrap/sub/Sub4Com";
import Sub5Com from "./wrap/sub/Sub5Com";
import Sub6Com from "./wrap/sub/Sub6Com";
import Sub7Com from "./wrap/sub/Sub7Com";
import Sub9Com from "./wrap/sub/Sub9Com";
import Sub9NoticeCom from "./wrap/sub/Sub9NoticeCom";
import Sub9NoticeInsertFormCom from "./wrap/sub/Sub9NoticeInsertFormCom";
import Sub9NoticeUpdateFormCom from "./wrap/sub/Sub9NoticeUpdateFormCom";
import Sub9NoticeViewCom from "./wrap/sub/Sub9NoticeViewCom";
import SignInCom from './wrap/sub/SignInCom';
import IdSearchCom from './wrap/sub/IdSearchCom';
import SearchResultCom from './wrap/sub/SearchResultCom';
import PwSearchCom from './wrap/sub/PwSearchCom';
import NonmemberCom from './wrap/sub/NonmemberCom';
import SignUpCom from './wrap/sub/SignUpCom';
import HpLoginCom from './wrap/sub/HpLoginCom';
import KakaoLoginCom from './wrap/sub/KakaoLoginCom';
import SignUpFormCom from './wrap/sub/SignUpFormCom';
import ConfirmModal from './wrap/sub/ConfirmModal';
import LoginModal from './wrap/sub/LoginModal';
import MessageModal from './wrap/sub/MessageModal';
import AddressSearchCom from './wrap/sub/AddressSearchCom';
import { address } from './reducer/address';
import { signIn } from './reducer/signIn';
import { adminsignIn } from "./reducer/adminsignIn";
import MypageCom from "./wrap/sub/MypageCom";
import PwSearchResultCom from "./wrap/sub/PwSearchResultCom";

import AdminSignInCom from "./wrap/sub/AdminSignInCom";
import AdminSignUpCom from "./wrap/sub/AdminSignUpCom";
import AdminSignUpFormCom from "./wrap/sub/AdminSignUpFormCom";
import AdminIdSearchCom from "./wrap/sub/AdminIdSearchCom";
import AdminPwSearchCom from "./wrap/sub/AdminPwSearchCom";
import AdminUserinfoCom from "./wrap/sub/AdminUserinfoCom";
import AdminUserinfoModifyCom from "./wrap/sub/AdminUserinfoModifyCom";

import MypageDataUpdateCom from "./wrap/sub/MypageDataUpdateCom";
import MypagePwUpdateCom from "./wrap/sub/MypagePwUpdateCom";
import HpUpdateModal from "./wrap/sub/HpUpdateModal";
import MypageSignOutCom from "./wrap/sub/MypageSignOutCom";
import NaverLoginCom from "./wrap/sub/NaverLoginCom";
import SignUpOkModal from "./wrap/sub/SignUpOkModal";

import ProductViewCom from "./wrap/ProductViewCom";
import CartCom from "./wrap/CartCom";
import { cartMethod } from "./reducer/cartReducer";

export default function WrapCom () {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    React.useEffect(()=>{
        if( localStorage.getItem('INNISFREE_SIGNIN_DATA')!==null ){
            const result = JSON.parse(localStorage.getItem('INNISFREE_SIGNIN_DATA'));
            dispatch(signIn(result));
        }
    },[]);

    React.useEffect(()=>{
        if( localStorage.getItem('INNISFREE_ADMINSIGNIN_DATA')!==null ){
            const result = JSON.parse(localStorage.getItem('INNISFREE_ADMINSIGNIN_DATA'));

            dispatch(adminsignIn(result));
        }
    },[]);
    
    React.useEffect(()=>{
        if( selector.signIn.signInData===null && sessionStorage.getItem('INNISFREE_ADDRESS_KEY')!==null ){
            const result = JSON.parse(sessionStorage.getItem('INNISFREE_ADDRESS_KEY'));
            const 주소 = {
                isAddress: result.isAddress,
                isRemainingAddress: result.isRemainingAddress
            }       
            dispatch(address(주소));
        }
    },[]);

    React.useEffect(()=>{
        let toDay = new Date();

        if(localStorage.getItem('INNISFREE_TOP_MODAL_KEY')!==null){
            const result = JSON.parse(localStorage.getItem('INNISFREE_TOP_MODAL_KEY'));

            if( toDay <= result.expires ){
                dispatch(topModal(false));              
            }
            else{
                dispatch(topModal(true));
            }           
        }
        return;
        
    },[]);

    React.useEffect(()=>{
        let toDay = new Date();

        if(localStorage.getItem('INNISFREE_MAIN_MODAL_KEY')!==null){
            const result = JSON.parse(localStorage.getItem('INNISFREE_MAIN_MODAL_KEY'));
            if( toDay <= result.expires ){
                dispatch(mainModal(false));
            }
            else{
                dispatch(mainModal(true));
            }           
        }
        return;

    },[]);

    const [quickMenuViewProduct, setQuickMenuViewProduct] = React.useState([]);
    const [viewProduct, setViewProduct] = React.useState({
        current : {},
        isFlag : false
    });

    const viewProductMethod=(item, route)=>{
        let obj = {
            번호 : item.번호,
            이미지: `${route}${item.이미지}`,
            베스트: item.베스트,
            제품명: item.제품명,
            상품이름 : item.상품이름,
            정가 : item.정가,
            할인율 : item.할인율,
            판매가 : Math.round(item.정가 * (1- item.할인율)),
            태그1: item.태그1,
            태그2: item.태그2
        }
        setViewProduct({
            ...viewProduct,
            current : obj
        })
    }

    React.useEffect(()=>{
        let imsi = [];
        if(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT') === null){
            if(Object.keys(viewProduct.current).length > 0){
                imsi = [viewProduct.current];
                localStorage.setItem("INNISFREE_SHOPPING_LOG_PRODUCT", JSON.stringify(imsi));
            }    
        }
        else{
            let result = JSON.parse(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT'));
            let filterResult = result.map((item) => (item.번호) === viewProduct.current.번호 ? true : false)
            if(filterResult.includes(true) !== true){
                if(Object.keys(viewProduct.current).length > 0){
                    result = [viewProduct.current, ...result];
                    localStorage.setItem("INNISFREE_SHOPPING_LOG_PRODUCT", JSON.stringify(result));
                }
            }            
        }
        setViewProduct({
            ...viewProduct,
            isFlag : !viewProduct.isFlag
        })
    },[viewProduct.current]);
    
    React.useEffect(()=>{
        if(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT') === null){
            return;
        }
        else{
            let result = JSON.parse(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT'));
            if(result.length > 0){                
                setQuickMenuViewProduct(result);
            }
        }
    },[viewProduct.isFlag]);
    
    React.useEffect(()=>{
        if(localStorage.getItem('INNISFREE_CART_PRODUCT') !== null){
            const obj = JSON.parse(localStorage.getItem('INNISFREE_CART_PRODUCT'));
            dispatch(cartMethod(obj));
        }
    },[])

    React.useEffect(()=>{
        if(selector.signIn.signInData !== null){
            cartDBSelect(selector.signIn.signInData.id);
        }        
    },[selector.signIn])

    const [cart, setCart] = React.useState([]);
    const [ok, setOk] = React.useState(false);

    React.useEffect(()=>{
        if(selector.signIn.signInData !== null){
            cartDBSelect(selector.signIn.signInData.id);
            if(localStorage.getItem('SET_DB_CART') !== null){  
                setCart([]);
                setOk(true);
            }
            else{              
                setCart(selector.cartReducer.cart);
            }
        }
    },[selector.signIn])

    const cartDBSave=(item, idx)=>{
        let formData = new FormData();
        formData.append('userId', selector.signIn.signInData.id);
        formData.append('번호', item.번호);
        formData.append('이미지', item.이미지);
        formData.append('제품명', item.제품명);
        formData.append('할인율', item.할인율);
        formData.append('판매가', item.판매가);
        formData.append('정가', item.정가);
        formData.append('제품코드', item.제품코드);
        formData.append('수량', item.수량);
        axios({
            url: 'http://gwonsj94.co.kr/innisfree/innisfree_cart_table_insert.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data === 1){
                    console.log(res.data);
                }
            }
        })
        .then(()=>{
            cartDBSelect(selector.signIn.signInData.id)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    React.useEffect(()=>{
        if(selector.signIn.signInData !== null){
            if(localStorage.getItem('SET_DB_CART') === null){
                if(cart.length > 0){
                    localStorage.setItem('SET_DB_CART', 'ok');
                    cart.map((item, idx)=>{
                        cartDBSave(item, idx);
                    })
                }
            }
        }
    },[cart])

    const cartDBSelect=()=>{
        let formData = new FormData();
        formData.append('userId', selector.signIn.signInData.id);
        axios({
            url: 'http://sieun.co.kr/innisfree/innisfree_cart_table_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            //console.log(res.data);
            if(res.status === 200){
                if(res.data !== null){          
                    localStorage.setItem('INNISFREE_CART_PRODUCT', JSON.stringify(res.data));
                    dispatch(cartMethod(res.data));
                }
                else{
                    localStorage.setItem('INNISFREE_CART_PRODUCT', JSON.stringify([]));
                    dispatch(cartMethod([]));
                }
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div id="wrap">
                { selector.topModal.isTopModal && <TopModalCom />}
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<HeaderCom />}>
                            <Route index element={ <MainCom viewProductMethod={viewProductMethod}/> } />                        
                            <Route path="/index" element={ <MainCom viewProductMethod={viewProductMethod}/> } />                        
                            <Route path="/sub1" element={ <Sub1Com viewProductMethod={viewProductMethod} />}/>                     
                            <Route path="/sub2" element={ <Sub2Com/>}/>                     
                            <Route path="/sub3" element={ <Sub3Com viewProductMethod={viewProductMethod}/>}/>                     
                            <Route path="/sub4" element={ <Sub4Com/>}/>                     
                            <Route path="/sub5" element={ <Sub5Com/>}/>                     
                            <Route path="/sub6" element={ <Sub6Com/> } />
                            <Route path="/sub7" element={ <Sub7Com/>}/>     
                            <Route path="/sub9" element={ <Sub9Com/>}/>
                            <Route path="/sub9Notice" element={ <Sub9NoticeCom/>}/>
                            <Route path="/sub9Insert" element={ <Sub9NoticeInsertFormCom/>}/>
                            <Route path="/sub9Update" element={ <Sub9NoticeUpdateFormCom/>}/>
                            <Route path="/sub9View" element={ <Sub9NoticeViewCom/>}/>
                            
                            <Route path='/signIn' element={<SignInCom />} />
                            <Route path="/idSearch"  element={<IdSearchCom />} />
                            <Route path="/pwSearch"  element={<PwSearchCom />} />
                            <Route path="/pwSearchResult"  element={<PwSearchResultCom />} />
                            <Route path="/nonMember" element={<NonmemberCom />} />
                            <Route path="/signUp" element={<SignUpCom />} />
                            <Route path="/hplogin" element={<HpLoginCom />} />
                            <Route path="/kakaologin" element={<KakaoLoginCom />} />
                            <Route path="/signupForm" element={<SignUpFormCom />} />
                            <Route path="/searchResult" element={<SearchResultCom />} />
                            <Route path="/adminsignIn" element={<AdminSignInCom />} />                   
                            <Route path="/adminsignUp" element={<AdminSignUpCom />} />                   
                            <Route path="/adminsignUpForm" element={<AdminSignUpFormCom />} />                   
                            <Route path="/adminidSearch" element={<AdminIdSearchCom/>} />                   
                            <Route path="/adminpwSearch" element={<AdminPwSearchCom/>} />
                            <Route path="/Userinfo" element={<AdminUserinfoCom/>} />
                            <Route path="/UserinfoModify" element={<AdminUserinfoModifyCom/>} />
                                               
                            <Route path="/mypage" element={<MypageCom />} />                   
                            <Route path="/mypageDataUpdate" element={<MypageDataUpdateCom />} />   
                            <Route path="/mypagePwUpdate" element={<MypagePwUpdateCom />} />   
                            <Route path="/mypageSignOut" element={<MypageSignOutCom />} />   
                            <Route path="/naver" element={<NaverLoginCom />} />   

                            <Route path="/productView" element={<ProductViewCom />} />   
                            <Route path="/cart" element={<CartCom />} />   
                        </Route>
                    </Routes>
                    <FooterCom />
                    { selector.mainModal.isMainModal && <MainModalCom />}
                    { selector.searchModal.isSearchModal && <SearchModalCom />}
                    { selector.shoppingModal.isShoppingModal && <ShoppingLogModalCom quickMenuViewProduct={quickMenuViewProduct}/>}
                    { selector.shoppingBasketModal.isShoppingBasketModal && <ShoppingBasketModalCom />}
                    { selector.moreViewModal.isMoreViewModal && <LoginModal /> }
                    { selector.confirmModal.isConfirmModal && <ConfirmModal /> }
                    { selector.messageModal.isMessageModal && <MessageModal /> }
                    { selector.addressSearch.isAddressSearch && <AddressSearchCom /> }
                    { selector.hpUpdateModal.isHpUpdate && <HpUpdateModal /> }
                    { selector.signUpModal.isOkModal && <SignUpOkModal />}
                    <QuickMenuCom />
                </HashRouter>
        </div>
    )
}