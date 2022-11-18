const { faker } = require('@faker-js/faker/locale/zh_CN');

const createTree = async () => {
    const param = {
        name: faker.name.fullName(),
        note: faker.lorem.paragraph(),
        cover: faker.image.imageUrl()
    }
    const res = await fetch("http://localhost:3000/api/Trees", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(param)
    })
    const data = await res.json()
    console.log(data)
}

const createPerson = async () => {
    const param = {
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        gender: faker.name.gender(),
        name: faker.name.fullName(),
        tid: 2,
    }
    const res = await fetch("http://localhost:3000/api/Members", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(param)
    })
    const data = await res.json()
    console.log(data)
}

createPerson()
    .then(() => {
        console.log("done")
    })