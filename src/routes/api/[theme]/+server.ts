import icons from "$lib/icons.json";

const ICONS_PER_LINE = 15;
const ONE_ICON = 48;
const SCALE = ONE_ICON / (300 - 44);

const THEME : {[key:string]:string} = {
  "dark":"oklch(27.9% 0.041 260.031)",
  "light":"oklch(86.9% 0.022 252.894)"
} 

function getThemeRect(key:string, color:string){
  if (key === "icon"){
    color = color.padEnd(7, "0")
    if (["#ffffff","#FFFFFF"].includes(color)){
      color = "#000000"
    }
    return color+"44"
  }

  if (Object.keys(THEME).includes(key)) {
      return THEME[key]
  }
  return THEME["dark"]
}

function getThemeSvg(key:string, color:string){
  return color
}

function generateSvg(iconNames :string[], theme:string, perLine:number) {
  const iconSvgList = iconNames.map(i => icons[i]);
  const length = Math.min(perLine * 300, iconNames.length * 300) - 44;
  const height = Math.ceil(iconSvgList.length / perLine) * 300 - 44;
  const scaledHeight = height * SCALE;
  const scaledWidth = length * SCALE;
  return `
  <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    ${iconSvgList
      .map(
        (i, index) =>
        `
        <g transform="translate(${(index % perLine) * 300}, ${Math.floor(index / perLine) * 300 })">
          <rect xmlns="http://www.w3.org/2000/svg" width="256" height="256" rx="60" fill="${getThemeRect(theme, i.color)}"/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 -32 192 192" width="256px" fill="${getThemeSvg(theme, i.color)}" height="256px">
            ${i.svg}
          </svg>
        </g>
        `
      )
      .join(' ')}
  </svg>
  `;
}

export function GET({url, params}) {
  const icons_query = url.searchParams.get("icons")
  const icons_list = icons_query ? icons_query.split(",") : Object.keys(icons)

  const perLine : number = parseInt(url.searchParams.get('perline')) || ICONS_PER_LINE;
  const svg = generateSvg(icons_list,params.theme,perLine)
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
