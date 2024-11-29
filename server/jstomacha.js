function jstomacha(jsCode) {
  try {
    console.log("Starting reverse transpilation...");

    const jsToMachalangkeyword = [
      { js: "else if", macha: "illandre" }, 
      { js: "else", macha: "illava" },
      { js: "let", macha: "idu" },
      { js: "const", macha: "irlli" },
      { js: "console.log", macha: "macha.helu" },
      { js: "function", macha: "kelsa" },
      { js: "return", macha: "kodu" },
      { js: "if", macha: "enandre" },
      { js: "for", macha: "allivargu" },
      { js: "while", macha: "alliatanaka" },
      { js: "true", macha: "sari" },
      { js: "false", macha: "tappu" },
      { js: "break", macha: "muri" },
      { js: "continue", macha: "mundehogu" },
      { js: "null", macha: "khali" },
      { js: "undefined", macha: "enuilla" },
      { js: "object", macha: "vastu" },
      { js: "array", macha: "gumpu" },
    ];

    const lines = jsCode.split("\n");
    const outputLines = [];

    for (let line of lines) {
      let transformedLine = line.trim();

      // Handle console.log specifically
      if (transformedLine.startsWith("console.log")) {
        transformedLine = transformedLine.split("console.log").join("macha.helu");
        outputLines.push(transformedLine);
        continue; // Skip further transformations for this line
      }

      for (const { js, macha } of jsToMachalangkeyword) {
        transformedLine = transformedLine.split(js).join(macha);
      }

      // Preserve comments
      if (line.includes("//")) {
        const [codePart, commentPart] = line.split("//");
        transformedLine = `${codePart.trim()} // ${commentPart}`;
      }

      outputLines.push(transformedLine);
    }

    const openBraces = outputLines.filter((line) => line.includes("{")).length;
    const closeBraces = outputLines.filter((line) => line.includes("}")).length;
    if (openBraces !== closeBraces) {
      throw new Error(
        `Unmatched braces: ${openBraces} '{' but ${closeBraces} '}'`
      );
    }

    console.log("Reverse transpilation completed successfully.");
    return outputLines.join("\n");
  } catch (error) {
    console.error("Error during reverse transpilation:", error.message);
    return null;
  }
}

module.exports = { jstomacha };
// const fs = require("fs");


// function jstomacha(jsCode) {
//   try {
//     console.log("Starting reverse transpilation...");

   
//     const jsToMachalangkeyword = [
//       { js: "let", macha: "idu" },
//       { js: "const", macha: "irlli" },
//       { js: "console.log", macha: "macha.helu" },
//       { js: "function", macha: "kelsa" },
//       { js: "return", macha: "kodu" },
//       { js: "if", macha: "enandre" },
//       { js: "else if", macha: "illandre" },
//       { js: "else", macha: "illava" },
//       { js: "for", macha: "allivargu" },
//       { js: "while", macha: "alliatanaka" },
//       { js: "true", macha: "sari" },
//       { js: "false", macha: "tappu" },
//       { js: "break", macha: "muri" },
//       { js: "continue", macha: "mundehogu" },
//       { js: "null", macha: "khali" },
//       { js: "undefined", macha: "enuilla" },
//       { js: "object", macha: "vastu" },
//       { js: "array", macha: "gumpu" },
//     ];

  
//     const lines = jsCode.split("\n");
//     const outputLines = [];


//     for (let line of lines) {
//       let transformedLine = line.trim();

//       for (const { js, macha } of jsToMachalangkeyword) {
//         if (transformedLine.includes(js)) {
//           transformedLine = transformedLine.split(js).join(macha);
//         }
//       }

      

    
//       if (line.includes("//")) {
//         const [codePart, commentPart] = line.split("//");
//         transformedLine = `${codePart.trim()} // ${commentPart}`;
//       }

//       outputLines.push(transformedLine);
//     }

//     const openBraces = outputLines.filter((line) => line.includes("{")).length;
//     const closeBraces = outputLines.filter((line) => line.includes("}")).length;
//     if (openBraces !== closeBraces) {
//       throw new Error(
//         `Unmatched braces: ${openBraces} '{' but ${closeBraces} '}'`
//       );
//     }

//     console.log("Reverse transpilation completed successfully.");
//     return outputLines.join("\n");
//   } catch (error) {
//     console.error("Error during reverse transpilation:", error.message);
//     return null;
//   }
// };

// // Example Usage
// // const jsCode = `let a = true;
// // console.log(a);
// // if (a) {
// //   console.log("It's true!");
// // } else {
// //   console.log("It's false!");
// // }`;

// // const machaCode = reverseTranspiler(jsCode);
// // if (machaCode) {
// //   fs.writeFileSync("output.macha", machaCode, "utf-8");
// //   console.log("Reversed code written to output.macha");
// // }
// // // Convert strings from double quotes to single quotes
//       // if (transformedLine.includes('"')) {
//       //   let parts = transformedLine.split('"');
//       //   for (let i = 1; i < parts.length; i += 2) {
//       //     parts[i] = `'${parts[i]}'`;
//       //   }
//       //   transformedLine = parts.join("");
//       // }
// module.exports = {jstomacha}