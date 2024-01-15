import React from 'react';
import axios from 'axios';
import './scss/sub6.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useSelector, useDispatch } from 'react-redux';
import { viewProduct } from '../../reducer/viewProduct';
import { viewProductIsFlag } from '../../reducer/viewProductIsFlag';
import { quickMenuViewProduct } from '../../reducer/quickMenuViewProduct';
import { useNavigate } from 'react-router-dom';

export default function Sub6ComChildSwipe({path}){

    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        product: []
    })

    React.useEffect(()=>{     
        axios({
            url: './data/sub/sub6_1_1.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    product: res.data.product,
                });
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]);

    const onClickViewProduct=(e, item, route)=>{
        e.preventDefault();
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
        navigate('/productView');
        localStorage.setItem('INNISFREE_VIEWPRODUCT', JSON.stringify(obj));
        dispatch(viewProduct(obj));
    }

    React.useEffect(()=>{
        let imsi = [];
        if(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT') === null){
            if(Object.keys(selector.viewProduct.current).length > 0){
                imsi = [selector.viewProduct.current];
                localStorage.setItem("INNISFREE_SHOPPING_LOG_PRODUCT", JSON.stringify(imsi));
                dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));  
            }
        }
        else{
            let result = JSON.parse(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT'));
            let filterResult = result.map((item) => (item.번호) === selector.viewProduct.current.번호 ? true : false)
            if(filterResult.includes(true) !== true){
                if(Object.keys(selector.viewProduct.current).length > 0){
                    result = [selector.viewProduct.current, ...result];
                    localStorage.setItem("INNISFREE_SHOPPING_LOG_PRODUCT", JSON.stringify(result));
                    dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));  
                }
            }            
        }
    },[selector.viewProduct.current]);
    
    React.useEffect(()=>{
        if(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT') === null){
            return;
        }
        else{
            let result = JSON.parse(localStorage.getItem('INNISFREE_SHOPPING_LOG_PRODUCT'));
            if(result.length > 0){                
                dispatch(quickMenuViewProduct(result));
            }
        }
    },[selector.viewProductIsFlag.isFlag]);

    return(
        <div id='sub6' className='sub6-swiper'>
            <Swiper
                pagination={{type: 'progressbar'}}
                navigation={true}
                modules={[Pagination, Navigation]}
                spaceBetween={50}
                slidesPerView={3}
                rewind={true}
            >        
            {     
                state.product.length > 0 &&   
                (                        
                    state.product.map((item, idx)=>{
                        return(   
                            <SwiperSlide>
                                <a href="!#" key={idx}  onClick={(e)=>onClickViewProduct(e, item, './images/sub/sub6/')}>
                                    <div className="img">                                            
                                        <img src={`./images/sub/sub6/${item.이미지}`} alt="" />          
                                        <div className={`over-img${item.변경이미지 === '' ? ' on' : ''}`}>
                                            <img src={`./images/sub/sub6/${item.변경이미지}`} alt="" />
                                        </div> 
                                        <div className="hover-btn">
                                            <button className='heartBtn'></button>
                                            <button className='cartBtn'></button>
                                            <button className='buyBtn'></button>
                                        </div>
                                    </div>  
                                    <div className="product-txt-box">
                                        <div className="name">
                                            <strong>{item.베스트}</strong> {item.제품명}
                                        </div>
                                        <div className="price-box">
                                            <span className={`price${item.할인율 === 0 ? ' on' : ''}`}>{Math.round(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}</span>

                                            {
                                                item.할인율 !== 0 &&                                                
                                                <span className='sale'>{Math.round(item.할인율 * 100)}%</span>
                                            }                                                       
                                            {                                            
                                                item.할인율 !== 0 &&
                                                <strong className='cost'>{item.정가.toLocaleString('ko-KR')}</strong>
                                            }                                         
                                        </div>
                                        <div className="sticker-box">
                                            <span className={item.증정 === '' ? 'off' : ''}>{item.증정}</span>
                                        </div>
                                        <div className="hash-box">
                                            <button className={`tag1${item.태그1 === '' ? ' on' : ''}`}>{'#'+item.태그1}</button>
                                            <button className={`tag2${item.태그2 === '' ? ' on' : ''}`}>{'#'+item.태그2}</button>
                                        </div>
                                        <div className="review">
                                            <img src="./images/sub/sub6/ico_star.png" alt="" />
                                            <p>4.8 (3,531)</p>
                                        </div>
                                    </div>                                      
                                </a>
                            </SwiperSlide>
                        )
                    })  
                ) 
            }
            </Swiper>
        </div>
    );
};