# API de Estudantes - Avansoft Challenge

## Visão Geral

Esta é uma API REST simples para gerenciamento de estudantes, desenvolvida em TypeScript com Express.js. A aplicação permite cadastrar, listar e buscar estudantes, incluindo uma funcionalidade especial que identifica a primeira letra não repetida no nome de cada estudante.

## Características Principais

- API REST com 3 endpoints principais pedidos no desafio
- Validação de dados com Zod
- Armazenamento em memória com padrão Singleton
- Algoritmo otimizado para encontrar primeira letra não repetida
- Arquitetura em camadas (Controller, Service, Repository)

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm

### Passos para executar

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd avansoft_challenge
```

2. Instale as dependências:

```bash
npm install
```

3. Execute em modo desenvolvimento:

```bash
npm run dev
```

4. Para build e execução em produção:

```bash
npm run build
npm start
```

## Endpoints da API

### POST /students

Cadastra um novo estudante.

**Body:**

```json
{
  "name": "Gabriel Silva",
  "grade": 8.5
}
```

**Resposta (201):**

```json
{
  "success": true,
  "message": "Student saved successfully",
  "data": {
    "id": "uuid-gerado",
    "name": "Gabriel Silva",
    "grade": 8.5,
    "firstNotRepeatableChar": "g"
  }
}
```

### GET /students

Retorna lista de todos os estudantes cadastrados.

**Resposta (200):**

```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "data": [
    {
      "id": "uuid-1",
      "name": "Gabriel Silva",
      "grade": 8.5,
      "firstNotRepeatableChar": "g"
    },
    {
      "id": "uuid-2",
      "name": "Anna Costa",
      "grade": 9.0,
      "firstNotRepeatableChar": "_"
    }
  ]
}
```

### GET /students/:id

Retorna dados de um estudante específico pelo ID.

**Resposta (200):**

```json
{
  "success": true,
  "message": "Student retrieved successfully",
  "data": {
    "id": "uuid-1",
    "name": "Gabriel Silva",
    "grade": 8.5,
    "firstNotRepeatableChar": "g"
  }
}
```

## Algoritmo de Primeira Letra Não Repetida

### Descrição do Problema

Para cada estudante, é necessário encontrar a primeira letra do nome que não se repete. Se todas as letras se repetirem, deve retornar o caractere '\_'.

### Solução Implementada

O algoritmo utilizado é baseado na estrutura Map, onde criamos o registro do Map caracter por caracter e depois acessamos ele para incrementar sua ocorrência na string
, após isso basta ver os caracteres que tiveram ocorrência 1 percorrendo novamente o array. Esse é a melhor solução para esse problema além da utilização do REGEX para fazer essa busca em texto

```typescript
export function findFirstNotRepeatableChar(str: string) {
  str = str.toLowerCase();
  const charCount: Record<string, number> = {};

  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (const char of str) {
    if (charCount[char] === 1) {
      return char;
    }
  }
  return "_";
}
```

### Outras Soluções Consideradas

Antes de implementar a solução atual, foram avaliadas outras abordagens para resolver o problema:

#### 1. Busca por Força Bruta (Complexidade O(n²))

Para cada caractere, percorrer toda a string contando suas ocorrências:

```typescript
function findFirstNotRepeatableCharBruteForce(str: string) {
  str = str.toLowerCase();

  for (let i = 0; i < str.length; i++) {
    let count = 0;
    for (let j = 0; j < str.length; j++) {
      if (str[i] === str[j]) {
        count++;
      }
    }
    if (count === 1) {
      return str[i];
    }
  }
  return "_";
}
```

**Desvantagens:**

- Complexidade quadrática O(n²)
- Ineficiente para strings longas
- Reprocessamento desnecessário dos mesmos caracteres

#### 3. Solução Implementada - HashMap/Map (Complexidade O(n))

A solução escolhida utiliza duas passadas com HashMap, oferecendo:

- **Eficiência**: Complexidade linear O(n)
- **Simplicidade**: Código limpo e legível
- **Preservação da ordem**: Mantém a sequência original dos caracteres
- **Otimização de memória**: Armazena apenas caracteres únicos

### Complexidade da Solução Implementada

- **Tempo**: O(n) - onde n é o comprimento da string
- **Espaço**: O(k) - onde k é o número de caracteres únicos na string

## Validações

- **Nome**: Obrigatório, deve ter pelo menos 1 caractere
- **Nota**: Obrigatória, deve estar entre 0 e 10
- **Duplicação**: Não permite cadastrar estudantes com o mesmo nome (case-insensitive)

## Arquitetura

A aplicação segue uma arquitetura em camadas:

- **Controller**: Gerencia requisições HTTP e respostas
- **Service**: Contém lógica de negócio
- **Repository**: Gerencia acesso aos dados (padrão Singleton)
- **Utils**: Funções utilitárias (algoritmo de primeira letra não repetida)
- **Types**: Definições de tipos e schemas de validação

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express.js
- Zod (validação de schemas)
- Nodemon (desenvolvimento)

## Scripts Disponíveis

- `npm run dev`: Executa em modo desenvolvimento com hot-reload
- `npm run build`: Compila o TypeScript para JavaScript
- `npm start`: Executa a versão compilada
- `npm run dev:watch`: Executa com watch mode completo
