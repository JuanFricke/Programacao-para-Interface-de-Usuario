// Copia de frontend\src\app\login\page.tsx

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

    //Vinícius - Estrutura do JSON está correta
    const body = { email, senha };  

    try {
      if (carregando || !email || !senha) {
        return;
      }
      setCarregando(true);
      /*
        Vinícius - Alterei a rota de login
        Coloquei explicitamente o método POST também.
      */
      const response = await Api({ body, rota: "/api/login", method: 'POST' });

      /*
        Vinícius
        Implementei testes em função do status HTTP da requisição
        para ler o JSON de retorno e mostrar os erros
      */
      if (response.statusCode === 200){
        //Sucesso: Armazenar os dados de autenticação

        /*
          Vinícius
          Não existe retorno de token atualmente no backend
          Poderia ser alterado a Strut do JSON de retorno 
          e criado algum tipo de token, JWT talvez, no backend
        */
        //localStorage.setItem("auth_token", response.token);

        localStorage.setItem("id_usuario", response.id_usuario);
        router.push("/painel");
      } else {
        //Se o status não for 200, exibe a mensagem de erro vinda da request
        setErro(response.error || "Erro ao tentar fazer login.");
      }
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
