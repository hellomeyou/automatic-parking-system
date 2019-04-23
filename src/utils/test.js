const message = 'ANS:is_initialize={"is_initialize":"no"}'

const type = message.match(/ANS:(.*?)=/)[1]
const obj = message.replace(message.match(/ANS:(.*?)=/)[0], '')
console.log(type)
// console.log(obj)
switch (type) {
    case 'is_initialize':
        console.log(obj)
        console.log(JSON.parse(obj))
        break
}
console.log(JSON.stringify(''))
