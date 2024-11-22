import React from 'react';
import './style.css';
import Image from 'next/image';
import { CardAcesso } from '@/components/cardAcesso';
import Input from '@/components/input';
import BotaoPrimario from '@/components/botaoPrimario';

function Login() {
  return (
      <main className='container-principal'>
          <Image src="/pastas.svg" className="image-pastas" alt="Pastas" width={500} height={464} />
          <CardAcesso title={'Log In'}>
            <Input text='E-mail: ' value='' label='email' type='email'/>
            <Input text='Senha: ' value='' label='passwprd' type='password'/>
            <BotaoPrimario className='botaoLogIn' textButton='Log In'/>
            <BotaoPrimario className='botaoSignUp' textButton='Sign Up'/>
          </CardAcesso>
      </main>
  );
}

export default Login;
