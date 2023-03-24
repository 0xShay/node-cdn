function uploadFile() {

    let formData = new FormData()

    let uploadedFile = document.getElementById("uploadedFile").files[0];
    formData.append("uploadedFile", uploadedFile);

    let password = document.getElementById("password").value;
    formData.append("password", password);

    let xhr = new XMLHttpRequest();

    xhr.open("post", "/upload", true);

    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            let perc = ((e.loaded / e.total) * 100).toFixed(2);
            document.getElementById("progressBar").innerText = (perc + "%");
            document.getElementById("progressBar").style.width = (perc + "%");
        }
    };

    xhr.onerror = (e) => {
        alert("An error occured.");
    };

    xhr.onload = () => {
        alert(xhr.response);
        if (xhr.status == 200) {
            window.location.href = xhr.response;
        };
    };

    xhr.send(formData);

}