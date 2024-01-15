import React, { useRef } from "react";
import './scss/section1.scss';
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

export default function Section1Com () {

    const [state, setState] = React.useState({
        slide: [],
        n: 0
    });

    React.useEffect(()=>{
        axios({
            url: './data/index/section1.json',
            method: 'GET'
        }).then((res)=>{
            setState({
                ...state,
                slide: res.data.slide,
                n: res.data.slide.length
            })
        }).catch((err)=>{
            console.log("AXIOS 오류 " + err );
        })
    },[])

    return (
        <div id="section1">
            <div className="container" >
                <div className="slide-view" >
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        pagination={{
                            type: 'fraction',
                            formatFractionCurrent: function (number) {
                                return ('0' + number);
                            },
                            formatFractionTotal: function (number) {
                                return ('0' + number);
                            },
                            renderFraction: function (currentClass, totalClass) {
                                return '<span class="' + currentClass + '"></span>' +
                                       ' / ' +
                                       '<span class="' + totalClass + '"></span>';
                            }
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="swiper"
                    >
                    {
                        state.slide.map((item, idx)=>{
                            return(
                                <SwiperSlide key={item.no}>
                                    <div className="cnt-area">
                                        <div className="tag-card">
                                            <span className={`card-st1 ${item.sale?'':' on'}`}>{Math.round(item.sale*100)}%</span>
                                            <span className="card-st2">{item.gift}</span>
                                        </div>
                                        <div className="name">
                                            <span className="prd-name1">{item.title1}</span>
                                            <span className="prd-name2">{item.title2}</span>
                                        </div>
                                        <div className="price">
                                            <span className="t-unit">{item.price.toLocaleString('ko-KO')}원</span>
                                            <span className="t-cost">{item.regular.toLocaleString('ko-KO')}</span>
                                        </div>
                                    </div>
                                    <div className="img-box">
                                            <img src={`./images/index/${item.image}`} alt="" />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}