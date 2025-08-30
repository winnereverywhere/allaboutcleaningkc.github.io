if(typeof Blob!=='undefined'&&(typeof FormData==='undefined'||!FormData.prototype.keys)){const global=typeof globalThis==='object'?globalThis:typeof window==='object'?window:typeof self==='object'?self:this
const _FormData=global.FormData
const _send=global.XMLHttpRequest&&global.XMLHttpRequest.prototype.send
const _fetch=global.Request&&global.fetch
const _sendBeacon=global.navigator&&global.navigator.sendBeacon
const _match=global.Element&&global.Element.prototype
const stringTag=global.Symbol&&Symbol.toStringTag
if(stringTag){if(!Blob.prototype[stringTag]){Blob.prototype[stringTag]='Blob'}
if('File'in global&&!File.prototype[stringTag]){File.prototype[stringTag]='File'}}
try{new File([],'')}catch(a){global.File=function File(b,d,c){const blob=new Blob(b,c||{})
const t=c&&void 0!==c.lastModified?new Date(c.lastModified):new Date()
Object.defineProperties(blob,{name:{value:d},lastModified:{value:+t},toString:{value(){return'[object File]'}}})
if(stringTag){Object.defineProperty(blob,stringTag,{value:'File'})}
return blob}}
function ensureArgs(args,expected){if(args.length<expected){throw new TypeError(`${expected} argument required, but only ${args.length} present.`)}}
function normalizeArgs(name,value,filename){if(value instanceof Blob){filename=filename!==undefined?String(filename+''):typeof value.name==='string'?value.name:'blob'
if(value.name!==filename||Object.prototype.toString.call(value)==='[object Blob]'){value=new File([value],filename)}
return[String(name),value]}
return[String(name),String(value)]}
function normalizeLinefeeds(value){return value.replace(/\r?\n|\r/g,'\r\n')}
function each(arr,cb){for(let i=0;i<arr.length;i++){cb(arr[i])}}
const escape=str=>str.replace(/\n/g,'%0A').replace(/\r/g,'%0D').replace(/"/g,'%22')
class FormDataPolyfill{constructor(form){this._data=[]
const self=this
form&&each(form.elements,(elm)=>{if(!elm.name||elm.disabled||elm.type==='submit'||elm.type==='button'||elm.matches('form fieldset[disabled] *'))return
if(elm.type==='file'){const files=elm.files&&elm.files.length?elm.files:[new File([],'',{type:'application/octet-stream'})]
each(files,file=>{self.append(elm.name,file)})}else if(elm.type==='select-multiple'||elm.type==='select-one'){each(elm.options,opt=>{!opt.disabled&&opt.selected&&self.append(elm.name,opt.value)})}else if(elm.type==='checkbox'||elm.type==='radio'){if(elm.checked)self.append(elm.name,elm.value)}else{const value=elm.type==='textarea'?normalizeLinefeeds(elm.value):elm.value
self.append(elm.name,value)}})}
append(name,value,filename){ensureArgs(arguments,2)
this._data.push(normalizeArgs(name,value,filename))}
delete(name){ensureArgs(arguments,1)
const result=[]
name=String(name)
each(this._data,entry=>{entry[0]!==name&&result.push(entry)})
this._data=result}*entries(){for(var i=0;i<this._data.length;i++){yield this._data[i]}}
forEach(callback,thisArg){ensureArgs(arguments,1)
for(const[name,value]of this){callback.call(thisArg,value,name,this)}}
get(name){ensureArgs(arguments,1)
const entries=this._data
name=String(name)
for(let i=0;i<entries.length;i++){if(entries[i][0]===name){return entries[i][1]}}
return null}
getAll(name){ensureArgs(arguments,1)
const result=[]
name=String(name)
each(this._data,data=>{data[0]===name&&result.push(data[1])})
return result}
has(name){ensureArgs(arguments,1)
name=String(name)
for(let i=0;i<this._data.length;i++){if(this._data[i][0]===name){return true}}
return false}*keys(){for(const[name]of this){yield name}}
set(name,value,filename){ensureArgs(arguments,2)
name=String(name)
const result=[]
const args=normalizeArgs(name,value,filename)
let replace=true
each(this._data,data=>{data[0]===name?replace&&(replace=!result.push(args)):result.push(data)})
replace&&result.push(args)
this._data=result}*values(){for(const[,value]of this){yield value}}
['_asNative'](){const fd=new _FormData()
for(const[name,value]of this){fd.append(name,value)}
return fd}
['_blob'](){const boundary='----formdata-polyfill-'+Math.random(),chunks=[],p=`--${boundary}\r\nContent-Disposition: form-data; name="`this.forEach((value,name)=>typeof value=='string'?chunks.push(p+escape(normalizeLinefeeds(name))+`"\r\n\r\n${normalizeLinefeeds(value)}\r\n`):chunks.push(p+escape(normalizeLinefeeds(name))+`"; filename="${escape(value.name)}"\r\nContent-Type: ${value.type||"application/octet-stream"}\r\n\r\n`,value,`\r\n`))
chunks.push(`--${boundary}--`)
return new Blob(chunks,{type:"multipart/form-data; boundary="+boundary})}
[Symbol.iterator](){return this.entries()}
toString(){return'[object FormData]'}}
if(_match&&!_match.matches){_match.matches=_match.matchesSelector||_match.mozMatchesSelector||_match.msMatchesSelector||_match.oMatchesSelector||_match.webkitMatchesSelector||function(s){var matches=(this.document||this.ownerDocument).querySelectorAll(s)
var i=matches.length
while(--i>=0&&matches.item(i)!==this){}
return i>-1}}
if(stringTag){FormDataPolyfill.prototype[stringTag]='FormData'}
if(_send){const setRequestHeader=global.XMLHttpRequest.prototype.setRequestHeader
global.XMLHttpRequest.prototype.setRequestHeader=function(name,value){setRequestHeader.call(this,name,value)
if(name.toLowerCase()==='content-type')this._hasContentType=true}
global.XMLHttpRequest.prototype.send=function(data){if(data instanceof FormDataPolyfill){const blob=data['_blob']()
if(!this._hasContentType)this.setRequestHeader('Content-Type',blob.type)
_send.call(this,blob)}else{_send.call(this,data)}}}
if(_fetch){global.fetch=function(input,init){if(init&&init.body&&init.body instanceof FormDataPolyfill){init.body=init.body['_blob']()}
return _fetch.call(this,input,init)}}
if(_sendBeacon){global.navigator.sendBeacon=function(url,data){if(data instanceof FormDataPolyfill){data=data['_asNative']()}
return _sendBeacon.call(this,url,data)}}
global['FormData']=FormDataPolyfill}