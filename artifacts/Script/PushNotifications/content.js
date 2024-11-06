// try {
//     const r = await p9.push.send({
//         title: 'Hello Planet9!',
//         body: 'This is the main text',
//     })
//     log.info('Result after push', r);
// } catch (error) {
//     log.error('Error: ', error);
// }


try {
    const r = await p9.push.send({
        title: 'Concern Created',
        body: 'Awaiting approval...',
        launchpadName: 'Low Code for SAP Launchpad',
    })
    log.info('Result after push', r.results[0]);
} catch (error) {
    log.error('Error: ', error);
    console.log(error.results[0])
}

// const opts = {
    
//     parameters: {},
//     headers: {
// 	"connect.sid": "s:0s9pJe0Yth6_-vpIllAqpS5fzJkCqu-z.avshrLMmOvfe86s0JoM12yJxzAmxBhb+uFb3yZYHNKY",
// 	"sap-usercontext": "sap-client=800"
// },
//     data: {},
//     body: {},
// }



// try {
//     // Send api request.
//     const response = await apis.send(opts);
//     // Log response data
//     console.log(response.data)
// } catch(error) {
//     log.error("Error in request: ", error);
//     return fail();
// }
