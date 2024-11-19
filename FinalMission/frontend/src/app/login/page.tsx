import React from 'react';
import './style.css';
import Image from 'next/image';
import CartaoInicial from '@/components/cartaoInicial';

function Login() {
  return (
    <>
        <main className='container-principal'>
            <Image src="/pastas.svg" className="image-pastas" alt="Perfil" width={315} height={464} />
            <CartaoInicial title={'Log In'}/>
        </main>
    </>
  );
}

export default Login;
