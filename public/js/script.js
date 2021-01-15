
$(".showMe").click(function () {

    $.get("/api/readdb", function (data) {

        for (let i = 0; i < data.length; i++) {
            const myStr = `<div class = "card">
            <h1>Name : ${data[i].name} </h1>
            <h3>Is Student: ${data[i].isStudent}</h3>
        </div>`
            $(".appendHere").append(myStr)
        }
    })


})

$(".submitBtn").click(function (event) {
    event.preventDefault()

    const userObj = {
        userName: $(".userName").val().trim(),
        trueOrFalse: $(".userStudnt").val().trim().toLowerCase() === "y" ? true : false
    }

    $.post("/api/create", userObj, function(data){
        if(data){

            window.location.href= "/mypage"
        }
    })

    console.log("inside form");


})

