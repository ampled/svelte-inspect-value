/* eslint-disable no-console */
import type { HandleServerError } from '@sveltejs/kit'

export const handleError: HandleServerError = async ({ error }) => {
  console.log('#############################')
  console.log('#     SERVER SIDE ERROR     #')
  console.log('#############################')

  console.log({ error })

  return {
    message: 'Whoops!',
  }
}
