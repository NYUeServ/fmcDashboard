const userInfo = require("../logic/userInfo.js")
module.exports = function (app) {
    app.get("/avgClubs", async (req, res) => {
        const clubInfo = await userInfo.getClubStats()
        const usersFollowing = { "average_followed": clubInfo["average_followed"] }
        res.send(usersFollowing)
    })
    app.get("/usersFollowing", async (req, res) => {
        const clubInfo = await userInfo.getClubStats()
        const avgClubsFollowed = { "users_following": clubInfo["users_following"] }
        res.send(avgClubsFollowed)
    })
    app.get("/onboardedUsers", async (req, res) => {
        const onboardedUsers = await userInfo.getOnboardedUsers()
        res.send(await onboardedUsers)
    })
    app.get("/interestStats", async (req, res) => {
        const stats = await userInfo.getInterestStats()
        res.send(await stats)
    })


}
