const createAction = type => payload => ({
  type,
  payload,
})

export const increment = createAction('INCREMENT_INIT')
