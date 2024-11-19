import React from 'react';
import './style.css';
import Image from 'next/image';

function Login() {
  return (
    <>
        <main className='container-principal'>
            <Image src="/pastas.svg" className="image-pastas" alt="Perfil" width={315} height={464} />
        </main>
    </>
  );
}

export default Login;
