import { ethers } from "ethers"


const adminLoading = () => {
    return {
        type: 'ADMIN_LOADING'
    }
}

const adminLoaded = (payload) => {
    return {
        type: 'ADMIN_LOADED',
        payload
    }
}

const adminError = (payload) => {
    return {
        type: 'ADMIN_ERROR',
        payload
    }
}

export const loadAdmin = () => {
    return async (dispatch, getState) => {
        dispatch(adminLoading())
        try {
            const { paymentContract, account, tokenContract } = getState().web3
            const accounts = await paymentContract.getAllAccount()
            // delete repeated accounts
            const uniqueAccounts = [...new Set(accounts)]
            //console.log(uniqueAccounts)
            const allInvestments = []
            const allRewards = []
            const adminRewards = []

            const trasformDate = (date) => {
                const newDate = new Date(date * 1000);
                const year = newDate.getFullYear();
                const month = newDate.getMonth();
                const day = newDate.getDate();
                const hour = newDate.getHours();
                const minutes = newDate.getMinutes();
                const seconds = newDate.getSeconds();
                const finalDate = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
                return finalDate;
            }

            uniqueAccounts.map(async (account) => {
                const level = await paymentContract.accountLevel(account)
                const Level = parseInt(level)
                for (let i = 0; i < Level; i++) {
                    const investment = await paymentContract.viewMyInvestmentPlan(account, i + 1)

                    allInvestments.push({

                        account: investment.account,
                        level: parseInt(investment.level),
                        date: trasformDate(parseInt(investment.date)),
                        generatedOrder: investment.generatedOrder,
                        payed: investment.payed,
                        userRetired: investment.userRetired,
                        banned: investment.banned,
                        timestamp: parseInt(investment.date),
                        canceled: investment.canceled,
                        cancelDate: trasformDate(parseInt(investment.cancelDate))
                    })


                    const referPlan = await paymentContract.referalPlans(account, i + 1)


                    allRewards.push({
                        account: referPlan.account,
                        level: parseInt(referPlan.level),
                        balance: parseFloat(ethers.utils.formatEther(referPlan.balance)),
                        accountCap: parseFloat(ethers.utils.formatEther(referPlan.accountCap)),
                        banned: referPlan.banned,
                        desactivatedDate: trasformDate(parseInt(referPlan.desactivatedDate)),
                        referer: referPlan.referer,
                        retireCap: parseFloat(ethers.utils.formatEther(referPlan.retireCap)),
                        status: referPlan.status
                    })


                }
            })


            for(let i = 0; i < 10; i++){
                const AdminCounter = await paymentContract.referalPlans("0x27573dd1742FB3a759Ea1e33318567444259b053", i+1)
                adminRewards.push({
                    account: AdminCounter.account,
                    level: parseInt(AdminCounter.level),
                    balance: parseInt(ethers.utils.formatEther(AdminCounter.balance)),
                    accountCap: parseInt(ethers.utils.formatEther(AdminCounter.accountCap)),
                    banned: AdminCounter.banned,
                    desactivatedDate:  trasformDate(parseInt(AdminCounter.desactivatedDate)),
                    referer: AdminCounter.referer,
                    retireCap: parseInt(ethers.utils.formatEther(AdminCounter.retireCap)),
                    status: AdminCounter.status
                })
            }
            //console.log(allInvestments)
            //console.log("accounts", accounts)
            dispatch(adminLoaded({ tokenContract, paymentContract, allInvestments, allRewards, adminRewards }))
        } catch (error) {
            dispatch(adminError(error.message))
            console.log(error)
        }
    }
}


