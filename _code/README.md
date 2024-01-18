### Query 1

(show basic dummy query)

```graphql
query {
  dummy {
    id
  }
}
```

### Query 2

(show dummy query with all fields)

```graphql
query {
  dummy {
    id
    name
    email
    age
    posts {
      id
    }
  }
}
```

### Query 3

(show users query with 2 fields)

```graphql
query {
  users {
    id
    name
  }
}
```

### Query 4

(show users query with 3 fields)

```graphql
query {
  users {
    id
    name
    email
  }
}
```

### Query 5

(show users query with 4 fields)

```graphql
query {
  users {
    id
    name
    email
    age
  }
}
```

### Query 6

(show users query with 5 fields)

```graphql
query {
  users {
    id
    name
    email
    age
    posts {
      id
    }
  }
}
```

### Query 7

(show users query with 5 fields and nested posts)

```graphql
query {
  users {
    id
    name
    email
    age
    posts {
      id
      title
    }
  }
}
```

### Query 8

(show users query with 5 fields and nested posts and author)

```graphql
query {
  users {
    id
    name
    email
    age
    posts {
      id
      title
      body
      published
      author {
        id
      }
    }
  }
}
```

### Query 9

(show users query with 5 fields and nested posts, author, posts and author)

```graphql
query {
  users {
    id
    name
    email
    age
    posts {
      id
      title
      body
      published
      author {
        id
        name
        email
        age
        posts {
          id
          title
          author {
            id
            posts {
              author {
                id
              }
            }
          }
        }
      }
    }
  }
}
```

### Mutation 1

(show executing create mutation)

```graphql
mutation {
  createUser(data: { name: "Daniel", email: "foo@example.com", age: 25 }) {
    id
    email
    age
  }
}
```

### Query 10

(show added new user)

```graphql
query {
  users {
    id
    email
    name
    age
  }
}
```

### Mutation 2

(show error handling)

```graphql
mutation {
  createUser(data: { name: "Daniel", email: "foo@example.com", age: 25 }) {
    id
    email
    age
  }
}
```

### Mutation 3

(show working fine without age)

```graphql
mutation {
  createUser(data: { name: "Daniel", email: "foo@example.com" }) {
    id
    email
    age
  }
}
```

### Mutation 4

(show not working fine without age)

```graphql
mutation {
  createUser(data: { email: "foo@example.com" }) {
    id
    email
    age
  }
}
```

### Mutation 5

(show executing delete mutation)

```graphql
mutation {
  deleteUser(id: "3") {
    id
  }
}
```

### Query 11

(show deleted user)

```graphql
query {
  users {
    id
    email
    name
    age
  }
}
```

### Mutation 6

(show executing update mutation)

```graphql
mutation {
  updateUser(
    id: "3"
    data: { name: "NewName", email: "sara2h@example.com", age: 66 }
  ) {
    id
    name
    email
    age
  }
}
```

### Query 12

(show updated user)

```graphql
query {
  users {
    id
    name
    email
    age
  }
}
```

### Subscription 1

```graphql
subscription {
  count
}
```

### Apollo Client demo

1. `yarn start` in `graphql-prisma`
2. `yarn start` in `apollo-client`
3. Open `localhost:1234`

### Testing demo

1. `cd _code`
2. `cd unit-testing`
3. `yarn test`
