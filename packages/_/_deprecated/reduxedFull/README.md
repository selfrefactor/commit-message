# Reduxed

React hooks helpers for Redux-like setup

## Side effects

If return `false` they are making no change to the state

## Known issues

### Need for custom `shouldRender` method

Otherwise each change would lead to rerendering.

## Notes

> Pair actions

```javascript
const pairHolder = {
  fn : (state, [ fooAction, barAction ]) => {
    console.log(fooAction, barAction)
    // Side effect can return new root state
    // ============================================
    // return {...state, fooStore: {}}

    // Can call pass
    // ============================================
    // return {}

    // Or it can return a new action
    // ============================================
    return fooInc()
  },
}

const pairSideEffect = producePair([
  {
    action : FOO_ROUTE_CHANGE,
    label  : 'foo',
  },
  {
    action : BAR_ROUTE_CHANGE,
    label  : 'bar',
  },
], pairHolder)
```
