"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { CardAcesso } from '@/components/cardAcesso';
import Input from '@/components/input';
import './style.css';
import Link from 'next/link';
import { Api } from '@/apiindex';

function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const body = { email, senha };  

    try {
      if (carregando || !email || !senha) {
        return;
      }
      setCarregando(true);
      const response = await Api({ body, rota: "login" , method: "POST" });

      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("id_usuario", response.id_usuario);
      router.push("/painel");
    } catch (error) {
      setErro("Erro ao tentar fazer login.");
    } finally {
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
