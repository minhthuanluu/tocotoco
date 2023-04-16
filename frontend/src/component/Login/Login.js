import React, { useState } from 'react';
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Popup from 'reactjs-popup';
import images from "../../assets/images";
import { useDispatch, useSelector } from 'react-redux';
import { loadSignin } from '../../redux/actions/signinAction';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Login({ showPopUpLogin, closePopupLogin, setShowPopUpLogin }) {

    const [customer_email, setCustomer_email] = useState("");
    const [customer_password, setCustomer_password] = useState("");

    const signin_user = useSelector(state => state.signin.data)

    const dispatch = useDispatch()

    const handleChangeEmail = (e) => {
        setCustomer_email(e.target.value);
    }
    const handleChangePassword = (e) => {
        setCustomer_password(e.target.value);
    }

    const loginAccount = async (email, password) => {
        await dispatch(loadSignin(email, password))
        if(signin_user){
            setShowPopUpLogin(false)
            window.location.reload(false);
        };
       
    }

    return (
        <>
            <Popup open={showPopUpLogin} closeOnDocumentClick onClose={closePopupLogin} className="modal-login">
                <a className={cx('close')} onClick={closePopupLogin}>
                    &times;
                </a>
                <div className={cx("modal-pop-up")}>
                    <figure><img src={images.logohead} style={{ width: '100%', marginBottom: '30px' }} /></figure>
                    <dl>
                        <dt>Email: </dt>
                        <dd><input type="text" value={customer_email} onChange={handleChangeEmail} /></dd>
                    </dl>
                    <dl>
                        <dt>Mật khẩu: </dt>
                        <dd><input type="text" value={customer_password} onChange={handleChangePassword} /></dd>
                    </dl>
                    <button className='btn-order-product' style={{ marginTop: '30px' }} onClick={() => loginAccount(customer_email, customer_password)}>
                        Đăng Nhập
                    </button>
                </div>
            </Popup>
        </>
    );
}

export default Login;