# Título

> ## Caso de sucesso
✅ ⛔️
1. - [ ] Receive a **POST** request on route **/api/add-genre**

> ## Exceções

1. - [ ] Return **BadRequest** if validation returns an error

- infra
  - Server
    - config
      - routes
        [ ] component-name  
        [ ] component-name integration test
- core
  - components
    - component-name
      - domain
        [ ] models (entities, aggregates e value objects)
        [ ] services
      - usecase-name
        [ ] usecase interface
        [ ] usecase implementation
        [ ] usecase test
        [ ] infra.usecase-name.factory
      - repositories
        [ ] component-repository-i
        - infra.repository-implementation
          [ ] component-mongo-repository
          [ ] component-sql-repository    
      - user-interface.api.controllers
              - controller-name           
                    [ ] controller
                    [ ] controller test              
                  - infra.factories
                    [ ] controller-factory
                     [ ] validationSchema inside controller-factory 