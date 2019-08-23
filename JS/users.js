// import axios from "axios";

// auth = {
//     username:
//     password:
// }

const getUsers = axios.get(`https://api.github.com/repos/LambdaSchool/Sprint-Challenge--User-Interface`)
.then( response => {
    console.log(response);
    let userNames = [];
    //Determine how many pages there will be by first finding total number of forks

    const forkCount = response.data["forks_count"];
    const numberOfPages = Math.ceil(forkCount/100);

    // Build a list of request promises
    const getList = [];

    for (let i = 1; i < numberOfPages+1; i++) {
        getList.push(axios.get(`https://api.github.com/repos/LambdaSchool/Sprint-Challenge--User-Interface/forks?per_page=100&page=${i}`));
    };

    // Execute all requests simultaneously
    return axios.all(getList);
})
    .then( responseArr => {
        // reponseArr is an array of reponses. Each Element is one of the requests
        responseArr.forEach( (response) => {

            // If the status code isn't 200, something went wrong
            if (response.status !== 200) {
                console.log("REQUEST ERROR");
            } else {

                // Filter the data to only contain students that forked this project in august
                const filteredData = response.data.filter( (fork) => {
                    return (fork["created_at"].includes("2019-07-12") || fork["created_at"].includes("2019-07-11") || fork["created_at"].includes("2019-07-10") || fork["created_at"].includes("2019-07-09") || fork["created_at"].includes("2019-07-08"));
                })

                filteredData.forEach( item => {
                    userNames.push(item.owner.login);
                })

            }
        })
})
.catch(error => console.log("Error:", error))

getUsers();