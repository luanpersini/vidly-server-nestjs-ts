# Load Genres

Load all persisted **genres**.

## Success

1. - [ ] Receive a **GET** request on route **/api/load-genres**
2. - [ ] Return **Ok** with the genres data
<br/>

## Exceptions

1. - [ ] Return **Unexpected Error** if something fails while trying to create the new genre

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
      - usecase-name
        [ ] usecase interface
        [ ] usecase implementation
        [ ] usecase test
        [ ] infra.usecase-name.factory
      - repositories
        [ ] component-repository-i
        - infra.repository-implementation
          [ ] component-mongo-repository     
          [ ] component-mongo-repository test     
      - user-interface
          - Api.Controllers
              - controller-name           
                    [ ] controller
                    [ ] controller test                    
                  - infra.factories
                    [ ] controller-factory                 