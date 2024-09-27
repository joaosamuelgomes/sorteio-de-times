
# Sorteador de Times

Essa aplicação web permite realizar o sorteio aleatório de equipes, dividindo jogadores em dois times de forma justa. Foi desenvolvida utilizando **React** e **Tailwind CSS**.

## Funcionalidades

- **Sorteio de Times**: Digite os nomes dos participantes separados por vírgula, e a aplicação os distribuirá aleatoriamente em dois times.
- **Validação de Input**: 
  - O sorteio só será realizado se houver pelo menos 2 participantes.
  - O número de participantes deve ser **par** para garantir uma divisão equilibrada entre os times.
- **Barra de Progresso**: Exibe uma barra de carregamento de 3 segundos antes de apresentar os times sorteados.

## Requisitos

- Node.js (>= 12.x.x)
- npm, pnpm ou yarn

## Como funciona

1. **Entrada de Dados**: O usuário digita os nomes dos participantes, separados por vírgulas, em um campo de texto.
2. **Validação**: O sistema verifica se há pelo menos 2 participantes e se o número de nomes é par. Caso contrário, uma mensagem de erro é exibida.
3. **Sorteio e Divisão**: Os nomes são embaralhados aleatoriamente e divididos em dois times: **ELITE** e **RESTO**.
4. **Exibição dos Resultados**: Após uma barra de progresso de 3 segundos, os times são exibidos na tela.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida.
- **JavaScript**: Lógica de manipulação de dados e interação.

## Autor

Desenvolvido por **João Samuel** ⚡

## Licença

Este projeto está licenciado sob a licença MIT.
