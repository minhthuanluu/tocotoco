import React, { useEffect, useState } from 'react';
import classNames from "classnames/bind";
import styles from "./ProductOrder.module.scss";
import images from '../../assets/images';
import Popup from 'reactjs-popup';

const cx = classNames.bind(styles);

function ProductOrder({ showPopUpOrder, closePopupOrder }) {
    const [orderList, setOrderList] = useState(() => {
        const newOrder = JSON.parse(localStorage.getItem("list_orders"));
        return newOrder ?? [];
    })
    useEffect(() => {

    }, [orderList])
    // console.log(orderList);
    return (
        <>
            <Popup open={showPopUpOrder} closeOnDocumentClick onClose={closePopupOrder} className="modal-cart">
                <a className={cx('close')} onClick={closePopupOrder}>
                    &times;
                </a>
                {orderList && orderList.length > 0 ?
                    <div className={cx("modal-pop-up")}>
                        <div className={cx("left-info")}>
                            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                                Lịch Sử Đơn Hàng
                            </h2>
                            <div className={cx("content-width")}>
                                <div className={cx("content-scroll")}>
                                    <dl className={cx("content-flex")}>
                                        <dt>Hình ảnh</dt>
                                        <dt>Tên sản phẩm</dt>
                                        <dt>Chi tiết</dt>
                                        <dt>Số lượng</dt>
                                        <dt>Giá tiền</dt>
                                    </dl>

                                    {
                                        orderList && orderList?.map((item, index) => {
                                            return (
                                                <dl key={index} className={cx("content-flex")}>
                                                    <dd className={cx("content-flex-img")}>
                                                        <img src={item.image} alt="" />
                                                    </dd>

                                                    <dd className={cx("content-flex-name")}>{item.name}</dd>

                                                    <dd className={cx("content-flex-note")}>
                                                        Size: {item.selectedSize} <br />
                                                        {item.selectedTopping.length > 0 ? <>Topping: {item.selectedTopping.map(size => (
                                                            <p>- {size.name}</p>
                                                        ))}</> : ""
                                                        }
                                                    </dd>

                                                    <dd className={cx("content-flex-qty")}>
                                                        {item.selectedQty}
                                                    </dd>

                                                    <dd className={cx("content-flex-price")}>
                                                        {item.selectedPrice}đ
                                                    </dd>
                                                </dl>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div> : <div style={{ fontSize: '20px' }}>Hiện tại chưa có sản phẩm</div>}
            </Popup>
        </>
    );
}

export default ProductOrder;