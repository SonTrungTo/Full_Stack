// Exercise 9.2 begins here....
let text = "'I'm a cook,' he said, 'It's my job.' Helena's daughter is also a cook,\
and he said, 'She will be a better cook than I am.'\n\
Man, ain't that a story? 'And Helena' is a good person,' he said."

console.log(text.replace(/(\W|^)'/g, `$1"`));
