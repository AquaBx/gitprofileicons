import iconslist from "devicon/devicon.json";
import fs from "node:fs"
const rewriter = new HTMLRewriter().on("*", {
  element(img) {

    img.removeAttribute("fill");
    img.removeAttribute("style");

  },
})
const icons : {[key:string]:string} = {};
for (const icon of iconslist) {
  const iconname = icon.name



  try {

    let iconset = "plain"
    for (let al of icon.aliases) {
      if (al.alias === "plain"){
        iconset = al.base
      }
    }


    let svg = String(fs.readFileSync((await import("devicon/icons/"+iconname+"/"+iconname+"-"+iconset+".svg")).default))
    svg = svg.replace(/<\?xml.*?>/, '');
    svg = svg.replace(/<svg.*?>/, '');
    svg = svg.replace(/<\/svg.*?>/, '');
    svg = rewriter.transform(svg)
    icons[iconname] = {
      svg:svg,
      color:icon.color
    }

  } catch (error) {
    console.log(error)    
  }
}

fs.writeFileSync('./src/lib/icons.json', JSON.stringify(icons));
