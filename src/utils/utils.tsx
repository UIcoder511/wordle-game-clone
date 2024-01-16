export const colorShade = (col: string, amt: number) => {
  col = col.replace(/^#/, "");
  if (col.length === 3)
    col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

  const matchResult = col.match(/.{2}/g);
  if (matchResult) {
    let [red, green, blue] = matchResult;

    let [r, g, b] = [
      parseInt(red, 16) + amt,
      parseInt(green, 16) + amt,
      parseInt(blue, 16) + amt,
    ];

    const rs = Math.max(Math.min(255, r), 0).toString(16);
    const gs = Math.max(Math.min(255, g), 0).toString(16);
    const bs = Math.max(Math.min(255, b), 0).toString(16);

    const rr = (rs.length < 2 ? "0" : "") + rs;
    const gg = (gs.length < 2 ? "0" : "") + gs;
    const bb = (bs.length < 2 ? "0" : "") + bs;

    return `#${rr}${gg}${bb}`;
  } else {
    // Handle the case where col.match(/.{2}/g) returns null
    throw new Error("Invalid color format");
  }
};
