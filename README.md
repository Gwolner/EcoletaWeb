# Next Level Week #1

> Anotações da prática do Booster NLW#1 para Web (ReactJS)

## Comandos

* npm start

* npm install react-icons
Instala uma fonte de ícones

* npm install react-router-dom
Lib de roteamente, permitindo que uma página seja redirecionada para uma outra.

* npm install @types/react-router-dom -D

* npm install leaflet react-leaflet
Instala as DUAS dibliotecas de mapas

## Limpando estrutura da aplicação

* Diretório public
Apagar: favicom.ico, logo192.png, logo512.png, manifest.json, robots.txt
Permanece: index.html

* Diretório src
Apagar: App.test.tsx, index.css, logo.svg, serviceWorker.ts, setupTests.ts
Permanece: App.css, App.tsx, index.tsx, react-app-env.d.ts

* Na raiz
README.md

* OBS: Remover dos arquivos remanescentes as dependâncias dos arquivos excluidos!!!


## index.html e div#root

React é uma biblioteca em JS, então tudo que é montado na tela é por meio do JS. Ou seja, a interface é montada a partir do momento que o site carrega. Ou seja, a página é criada em tempo de execução.

Arquivo index.tsx é o primeiro arquivo carregado pelo React. Ele importa o React (comum a todos os arquivos que vamos usar o React) e importa o reactDOM (Para declarar à biblioteca React que o uso será web/desktop), desta forma com o ReactDOM.render(), que serve para informar que se deseja renderizar ("mostrar em tela") o `<app/>` dentro do documento.getElementById('root'). Ou seja, está mandando o React mostrar em tela o arquivo app (`<app/>`).

E o que tem no app? indo no arquivo App.tsx tem o `<h1>Hello World<h1/>`. Isso acontece de forma automatica. Basicamente, o React tem uma div em tela (não precisa ser uma div, mas usamos ja o que vem pronto) e todo conteudo do projeto é exibido dentro desta div.

## Config VSCode 

Plugin padrão de complemento de codigo não vem habilitado pra JS.
Ctrl + shift + p , procurar por `Prefeences: Open Settings (SJON)`

no arquivo setting.json que abrir, inserir os comandos:
```
"emmet.syntaxProfiles": {"javascript": "jsx"},
"emmet.includeLanguages": {"javascript": "javascriptreact"},
```
# JSX

É a possibilidade de escrevermos XML (HTML segue a sintaxe do HTML) diretamente dento do JS/TS.
Componentes que contem HTML dentro de si devem terminar com .jsx (ou no caso, .tsx).

## Componentes (Header)

É a facilidade de separação da aplicação em pequenos blocos que podem ser reutilizados.
OBS: TODO componente deve ter letra MAIUSCULA no início, pra não ser confundido com nenhuma tag do HTML.

Então componente é uma forma de isolar um trecho de código da aplicação, geralmente HTML, CSS ou JS pra poder reutilizar quantas vezes quiser.

# Propriedade

No React são atributos que enviamos para o componente através. 
No TS não se chama de parâmetro, mas sim de Generic.
Mais informações nas anotações de App.tsx e Header.tsx.

# estado e imutabilidade

Estado = Armazenar uma informação a partir do componente.
Ex: usuario precisa clicar em algo no componente, alterar ou inserir algum valor.
São informações mantidas pelo próprio componente!

Imutabilidade = Nunca pode alterar uma informação de estado de uma maneira direta no React.
Ao invés de alterar o valor pre existente, é preciso criar um novo valor para este estado com as modificações que se deseja.

## Mapa na aplicação

O mapa do Google não é viável (precisa de uma conta, cadastrar cartão, usar plano gratuito limitado).
O mapa usado sera um de código aberto chamado Leaflet (https://leafletjs.com/) para JS e 
para React é o https://react-leaflet.js.org/

