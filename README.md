# Next Level Week #1

> Anotações da prática do Booster NLW#1 para Web (ReactJS)

## Comandos

* 



## Limpadno estrutura da aplicação

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

Arquivo index.tsx é o primeiro arquivo carregado pelo React. Ele importa o React (comum a todos os arquivos que vamos usar o React) e importa o reactDOM (Para declarar à biblioteca React que o uso será web/desktop), desta forma com o ReactDOM.render(), que serve para informar que se deseja renderizar ("mostrar em tela") o <app/> dentro do documento.getElementById('root'). Ou seja, está mandando o React mostrar em tela o arquivo app (<app/>).

E o que tem no app? indo no arquivo App.tsx tem o <h1>Hello World<h1/>. Isso acontece de forma automatica. Basicamente, o React tem uma div em tela (não precisa ser uma div, mas usamos ja o que vem pronto) e todo conteudo do projeto é exibido dentro desta div.

## Config VSCode 

Plugin padrão de complemento de codigo não vem habilitado pra JS.
Ctrl + shift + p , procurar por `Prefeences: Open Settings (SJON)`

no arquivo setting.json que abrir, inserir os comandos:
```
"emmet.syntaxProfiles": {"javascript": "jsx"},
"emmet.includeLanguages": {"javascript": "javascriptreact"},
```


