export class ItemNotFoundError extends Error {
  constructor(paramName: string) {
    super(`The ${paramName} with the given ID was not found.`)
    this.name = 'ItemNotFoundError'
  }
}
