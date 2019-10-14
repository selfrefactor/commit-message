const input = `
eq(R.add('1', '2'), 3)
eq(R.add(1, '2'), 3)
eq(R.add(true, false), 1)
eq(R.add(null, null), 0)
eq(R.add(undefined, undefined), NaN)
eq(R.add(new Date(1), new Date(2)), 3)
`
