var message1 = document.querySelector(".message1");
var message2 = document.querySelector(".message2");

var contact1 = document.querySelector(".contact1");
var contact2 = document.querySelector(".contact2");

const from = "923072460234";
var condition = false;

const SendMessageToGroup = (event) => {
    var num = contact1.value;
    var index = 0;
    var numArr = [];
    for (var a = 0; a < num.length; a++) {
        if (num[a] === "\n") {
            var number = num.slice(index, a);
            numArr.push(number);
            index = a + 1;

        } else if (a == num.length - 1) {
            var number = num.slice(index, a + 1);
            numArr.push(number);
        }
    }

    event.preventDefault();
    if (message1.value !== "" && contact1.value !== "" && numArr.length !== 0) {
        const send1 = async () => {
            await fetch("https://platform.clickatell.com/messages", {
                headers: { "Content-Type": "application/json", "Authorization": "ekjFPgVNSCCTU7pTqPew7g==" },

                method: "POST",
                body: JSON.stringify({
                    "content": `${message1.value}`,
                    "to": numArr, "from": `${from}`
                })
            })
                .then(res => {
                    if (res) {

                        alert("message send succesfully!!");
                        message1.value = null;
                        contact1.value = null;
                    }
                })
                .catch(err => {
                    alert("network error")
                })
        }
        send1();
    } else {
        alert("field is empty!!")
    }
}

const SendMessageToGroup2 = (event) => {
    event.preventDefault();

    var num2 = contact2.value;
    var index = 0;
    var numArr2 = [];

    for (var a = 0; a < num2.length; a++) {
        if (num2[a] === "\n") {
            var number = num2.slice(index, a);
            numArr2.push(number);
            index = a + 1;

        } else if (a == num2.length - 1) {
            var number = num2.slice(index, a + 1);
            numArr2.push(number);
        }
    }

    if (message2.value !== "" && contact2.value !== "" && numArr2.length > 0) {

        for (var b = 0; b < numArr2.length; b++) {
            if (b !== 0 && b % 5 === 0) {
                setTimeout(async () => {
                    await fetch(`https://platform.clickatell.com/messages/http/send?apiKey=CImNQbsAQACViPIJ2kHxoA==&to=${numArr2[b]}&content=${message2.value}`)
                        .then(res => {

                            condition = true;
                            message2.value = null;
                            contact2.value = null;
                        })
                        .catch(err => {
                            alert("network error")
                        })
                }, 2000)
            } else {
                fetch(`https://platform.clickatell.com/messages/http/send?apiKey=CImNQbsAQACViPIJ2kHxoA==&to=${numArr2[b]}&content=${message2.value}`)
                    .then(res => {

                        condition = true;
                        message2.value = null;
                        contact2.value = null;
                    })
                    .catch(err => {
                        alert("network error")
                    })
            }
        }

        if (condition) {
            alert("message send sucessfully!!")
            condition = false;
        } else if (!condition && numArr2.length == 1) {
            alert("message send sucessfully!!")
            condition = false
        }


    } else {
        alert("field is empty!!")
    }


}

