## Tracking the scalpel
With async, the `await` converts a rejected promise to an exception. The function itself
returns the rejected promise when it throws an exception.

With non-async, if the promise is rejected, it will be returned in the same way
as a resolved one. (`then` handler is not run!)


## Building Promise.all (Promise_all)
Care is given to empty array of promises.
