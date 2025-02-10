function createRoom(a) {
    alert("Create Room clicked!");
}

function viewReviewPannel() {
    document.getElementById("viewReview").classList.remove("hide");
}

async function viewReview() {
    const id = document.getElementById("viewReviewId").value;
    await fetch(`https://review-dyeb.onrender.com/review/admin/view?reviewId=${id}`, {
        method: "GET",
        headers: { 'Content-type': 'application/json' }
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            const array = res;
            var a = "All reviews are:-<br>";
            array.forEach(element => {
                a = a+`${element}<br>`
            });
            document.getElementById("viewReview").innerHTML=`<div onclick="hide('viewReview')" id="cros"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" color="#4d4d4d"fill="none"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor"stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></div><br>${a}`;
        })
}

function createReviewPannel() {
    document.getElementById("createReview").classList.remove("hide");
}

function giveReviewPannel() {
    document.getElementById("giveReview").classList.remove("hide");
}

function hide(val) {
    document.getElementById(val).classList.add("hide");
}

async function createReview() {
    const title = document.getElementById("title").value;
    const crf = await fetch(`https://review-dyeb.onrender.com/review/admin/new-review?title=${title}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ title: title })
    })
        .then(res => {
            return res.json();

        })
        .then(res => {

            const a = async function a() {
                const myurl = "https://facebook.com"
                const url = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${myurl}`)
                document.getElementById("createReview").innerHTML = `<div onclick="hide('createReview')" style="padding: 10px;" id="cros"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" color="#4d4d4d"fill="none"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor"stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></div> <br> <h3 style="max-width: 300px; word-wrap: break-word;">Review created for title: ${res.reviewTitle} </h3><br> Review Id: ${res.reviewId} <br> <img style="padding:25px" src=https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${myurl}></img><br><a href="https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${myurl}" style="text-decoration: none" download="review image.jpg"><button class="btn" >Download</button></a><button class="btn" onclick="reloadPage()">Reload</button>`

            }
            a();
        })
        .then(res => {

        })

}
function reloadPage() {
    location.reload(); // Reloads the current page
}

document.getElementById("admin_svg").addEventListener("click", () => {
    document.getElementById("admin-panel").style.display = "none";
    document.getElementById("user-panel").style.display = "block";
});

document.getElementById("user_svg").addEventListener("click", () => {
    document.getElementById("user-panel").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
});


function submitReview(id) {
    const reviewContent = document.getElementById("reviewContent").value;
    fetch(`https://review-dyeb.onrender.com/review/user/update?reviewId=${id}&reviewContent=${reviewContent}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            if (res.ok) {
                alert("review submitted successfully");
            };
            reloadPage();
        })
}

async function giveReview() {
    const id = document.getElementById("reviewId").value;

    await fetch(`https://review-dyeb.onrender.com/review/user?reviewId=${id}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            if (!res.title) {
                alert("Please enter valid review ID");
            } else {
                document.getElementById("giveReview").innerHTML = `<div onclick="hide('giveReview')" style="padding: 10px;" id="cros"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" color="#4d4d4d"fill="none"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor"stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></div><br><h3>Title: ${res.title}</h3><br><input class="review_content" type="text" name="reviewContent" placeholder="Please enter Your review" id="reviewContent" size="80px" required>
                <button class="btn" type="submit" onclick="submitReview(${id})">submit</button><button class="btn" onclick="reloadPage()">Reload</button>`



            }
        })


}