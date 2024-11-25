"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { CardAcesso } from '@/components/cardAcesso';
import Input from '@/components/input';
import './style.css';
import Link from 'next/link';

function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    
    try {
      if (carregando || !email || !senha) {
        return;
      }
      setCarregando(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("auth_token", data.token);
        router.push("/dashboard");
      } else {
        setErro(data.message);
      }
      setCarregando(false);
    } catch (error) {
      setErro("Erro ao tentar fazer login.");
      setCarregando(false);
    }
  }

  return (
    <main className='container-principal'>
      <Image src="/pastas.svg" className="image-pastas" alt="Pastas" width={500} height={464} />
      <CardAcesso title={'Entrar'} onSubmit={entrar}>
        <Input
          text='E-mail: '
          value={email}
          setValue={setEmail}
          label='email'
          type='email'
          required={true}
        />
        <Input
          text='Senha: '
          value={senha}
          setValue={setSenha}
          label='passwprd'
          type='password'
          required={true}
        />
        <div className="container-botao">
          <button className='btn btn-primary' type='submit' disabled={!email || !senha || carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
        {erro &&
          <p className='msg-erro'>{erro}</p>
        }
        <div className="container-botao">
          <Link href='/cadastro' className='btn btn-secondary'>Cadastrar</Link>
        </div>
      </CardAcesso>
    </main>
  );
}

export default Login;
