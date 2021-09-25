import * as _ from 'lodash'

export const StringHelper = {
  titleCase(text: string): string {
    text = _.startCase(_.toLower(text))
    return text
  }
}
