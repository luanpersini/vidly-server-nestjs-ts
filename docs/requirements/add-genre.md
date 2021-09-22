# Add Genre

Create and persist a new **genre**.

## Success

1. - [ ] Receive a **POST** request on route **/api/add-genre**
2. - [ ] **Validate** the requested data
3. - [ ] Create the new **genre** 
4. - [ ] Return **Ok** with the created genre data
<br/>

## Exceptions

1. - [ ] Return **BadRequest** if validation returns an error
2. - [ ] Return **Forbidden** if there is already an genre with the given name 
3. - [ ] Return **Unexpected Error** if something fail while trying to create the new genre

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
                    [ ] validationSchema inside controller-factory                     