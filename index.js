
const tagContainer = document.getElementById('tag-container');
const input = document.getElementById('myInput');

let tags = [];

input.addEventListener('keyup', function(e){
    if (e.key === 'Enter') {
        tags.push(input.value);
        addTags();
        input.value = '';
    }
})

function addTags(){
    reset();
    tags.slice().reverse().forEach(function(tag){
        const input = createTag(tag);
        tagContainer.prepend(input);
    })
}

function reset() {
    document.querySelectorAll('.tag').forEach(function(tag){
        tag.parentElement.removeChild(tag);
    })
}

function createTag(label) {
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    const span = document.createElement('span');
    span.innerHTML = label;
    const closeBtn = document.createElement('i');
    closeBtn.setAttribute('class', 'material-icons');
    closeBtn.setAttribute('data-item', label);
    closeBtn.innerHTML = '&#10060;';

    div.appendChild(span);
    div.appendChild(closeBtn);
    return div;
}

document.addEventListener('click', function(e) {
    if (e.target.tagName === 'I') {
        const value = e.target.getAttribute('data-item');
        const index = tags.indexOf(value);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        addTags();
    }
})

// send button funcionality

function send() {
    valid = true;

    if (tags.length < 1) {
        valid = false;
    }

    tags.forEach(function(tag) {
        if (!validateEmail(tag)) {
            valid = false;
        };
    })

    if (valid == true) {
        sendEmail();
    }
    else {
        document.getElementById('error').style.display = "block";
        document.getElementById('success').style.display = "none";        
    }
}
// email validation
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function sendEmail() {
    document.getElementById('error').style.display = "none";
    document.getElementById('success').style.display = "block";  
}