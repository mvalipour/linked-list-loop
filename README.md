# Problem

Given a linked list, with complexity of `O(n)` detect whether the list contains a loop.

# Solution

Two points both pointing to the head of the list. Go through rounds and in each round move each by the folowing offsets:

```
round 1) 0 and 1
round 2) 1 and 2
round 3) 2 and 3
... and so on
```

if in any round, `a == b`, you have detected a loop!
