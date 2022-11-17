import * as ejs from 'ejs';

async function template(url:string, variables?:{}) 
{
    const response = await fetch(url, {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache'
    })
    if (!response.ok) {
        return make("p",`${response.statusText} (${url})`);
    }
    const html = await response.text();
    if(variables) {
        return make("div", ejs.render(html, variables));
    }
    return make("div", html);
}
 
function make(tag:string, html_or_children?:string|HTMLElement|HTMLElement[], 
    options?: { id?:string, className?:string, onclick?:()=>void }    
    ):HTMLElement {
        const new_element = document.createElement(tag);

    if(html_or_children) {
        if(typeof html_or_children === "string") {
            new_element.innerHTML = html_or_children;
        }else if(html_or_children instanceof HTMLElement) {
            new_element.appendChild(html_or_children);
        }else{
            for(const n of html_or_children) {
                new_element.appendChild(n);
            }
        }
    }
    if(options !== undefined) {
        new_element.onclick = (e:MouseEvent)=> {  
            if(options.onclick) {
                options.onclick();
            }
        }
        new_element.className = options.className ?? "";
        new_element.id = options.id ?? "";
    }

    return new_element;
}

function id(id:string) : HTMLElement {
    const elm = document.getElementById(id);
    if(!elm) {
        throw Error("Can't find the element named "+id);
    }
    return elm;
}

function add(parent:Node, child:Node) {
    parent.appendChild(child);
}

function removeChildren(node:Node) {
    while(node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export {template, make, id, add, removeChildren}
