document.addEventListener("DOMContentLoaded",()=>{if("IntersectionObserver"in window){const observer=new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.style.animationPlayState="running"
observer.unobserve(entry.target)}})},{threshold:0.1,rootMargin:"50px",},)
document.querySelectorAll(".soflyy_pd_sdk-grid-item").forEach((item)=>{observer.observe(item)})}else{document.querySelectorAll(".soflyy_pd_sdk-grid-item").forEach((item)=>{item.style.animationPlayState="running"})}
document.querySelectorAll(".soflyy_pd_sdk-partner-code code").forEach((codeElement)=>{codeElement.addEventListener("click",function(){const code=this.textContent.trim()
const originalText=this.dataset.originalText||code
navigator.clipboard.writeText(code).then(()=>{this.textContent="Copied!"
this.classList.add("copied")
setTimeout(()=>{this.textContent=originalText
this.classList.remove("copied")},2000)}).catch((err)=>{const textArea=document.createElement("textarea")
textArea.value=code
textArea.style.position="fixed"
document.body.appendChild(textArea)
textArea.focus()
textArea.select()
try{document.execCommand("copy")
this.textContent="Copied!"
this.classList.add("copied")
setTimeout(()=>{this.textContent=originalText
this.classList.remove("copied")},2000)}catch(err){console.error("Failed to copy: ",err)}
document.body.removeChild(textArea)})})})})