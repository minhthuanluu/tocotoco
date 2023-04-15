import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import classNames from 'classnames/bind';
import style from './ProductDetail.module.scss'

const cx = classNames.bind(style)

function ProductDetail({ showPopUp, setShowPopUp, showProductDetail }) {
    const [productDetail, setProductDetail] = useState(getProductListToLocalStore())
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedTopping, setSelectedTopping] = useState([])
    const [countQty, setCountQty] = useState(1);

    const closePopup = () => {
        setShowPopUp(false)
        setSelectedPrice(null)
        setCountQty(1)
        setSelectedTopping([])
    }

    const setLocalStoreProductDetail = async (product, secSize) => {

        await setProductDetail(prev => {
            if (product.id !== product.id) {
                product.id = Math.random()
            }

            product.selectedSize = secSize?.name
            product.selectedPrice = secSize?.price
            product.selectedQty = countQty
            product.selectedTopping = selectedTopping
            product.totalPriceTopping = handleTotalPriceTopping()
            const newArrProduct = [...prev, product]
            const jsonProductLocal = JSON.stringify(newArrProduct)

            localStorage.setItem('list_products', jsonProductLocal)

            return newArrProduct
        });
    }

    function onAddProductDetail(product) {
        let secSize = product.size.find(item => item.price == selectedPrice);
        if (secSize?.name) {
            setLocalStoreProductDetail(product, secSize)
        } else {
            secSize = { name: "M", price: product.price }
            setLocalStoreProductDetail(product, secSize)

        }
        setShowPopUp(false)
        window.location.reload(false);
    }


    function getProductListToLocalStore() {
        const product_local = JSON.parse(localStorage.getItem('list_products'))
        return product_local ?? []
    }

    function handleSelectPrice(e) {
        setSelectedPrice(e.target.value);
    }

    function handleSelectTopping(value, topping_name, topping_price, index) {
        setSelectedTopping(prev => {
            if (!value.target.checked) {
                return selectedTopping.filter(item => item.name !== topping_name)
            } else {
                return [{
                    id: index,
                    name: topping_name,
                    price: topping_price
                }, ...prev]
            }
        })
    }

    function handleTotalPriceTopping() {
        let sum = 0
        for (let index = 0; index < selectedTopping.length; index++) {
            sum += selectedTopping[index].price;
        }
        return sum;
    }

    useEffect(() => {
    }, [productDetail])

    return (
        <Popup open={showPopUp} closeOnDocumentClick onClose={closePopup} className="modal-detail">
            <a className={cx('close')} onClick={closePopup}>
                &times;
            </a>
            <div className={cx('product-flex')}>
                <figure><img src={showProductDetail.image} alt={showProductDetail.name} /></figure>
                <div className={cx('product-detail')}>
                    <div className={cx('product-name')}>{showProductDetail.name}</div>
                    <div className={cx('product-price')}>
                        <span>Giá</span> {selectedPrice ? Number(selectedPrice).toLocaleString() : showProductDetail?.price?.toLocaleString()}đ</div>
                    <div className={cx('product-qty')}>
                        <span>Số lượng</span>&nbsp;
                        <button className={countQty === 1 ? cx('disable') : ""} onClick={() => setCountQty(countQty - 1)}>-</button>
                        &nbsp;&nbsp;{countQty}&nbsp;&nbsp;
                        <button onClick={() => setCountQty(countQty + 1)}>+</button>
                    </div>
                    <div className={cx('product-size')}><span>Size</span> &nbsp;
                        <select value={selectedPrice ?? 'undefined'} onChange={handleSelectPrice}>
                            {
                                showProductDetail?.size?.map(sizes => (
                                    <option value={sizes.price}>{sizes.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className={cx('product-topping')}>
                        <span>Topping</span> &nbsp;
                        <ul>
                            {showProductDetail?.topping?.map((toppings, index) => (
                                <li key={index}>
                                    <label><input
                                        type="checkbox"
                                        onChange={(value) => handleSelectTopping(value, toppings.name, toppings.price, index)} />&nbsp;{toppings.name}</label>
                                    <span>{toppings.price.toLocaleString()}đ</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={cx('product-submit')}>
                        <button onClick={() => onAddProductDetail(showProductDetail)}>Thêm Vào Giỏ Hàng</button>
                    </div>
                </div>
            </div>
        </Popup>

    );
}

export default ProductDetail;