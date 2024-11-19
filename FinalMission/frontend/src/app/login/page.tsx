import React from 'react';
import './style.css';
import Image from 'next/image';
import CartaoLogIn from '@/components/cartaoLogIn';

function Login() {
  return (
    <>
        <main className='container-principal'>
            <Image src="/pastas.svg" className="image-pastas" alt="Perfil" width={315} height={464} />
            <CartaoLogIn title={'Log In'}/>
        </main>
    </>
  );
}

export default Login;
