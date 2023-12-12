const button = document.getElementById("button")
const switch_style_btn = document.getElementById("switch-style-btn")
const getReverseArray100 = (arr) => {
    const array_100 = Array(100).fill(0).map((n, i) => n + i)
    return array_100.filter(el => !arr.includes(el))
}

const printReverse = (raw_message, split) => {
    const message = raw_message.split(split).map(Number)
    const value = getReverseArray100(message)
    const heatmap = document.getElementById("heatmap-output")
    let new_heatmap = ""
    for (let i = 0; i < 100; i++) {
        new_heatmap += (value.includes(i) ? `<p class="black-rec"></p>` : `<p class="white-rec"></p>`)
    }
    heatmap.innerHTML = new_heatmap
    let copy_btn = document.getElementById("copy-btn")
    res.value = value.map(el => el < 10 ? "0" + el : el).join(split)
    copy_btn.innerHTML = `Sao chép ${value.length} số`
    copy_btn.disabled = false
}
const reverse = () => {
    const req = document.getElementById("req").value
    let res = document.getElementById("res")

    const raw_message = req.trim()

    if (raw_message.split(" ").every(isNumeric)) {
        printReverse(raw_message, " ")
        return
    }

    if (raw_message.split(",").every(isNumeric)) {
        printReverse(raw_message, ",")
        return
    }
    res.value = "Dãy số không hợp lệ"

}

button.onclick = () => printInput()
switch_style_btn.onclick = () => SwithStyle()

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
function copyText() {
    copyMe("res")
}

function copyMe(value) {
    // Get the text field
    var copyText = document.getElementById(value);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    copyText.style = "background-color: #ACCEF7;"
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value).then(function (x) {
        alert("Nội dung sao chép: " + copyText.value);
        copyText.style = "background-color: #FFFFFF;"
    });
}
function copyInputText() {
    copyMe("req")
}

const randomEngine = () => {
    let new_50_array = [getRandomNumberIn(0, 100)]
    for (let i = 0; i < 49; i++) {
        let value = new_50_array[0]
        while (
            new_50_array.includes(value)
        ) {
            value = getRandomNumberIn(0, 100)
        }
        new_50_array.push(value)
    }
    new_50_array.sort((a, b) => a - b)
    return new_50_array
}

const randomEngineFocus = () => {
    let random = getRandomNumberIn(0, 35)
    let range = 65
    let new_50_array = [getRandomNumberIn(random, random + range)]
    for (let i = 0; i < 44; i++) {
        let value = new_50_array[0]
        while (
            new_50_array.includes(value)
            // || ignore_values.includes(value)
        ) {
            value = getRandomNumberIn(random, random + range)
        }
        new_50_array.push(value)
    }
    for (let i = 0; i < 5; i++) {
        let value = new_50_array[0]
        while (
            new_50_array.includes(value)
            // || ignore_values.includes(value)
        ) {
            value = getRandomNumberIn(0, 100)
        }
        new_50_array.push(value)
    }
    new_50_array.sort((a, b) => a - b)
    // const array_100 = Array(100).fill(0).map((n, i) => n + i)
    // const reverse_new_50_array = array_100.filter(el => !new_50_array.includes(el))

    // for (let i = 0; i < 50; i++) {
    //     const found_index = reverse_new_50_array.findIndex(el => el === ignore_values[i])
    //     if (found_index >= 0) {
    //         let value = reverse_new_50_array[found_index]
    //         while (
    //             reverse_new_50_array.includes(value) ||
    //             value === ignore_values[i]
    //         ) {
    //             value = getRandomNumberIn0To99()
    //         }
    //         reverse_new_50_array[found_index] = value
    //     }
    // }
    return new_50_array
}

function random() {
    // Get the text field
    const random = randomEngine()
    printInput(random)
    switch_style_btn.textContent = "Kiểu dấu cách"
}

function randomFocus() {
    // Get the text field
    const random = randomEngineFocus()
    printInput(random)
    switch_style_btn.textContent = "Kiểu dấu cách"
}

function printInput(random) {
    if (random) {
        const req = document.getElementById("req")
        req.value = random.map(el => el < 10 ? "0" + el : el).join(" ")
    } else {
        const req = document.getElementById("req")
        if (req.value.split(" ").every(isNumeric)) {
            random = req.value.split(" ").map(Number)
        }
        if (req.value.split(",").every(isNumeric)) {
            random = req.value.split(",").map(Number)
        }
    }
    const heatmap = document.getElementById("heatmap-input")
    let new_heatmap = ""
    for (let i = 0; i < 100; i++) {
        new_heatmap += (random.includes(i) ? `<p class="black-rec"></p>` : `<p class="white-rec"></p>`)
    }
    heatmap.innerHTML = new_heatmap
    let copy_10_input = document.getElementById("copy-10-input")
    copy_10_input.innerHTML = ""
    console.log({ copy_10_input })
    const chunkSize = 25
    for (let i = 0; i < random.length; i += chunkSize) {
        const chunk = random.slice(i, i + chunkSize);
        copy_10_input.innerHTML += `<textarea class="10" id="ten_${i}" cols="27" rows="1" type="text">${chunk.map(el => el < 10 ? "0" + el : el).join(" ")}</textarea><div></div>`

    }
    for (let i = 0; i < random.length; i += chunkSize) {
        var inputElement = document.getElementById(`ten_${i}`);
        console.log(inputElement)
        inputElement.onclick = () => copyMe(`ten_${i}`)
    }
    reverse()
}

function getRandomNumberIn(from, to) {
    return from + Math.floor(Math.random() * (to - from))
    // return getRandomNumberIn0To9() * 10 + getRandomNumberIn0To9()
}

function getRandomNumberIn0To9() {
    return Math.floor(Math.random() * 10)
}
function SwithStyle() {
    switch (switch_style_btn.textContent) {
        case "Kiểu dấu cách": {
            switch_style_btn.textContent = "Kiểu dấu phẩy"
            ChangeStyleInId("req", ",")
            ChangeStyleInId("res", ",")
            for (let i = 0; i < 100; i += 10) {
                ChangeStyleInId(`ten_${i}`, ",")
            }
        }
            break;
        case "Kiểu dấu phẩy": {
            switch_style_btn.textContent = "Kiểu dấu cách"
            ChangeStyleInId("req", " ")
            ChangeStyleInId("res", " ")
            for (let i = 0; i < 100; i += 10) {
                ChangeStyleInId(`ten_${i}`, " ")
            }
        }
            break;
    }
}

function ChangeStyleInId(id, style) {
    const dom = document.getElementById(id)
    if (dom) {
        if (dom.value.split(" ").every(isNumeric)) {
            dom.value = dom.value.split(" ").join(style)
        }
        if (dom.value.split(",").every(isNumeric)) {
            dom.value = dom.value.split(",").join(style)
        }
    }
}

async function UpdateIp() {
    fetch("https://api.ipify.org?format=json").then((value) => value.json()).then((data) => {
        const ip = document.getElementById("ip")
        ip.textContent = `IP: ${data.ip}`
    })

}

UpdateIp()