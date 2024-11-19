import './style.css';
import Image from 'next/image';
import Input from '@/components/input';
import BotaoPrimario from '@/components/botaoPrimario';

interface cartaoInicial {
    title: string,
}

export default function cartaoInicial({title}: cartaoInicial) {
    return (
        <div className="container-cartao">
            <Image src="/logo.png" className="logo" alt="Logo da empresa" width={160} height={160} />
            <h1>{title}</h1>
            <Input text='E-mail: ' value='' label='email' type='email'/>
            <Input text='Senha: ' value='' label='passwprd' type='password'/>
            <BotaoPrimario className='botaoLogIn' textButton='Log In'/>
            <BotaoPrimario className='botaoSignUp' textButton='Sign Up'/>
        </div>
    );
}