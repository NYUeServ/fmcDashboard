const dbClient = require('../database/dbClient')
const client = dbClient.fmcDb
client.connect()

const queryDb = async (tableName, colName) => {
    const query = "SELECT " + colName + " FROM public." + tableName
    let result = await client.query(query)
    return result.rows
}

exports.getOnboardedUsers = async () => {
    const onboardedUsers = await queryDb("preference", "email")
    return { count: onboardedUsers.length }
}

exports.getInterestStats = async () => {
    const interestPackages = await queryDb("preference", "interests")
    let interestInfo = {}
    for (let package of interestPackages) {
        let interests = package["interests"]
        for (let interest of interests) {
            if (interestInfo[interest] === undefined) { interestInfo[interest] = 0 }
            else { interestInfo[interest] += 1 }
        }
    }
    for (let key in interestInfo) {
        if (interestInfo.hasOwnProperty(key)) {
            interestInfo[key] = Math.round((interestInfo[key] / interestPackages.length) * 100)
        }
    }
    return interestInfo
}

exports.getClubStats = async () => {
    const userPackages = await queryDb("user_following", "*")
    let followingUsers = []
    for (let package of userPackages) {
        let user = package["user_email"]
        if (!followingUsers.includes(user)) {
            followingUsers.push(user)
        }
    }
    let averageFollowed = Math.round(userPackages.length / followingUsers.length)

    return { "users_following": followingUsers.length, "average_followed": averageFollowed }
}




