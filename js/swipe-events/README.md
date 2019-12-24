## Start listening
```
swipeEvents = new SwipeEvents(element)
swipeEvents.onSwipe('right', onSwipeRightCallback)
swipeEvents.onSwipe('left', onSwipeLeftCallback)
```

## Remove listeners
```
swipeEvents.unobserve()
```