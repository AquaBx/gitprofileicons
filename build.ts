import iconslist from "devicon/devicon.json";
import fs from "node:fs"

const icons : {[key:string]:string} = {};
for (const icon of iconslist) {
  const iconname = icon.name

  const rewriter = new HTMLRewriter().on("svg", {
    element(img) {
      let padding = 32

      img.setAttribute("width", `${256}px`);
      img.setAttribute("height", `${256}px`);

      let viewBox = img.getAttribute("viewbox").split(" ").map(i => parseInt(i))
      viewBox[0] -= padding
      viewBox[1] -= padding
      viewBox[2] += padding*2
      viewBox[3] += padding*2

      img.setAttribute("viewbox", viewBox.join(" "));
      img.setAttribute("fill", icon.color);

      // img.append('<rect xmlns="http://www.w3.org/2000/svg" width="256" height="256" rx="60" fill="${getTheme(theme)}"/>')
    },
  });

  try {

    let iconset = "plain"
    for (let al of icon.aliases) {
      if (al.alias === "plain"){
        iconset = al.base
      }
    }


    let svg = String(fs.readFileSync((await import("devicon/icons/"+iconname+"/"+iconname+"-"+iconset+".svg")).default))
    icons[iconname] = rewriter.transform(svg)

  } catch (error) {
    console.log(error)    
  }
}

fs.writeFileSync('./src/lib/icons.json', JSON.stringify(icons));
