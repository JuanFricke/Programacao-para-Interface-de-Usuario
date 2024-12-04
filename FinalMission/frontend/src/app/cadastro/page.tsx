"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { CardAcesso } from '@/components/cardAcesso';
import Input from '@/components/input';
import './style.css';
import Link from 'next/link';
import { Api } from '@/apiindex';

function Cadastro() {
  const router = useRouter()
  const [usuario, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const body = { email, senha, usuario };  

    try {
      // if (carregando || !email || !senha || !usuario) {
      //   return;
      // }
      setCarregando(true);
      const response = await Api({ body, rota: "signup", method: "POST" });
console.log(response);

      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("id_usuario", response.id_usuario);
      router.push("/painel");
    } catch (error) {
      setErro("Erro ao efetuar o cadastro.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className='container-principal'>
      <Image src="/pastas.svg" className="image-pastas" alt="Pastas" width={500} height={464} />
      <CardAcesso title={'Cadastro'} onSubmit={entrar}>
        <Input
          text='Usuário: '
          value={usuario}
          setValue={setUser}
          label='user'
          required={true}
        />
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
          label='password'
          type='password'
          required={true}
        />
        <Input
          text='Confirmar senha: '
          value={senhaConfirma}
          setValue={setSenhaConfirma}
          label='confirma-password'
          type='password'
          required={true}
        />
        <div className="container-botao">
          <button className='btn btn-primary' type='submit' disabled={!((senha == senhaConfirma) && email && !carregando)}>
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
        {erro &&
          <p className='msg-erro'>{erro}</p>
        }
        <div className="container-botao">
          <Link href='/login' className='btn btn-secondary'>Login</Link>
        </div>
      </CardAcesso>
    </main>
  );
}

export default Cadastro;
