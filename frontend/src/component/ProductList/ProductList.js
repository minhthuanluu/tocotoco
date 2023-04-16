import React, { useEffect, useState } from 'react';
import logo from '../../logo.svg';
import '../../App.css';

import classNames from 'classnames/bind'
import style from './ProductList.module.scss'
import ProductDetail from '../ProductDetail/ProductDetail';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';

const cx = classNames.bind(style)

function ProductList({ data, loading, category, value, handleChange }) {
    const [showPopUp, setShowPopUp] = useState(false)
    const [showProductDetail, setShowProductDetail] = useState([])


    function onShowProductDetail(product) {
        setShowPopUp(!false)
        setShowProductDetail(product)
    }

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            {
                                category?.map(cate => (
                                    <Tab key={cate._id} label={cate.name} value={cate._id} />
                                ))
                            }
                        </TabList>
                    </Box>
                </TabContext>
            </Box>
            {
                (loading ?
                    <img src={logo} className="App-logo" alt="logo" />
                    :
                    (data && data.length > 0) ?
                        <>
                            <div className={cx('product-flex', 'list-product')}>
                                {
                                    data.map((product, index) => (
                                        <>
                                            <div key={index} className={cx('product-box', 'product-card')}>
                                                <figure className="img-wrap"><img src={product.image} alt={product.name} /></figure>
                                                <div className='product-card-content'>
                                                    <div className="product-title">{product.name}</div>
                                                    <div className="product-price">
                                                        <div className="product-origin-price">Giá {product.price.toLocaleString()}đ</div>
                                                    </div>
                                                    <button key={index} className={cx('btn-detail', 'btn-order-product')}
                                                        onClick={() => onShowProductDetail(product)}>
                                                        Xem Chi tiết
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>

                            <ProductDetail showPopUp={showPopUp} setShowPopUp={setShowPopUp} showProductDetail={showProductDetail}></ProductDetail>
                        </>
                        : <div style={{ fontSize: '20px', textAlign: 'center', height: '300px', paddingTop: '150px' }}>Data is empty</div>
                )
            }
        </>
    );
}

export default ProductList;