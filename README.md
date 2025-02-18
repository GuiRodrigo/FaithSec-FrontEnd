# Faith-Sec

Faith-Sec é o frontend de um sistema de chamada de enfermagem, contendo duas aplicações em uma só. Dependendo da rota acessada, o usuário entra na versão administrativa ou na versão mobile para enfermeiros.

## Funcionalidade

- Acesso padrão: Entra na aplicação do **Administrador**.
- Acesso via `/celular`: Entra na aplicação **mobile para enfermeiros**.

## Requisitos

- Node.js (recomenda-se a versão LTS)
- npm ou yarn
- Backend rodando (é necessário executar o backend disponível no repositório [FaithSec_BackEnd](https://github.com/gabrielleSantosOliveira/FaithSec_BackEnd)).

## Instalação e Execução

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Antes de rodar a aplicação, altere todos os locais onde o IP **172.20.10.2** está definido, substituindo pelo endereço IP da sua rede atual.

3. Execute o ambiente de desenvolvimento:
   ```sh
   npm run dev
   ```
4. Acesse a aplicação no navegador:
   ```
   http://localhost:3000
   ```
5. Para acessar a versão mobile, utilize:
   ```
   http://localhost:3000/celular
   ```

## Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento.
- `npm run build` - Gera a build da aplicação.
- `npm run start` - Inicia a aplicação em modo de produção.
- `npm run lint` - Executa o linting do código.

## Tecnologias Utilizadas

- **Next.js** - Framework para React.
- **React Hook Form** - Gerenciamento de formulários.
- **Zod** - Validação de dados.
- **Tailwind CSS** - Estilização da interface.
- **Radix UI** - Componentes acessíveis.
- **Framer Motion** - Animações fluidas.
- **Axios** - Requisições HTTP.
- **Socket.io-client** - Comunicação em tempo real.

## Documentação das Bibliotecas Principais

- [Next.js](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/get-started)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Radix UI](https://www.radix-ui.com/docs/primitives)
- [Framer Motion](https://www.framer.com/motion/)
- [Axios](https://axios-http.com/docs/intro)
- [Socket.io-client](https://socket.io/docs/v4/client-api/)

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade (`git checkout -b minha-feature`).
3. Faça commit das alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie as mudanças (`git push origin minha-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença MIT. Para mais detalhes, consulte o arquivo `LICENSE`.

