import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from "classnames/bind";
import styles from "./ProductCart.module.scss";
import images from '../../assets/images';
import Popup from 'reactjs-popup';
import { loadOrder } from '../../redux/actions/orderAction'

const cx = classNames.bind(styles);

let paymentMethods = [{
    id: 1,
    name: 'Thanh toán Momo',
    note: ''
}, {
    id: 2,
    name: 'Thanh toán tiền mặt',
    note: 'Xin vui lòng thanh toán sau khi nhận hàng!! Cám ơn'
}]
function ProductCart({ showPopUpCart, closePopupCart }) {
    const [isChecked, setIsChecked] = useState(1);
    const [customer_name, setCustomer_name] = useState("");
    const [customer_phone, setCustomer_phone] = useState("");
    const [customer_note, setCustomer_note] = useState("");
    const [priceItem, setPriceItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0);
    const [user, setuser] = useState('')
    const [infoCustomer, setInfoCustomer] = useState(() => {
        const newCustomer = JSON.parse(localStorage.getItem("ListInfoCustomer"));
        return newCustomer ?? [];
    });

    const [productCart, setProductCart] = useState(() => {
        const newProductCart = JSON.parse(localStorage.getItem("list_products"));
        return newProductCart ?? [];
    });

    useEffect(() => {
        const init = () => {
            const _user = localStorage.getItem('User');
            if (_user) setuser(_user)

        };
        init();
    }, []);

    const dispatch = useDispatch();
    const productReducer = useSelector(state => state.orders)

    const ref = useRef();
    // Xử lý điều kiện khi input nhập không đủ ký tự và số
    const enabledButton =
        customer_name.length >= 2 && customer_phone.length >= 10;

    function handleData(productCart) {
        let tempArr = []
        for (let i = 0; i < productCart?.length; i++) {
            const element = productCart[i];
            if (element.id === productCart[i].id) {
                tempArr.push({
                    id: element.id,
                    qty: element.selectedQty,
                    price: element.selectedPrice,
                    totalTopping: element.totalPriceTopping
                })
            }
        }

        const priceItem = tempArr.map((arr) => arr.price)
        const totalPrice = tempArr.reduce((a, c) => a + (c.price * c.qty) + c.totalTopping, 0)
        setPriceItem(priceItem)
        setTotalPrice(totalPrice)
    }

    // Thêm thông tin và sản phẩm của khách hàng
    const handleSubmit = (customer_name, customer_phone, customer_note, productCart) => {
        setInfoCustomer((prev) => {
            const listInfoCustomer = [
                ...prev,
                {
                    customer_name: customer_name.replace(/ +(?= )/g, "").trim(),
                    customer_phone: customer_phone,
                    customer_note: customer_note,
                    productCart: productCart,
                    payload:
                        isChecked === 1
                            ? "Thanh toán bàng Momo"
                            : "Thanh toán bằng Cash",
                },
            ];
            localStorage.setItem(
                "ListInfoCustomer",
                JSON.stringify(listInfoCustomer)
            );
            
            return listInfoCustomer;
        });

        const sample = {
            "createAt": "2023-02-28T02:20:26.107Z",
            "_id": "63fd64fa899be90d9f6e6de9",
            "user": {
                "isAdmin": false,
                "street": "Trường Chinh",
                "apartment": "Gousto House",
                "zip": "1000000",
                "city": "Hồ Chí Minh",
                "country": "Viet Nam",
                "_id": "63ec3dc5623f5c7576f25c6f",
                "name": customer_name,
                "email": "minhthuan.luu@gmail.com",
                "passwordHash": "$2a$10$VzFvJOjCDdkJdfI8sWjuEuRaXtbZC5L8QeLKq1rTkqbKcUe.WwWlK",
                "phone": customer_phone,
                "__v": 0,
                "id": "63ec3dc5623f5c7576f25c6f"
            },
        }
       
        const user = JSON.parse(localStorage.getItem('User'));
        const product = productCart;

        dispatch(loadOrder(product,user));

    };

    // Chức năng giúp input chỉ được nhập số
    const handleChangeNumber = (e) => {
        const rex = /^[0-9\b]+$/; //rules
        if (e.target.value === "" || rex.test(e.target.value)) {
            setCustomer_phone(e.target.value);
        }
    };

    // Chức năng giúp input chỉ được nhập chữ
    const handleChangeUser = (e) => {
        const rex = /^[a-zA-Z\s\W]+$/; //rules
        if (e.target.value === "" || rex.test(e.target.value)) {
            setCustomer_name(e.target.value);
        }
    };

    const handleDeletedItem = (countIndex) => {
        setProductCart(productCart.filter((item, index) => index !== countIndex))
    }
    useEffect(() => {
        handleData(productCart)

        if (productCart) {
            const jsonProductLocal = JSON.stringify(productCart)
            localStorage.setItem('list_products', jsonProductLocal)
        }
        dispatch(loadOrder(productCart, user))
    }, [productCart])


    return (
        <>
            <Popup open={showPopUpCart} closeOnDocumentClick onClose={closePopupCart} className="modal-cart">
                <a className={cx('close')} onClick={closePopupCart}>
                    &times;
                </a>
                {productCart && productCart.length > 0 ?
                    <div className={cx("modal-pop-up")}>
                        <div className={cx("left-info")}>
                            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                                Thông Tin Sản Phẩm
                            </h2>
                            <div className={cx("content-width")}>
                                <div className={cx("content-scroll")}>
                                    <dl className={cx("content-flex")}>
                                        <dt>Hình ảnh</dt>
                                        <dt>Tên sản phẩm</dt>
                                        <dt>Chi tiết</dt>
                                        <dt>Số lượng</dt>
                                        <dt>Giá tiền</dt>
                                        <dt>Xóa</dt>
                                    </dl>

                                    {
                                        productCart && productCart?.map((item, index) => {
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
                                                        {priceItem && priceItem[index].toLocaleString()}đ
                                                    </dd>

                                                    <dd className={cx("content-flex-del")}>
                                                        <button onClick={() => handleDeletedItem(index)}>Xóa</button>
                                                    </dd>
                                                </dl>
                                            );
                                        })
                                    }
                                    {productCart.length !== 0 && (
                                        <>
                                            <dl className={cx("content-flex", "last-info")}>
                                                <dd>Tổng cộng</dd>
                                                <dd>{totalPrice.toLocaleString()}đ</dd>
                                            </dl>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx("right-info")}>
                            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                                Thông Tin Khách Hàng
                            </h2>
                            <div className={cx("info-user")}>
                                <p>
                                    <span>Họ tên:</span>
                                    <input
                                        type="text"
                                        ref={ref}
                                        value={customer_name}
                                        onChange={handleChangeUser}
                                    />
                                </p>
                                <p>
                                    <span>Số DT:</span>
                                    <input
                                        type="text"
                                        maxLength="11"
                                        value={customer_phone}
                                        onChange={handleChangeNumber}
                                    />
                                </p>
                                <p>
                                    <span>Ghi chú:</span>
                                    <textarea
                                        type="text"
                                        value={customer_note}
                                        onChange={e => setCustomer_note(e.target.value)}
                                    />
                                </p>
                            </div>

                            <div className={cx("info-payload")}>
                                <h5>Hình thức thanh toán</h5>
                                <div>
                                    {paymentMethods.map((pay) => (
                                        <>
                                            <label key={pay.id}>
                                                <input
                                                    type="radio"
                                                    checked={isChecked === pay.id}
                                                    onChange={() => setIsChecked(pay.id)}
                                                />
                                                &nbsp;{pay.name}
                                            </label>
                                            &emsp;
                                        </>
                                    ))}
                                </div>

                                <ul>
                                    {paymentMethods.map((pay) => (
                                        <li
                                            key={pay.id}
                                            style={
                                                isChecked === pay.id
                                                    ? { display: "block" }
                                                    : { display: "none" }
                                            }
                                        >
                                            {pay.id === 1 ? (

                                                <>
                                                    {/* <QRCode
                                                id="qrcode"
                                                value={customer_name + customer_phone}
                                                size={100}
                                                level="H"
                                            /> */}
                                                    <img src={images.qrmomo} />
                                                    <h5>{totalPrice.toLocaleString()} VND</h5>
                                                    {/* <p>{t('homepage.notePay')}</p> */}
                                                </>
                                            ) : (
                                                <h6>{pay.note}</h6>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={cx("btn-cart")}>
                                <button enabledButton={enabledButton} onClick={() => handleSubmit(customer_name, customer_phone, customer_note, productCart)}>
                                    Đặt Hàng
                                </button>
                            </div>

                        </div>
                    </div> : <div style={{ fontSize: '20px' }}>Hiện tại chưa có sản phẩm</div>}
            </Popup>

        </>
    );
}

export default ProductCart;