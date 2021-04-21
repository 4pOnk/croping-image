document.onmousemove = () => {
    event.preventDefault();
}
let file = document.getElementById('file');
let main = document.querySelector('main');
let done = document.querySelector('.done');

file.onchange = () => {
    let fd = new FormData();
    fd.append('file', file.files[0]);

    let xhr = new XMLHttpRequest();
    xhr.open('POST','load_image.php');
    xhr.send(fd);

    xhr.onload = () => {
        res = xhr.response;
        file.remove();
        let img = document.createElement('img');
        let edit = document.createElement('div');
        edit.id = 'edit';
        img.src = res;
        main.append(img);
        main.append(edit);

        let dischargeBtn = document.querySelector('.discharge');
        let doneBtn = document.querySelector('.download');
        
        let l = 0;
        let r = 0;
        let t = 0;
        let b = 0;

        let setEditWinSize = () => {
            edit.style.left = l + 'px';
            edit.style.right = r + 'px';
            edit.style.top = t + 'px';
            edit.style.bottom = b + 'px';
        }

        edit.addEventListener('mousedown',(e1) => {
            let startCoords = {
                'x': e1.screenX,
                'y': e1.screenY
            }

            let moveAction = (e) => {
                let newCoords = {
                    'x': e.screenX,
                    'y': e.screenY
                }

                let xMove = startCoords.x > newCoords.x ? 'left' : 'right';
                let yMove = startCoords.y > newCoords.y ? 'top' : 'bottom';

                if(l > 0 || xMove === 'right')
                    l -= startCoords.x - newCoords.x;
                if(r > 0 || xMove === 'left')
                    r += startCoords.x - newCoords.x;
                if(t > 0 || yMove === 'bottom')
                    t -= startCoords.y - newCoords.y;
                if(b > 0 || yMove === 'top')
                    b += startCoords.y - newCoords.y;

                setEditWinSize();
                
                startCoords = {
                    'x': e.screenX,
                    'y': e.screenY
                }
            }
            document.addEventListener('mousemove', moveAction);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', moveAction);
            })
        });
        
        let refreshCrop = () => {
            l = 0;
            r = 0;
            t = 0;
            b = 0;

            setEditWinSize();
        }
        dischargeBtn.addEventListener('click', refreshCrop);

        doneBtn.addEventListener('click', () => {
            let xhtr = new XMLHttpRequest();
            xhtr.open('GET',`/crop_image.php?img_name=${res}&t=${t}&l=${l}&r=${r}&b=${b}&w=${img.getBoundingClientRect().width}&h=${img.getBoundingClientRect().height}`);
            xhtr.send();
            xhtr.onload = () => {
                img.src = xhtr.response;
                res = xhtr.response;
                refreshCrop();
            }
        })
        done.addEventListener('click',() => {
            window.location.href = res;
        })
    }
}