import React from 'react';
import '../css/warning.css';
import { Link } from 'react-router-dom';

const CheckEmailPage = () => {
  return (
    <div className='body3'>
    <div className="check-email-container">
      <h2 className="check-email-title">Xat emailingizga yuborildi, tekshiring!</h2>
      <h1>✅</h1>
      <br></br>
      <div className='ter2'>
      <Link to="/"><h4 className='ter1'>◀️Bosh Sahifa</h4></Link>
      <Link to="/about"><h4 className='ter1'>Biz haqimizda▶️</h4></Link>
      </div>
    </div>
    </div>
  );
};

export default CheckEmailPage;