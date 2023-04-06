import useCase from './useCase'
import miniCase from './miniCase'
import page from './page'
import webUser from './webUser'

/* Create localized string type */
const localeString = {
  title: 'Loclaized string',
  name: 'localeString',
  type: 'object',
  fields: [
    {
      title: 'English',
      name: 'en',
      type: 'string',
    },
    {
      title: 'Russian',
      name: 'ru',
      type: 'string',
    },
    {
      title: 'Georgian',
      name: 'ka',
      type: 'string',
    },
  ],
}

/* Create localized text type */
const localeText = {
  title: 'Loclaized Text',
  name: 'localeText',
  type: 'object',
  fields: [
    {
      title: 'English',
      name: 'en',
      type: 'text',
    },
    {
      title: 'Russian',
      name: 'ru',
      type: 'text',
    },
    {
      title: 'Georgian',
      name: 'ka',
      type: 'text',
    },
  ],
}

export const schemaTypes = [localeString, localeText, page, useCase, miniCase, webUser]
